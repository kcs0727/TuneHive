import nodemailer from "nodemailer";


export const sendEmail = async (to, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL,
            },
        });
        const link=`${process.env.FRONTEND_URL}/premium`;

        await transporter.sendMail({
            from: `"TuneHive 🎵" <${process.env.USER_MAIL}>`,
            to,
            subject: "Welcome to TuneHive 🎵",

            html:
                `<div style="font-family:sans-serif;line-height:1.6">
                    <h2>Hi, ${name}</h2>
                    <p>Your account has been successfully created. Enjoy unlimited music streaming on TuneHive!</p>
                    <p>Upgrade to Premium for ad-free, high-quality music:</p>
                    <a href="${link}" style="background:#1DB954;color:white;padding:10px 20px;
                    border-radius:6px;text-decoration:none;font-weight:bold;">Upgrade Now</a>
                </div>`
        });

        console.log("Email sent successfully");
    }
    catch (error) {
        console.log("Email to user not sent", error);
        throw error;
    }
};

export const notifyAdmin = async (email, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL,
            },
        });

        await transporter.sendMail({
            from: `"TuneHive 🎵" <${process.env.USER_MAIL}>`,
            to: process.env.ADMIN_MAIL,
            subject: "New user to TuneHive",

            html:
                `<div style="font-family:sans-serif;line-height:1.6">
                <h3>Hello Admin,</h3>
                <p>A new user has just registered on <b>TuneHive</b>.</p>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p>Log in to your admin dashboard to view more details.</p>`
            ,
        });
        
        console.log("Admin Email sent");
    }
    catch (err) {
        console.log("Email to admin not sent", err);
        throw err;
    }
};