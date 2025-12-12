import trycatch from "../utils/trycatch.js";
import users from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendEmail, notifyAdmin } from "../utils/sendemail.js";


export const registeruser = trycatch(async (req, res) => {

    const { name, email, password } = req.body;
    const user = await users.findOne({ email });
    if (user) {
        return res.status(400).json({
            message: "User already exists, you can login"
        })
    }

    const hashed = await bcrypt.hash(password, 10);

    const newuser= await users.create({
        name, email, password: hashed,
        verified: true,
    });

    await sendEmail(email, name);
    await notifyAdmin(email, name);

    const Token = jwt.sign(
        { id: newuser._id },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
    );

    res.cookie("token", Token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    });

    const safeuser = await users.findById(newuser._id).select("-password");
    res.status(200).json({
        user: safeuser,
        message: "Registration successful!"
    })

})


export const loginuser = trycatch(async (req, res) => {

    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "User doesn't exists, you can signup"
        })
    }

    const ismatched = await bcrypt.compare(password, user.password);

    if (!ismatched) {
        return res.status(403).json({
            message: "password not matched"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
    );

    res.cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    });

    const safeuser = await users.findById(user._id).select("-password");
    res.status(200).json({
        user: safeuser,
        message: "User login successfull"
    })

})


export const verifyuser = trycatch(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({
            message: "Verification token is missing"
        });
    }

    const user = await users.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() }
    });
    if (!user) {
        return res.status(400).json({
            message: "Token Expired or user not found"
        });
    }

    user.verified = true;
    user.verifyToken =undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    await notifyAdmin(user.email, user.name);

    const Token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "10d" }
    );

    res.cookie("token", Token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    });

    const safeuser = await users.findById(user._id).select("-password");
    res.status(200).json({
        user: safeuser,
        message: "Verification successfull"
    })

});


export const myprofile = trycatch(async (req, res) => {
    res.status(200).json(req.user)
})


export const logoutuser = trycatch(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    });

    res.status(200).json({
        message: "user logout sucessfull"
    })
})


export const addtoplaylist = trycatch(async (req, res) => {
    const user = req.user

    if (user.playlist.includes(req.params.id)) {

        const index = user.playlist.indexOf(req.params.id);
        user.playlist.splice(index, 1);
        await user.save();

        return res.json({
            updatedplaylist: user.playlist,
            message: "Removed from playlist"
        })
    }

    user.playlist.push(req.params.id);
    await user.save();
    return res.json({
        updatedplaylist: user.playlist,
        message: "Added to playlist"
    })
})