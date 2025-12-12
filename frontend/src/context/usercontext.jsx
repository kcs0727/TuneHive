import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "./axios";


const Usercontext = createContext();


export const UserProvider = ({ children }) => {

    const [user, setuser] = useState({});
    const [isauth, setisauth] = useState(false);
    const [btnloading, setbtnloading] = useState(false);
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();


    async function fetchuser() {
        try {
            setloading(true);
            const { data } = await axios.get("/api/user/me");
            setuser(data);
            setisauth(true);
        }
        catch (error) {
            setuser({});
            setisauth(false);
        }
        finally {
            setloading(false);
        }
    }

    useEffect(() => {
        fetchuser();
    }, []);


    async function registeruser(name, email, password) {
        setbtnloading(true);
        try {
            const { data } = await axios.post("/api/user/register", {
                name, email, password
            })

            toast.success(data.message);
            setuser(data.user);
            setisauth(true);
            setbtnloading(false);
            navigate("/")
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
            setbtnloading(false);
        }
    }


    async function loginuser(email, password) {
        setbtnloading(true);
        try {
            const { data } = await axios.post("/api/user/login", {
                email, password
            })

            toast.success(data.message);
            setuser(data.user);
            setisauth(true);
            setbtnloading(false);
            navigate("/");
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            setbtnloading(false);
        }
    }


    async function logoutuser() {
        try {
            if (confirm("Are you sure? Want to logout ?")) {
                const { data } = await axios.get("/api/user/logout");
                toast.success(data.message);
                setuser({});
                setisauth(false);
                navigate("/login");
            }
        }
        catch (err) {
            toast.error(err.response?.data?.message || "LogOut failed");
        }
    }


    async function addtoplaylist(id) {
        try {
            const { data } = await axios.post("/api/user/playlist/" + id);
            toast.success(data.message);

            setuser((prev) => ({
                ...prev,
                playlist: data.updatedplaylist,   // <-- backend should return updated playlist
            }));

        }
        catch (err) {
            toast.error(err.response?.data?.message || "Playlist changes failed");
        }
    }


    async function verifyuser(token) {
        try {
            const { data } = await axios.get(`/api/user/verify?token=${token}`);
            toast.success(data.message);
            setuser(data.user);
            setisauth(true);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Verification failed");
            navigate("/login");
        }
    }


    return (
        <Usercontext.Provider value={{ registeruser, loginuser, logoutuser, addtoplaylist, verifyuser, setuser, user, isauth, btnloading, loading }}>
            {children}
            <Toaster />
        </Usercontext.Provider>
    )
};

export const UserData = () => useContext(Usercontext);