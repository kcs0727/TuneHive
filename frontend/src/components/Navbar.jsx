import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { UserData } from '../context/usercontext';
import { assets } from '../assets/assets';
import { HiMenu, HiX } from "react-icons/hi";
import { LuPanelRightOpen, LuPanelRightClose } from "react-icons/lu";
import { GiCrown } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";
import { useEffect } from 'react';


export default function Navbar({ sidebar, setsidebar }) {

    const { user, logoutuser } = UserData();
    const navigate = useNavigate();

    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const closeMenu = () => setShowOptions(false);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, []);



    const linkClass = ({ isActive }) =>
        `px-3 md:px-4 py-1 rounded-2xl cursor-pointer transition ${isActive
            ? 'bg-sky-100 text-black hover:bg-[#eee]'
            : 'bg-black text-white hover:bg-[#ffffff14]'
        }`;

    return (
        <>
            <div className='w-full px-1 flex justify-between items-center relative'>

                <div className='flex items-center gap-2'>

                    <div className='hidden md:flex cursor-pointer bg-black hover:bg-[#ffffff14]'>
                        {sidebar ? <LuPanelRightOpen className='size-6' onClick={() => setsidebar(false)} />
                            : <LuPanelRightClose className='size-6' onClick={() => setsidebar(true)} />}
                    </div>

                    <img src={assets.arrow_left} alt="" className='w-8 bg-black p-2 cursor-pointer rounded-2xl hover:bg-[#ffffff14]' onClick={() => navigate(-1)} />
                    <img src={assets.arrow_right} alt="" className='w-8 bg-black p-2 cursor-pointer rounded-2xl hover:bg-[#ffffff14]' onClick={() => navigate(1)} />
                </div>


                <div className={`max-md:flex items-center justify-center p-2 cursor-pointer logo ${sidebar ? "hidden" : "flex"}`}>
                    <img src={assets.tunehive} className='h-6 z-2 animate-pulse' alt='' />
                </div>


                <div className='items-center gap-4 hidden md:flex font-bold'>
                    <NavLink to='/premium'>
                        <p className='px-2 lg:px-4 py-1 bg-sky-100 text-yellow-700 rounded-2xl cursor-pointer hover:bg-white hover:scale-x-107 flex items-center gap-1'><FaCrown className='text-yellow-700 size-5' /> Explore Premium</p>
                    </NavLink>
                    <NavLink to='/installapp'>
                        <p className='px-2 lg:px-4 py-1 bg-sky-100 text-black rounded-2xl cursor-pointer hover:bg-white hover:scale-x-107 '>Install App</p>
                    </NavLink>
                    <p className='px-2 lg:px-4 py-1 bg-sky-100 text-black rounded-2xl cursor-pointer hover:bg-white hover:scale-x-107' onClick={logoutuser}>Logout</p>
                </div>


                <div className='md:hidden cursor-pointer flex items-center gap-2'>
                    <NavLink to='/premium'>
                        <div className='rounded  text-black font-semibold hover:bg-white hover:scale-107'>
                            <FaCrown className='text-yellow-600 size-6' />
                        </div>
                    </NavLink>

                    {showOptions ? <HiX className='size-6 text-sky-300' onClick={(e) => {e.stopPropagation(); setShowOptions(false)}} /> :
                        <HiMenu className='size-6 text-sky-300' onClick={(e) => {e.stopPropagation(); setShowOptions(true);}} />}
                </div>

                <div className={`absolute p-1 right-1 top-10 flex-col gap-1 bg-gray-700 text-white rounded ${showOptions ? "flex" : "hidden"} z-5`}>
                    <NavLink to='/premium' className={'px-1 bg-gray-800 rounded'}>Explore Premium</NavLink>
                    <NavLink to='/installapp' className={'px-1 bg-gray-800 rounded'}>Install App</NavLink>
                    {user && user.role === "admin" && (
                        <NavLink to='/admin' className='px-1 bg-gray-800 rounded'>Admin Dashboard</NavLink>
                    )}
                    <p onClick={logoutuser} className={'px-1 bg-gray-800 rounded cursor-pointer'}>Logout</p>
                </div>

            </div>

            <div className='flex items-center gap-1 md:gap-2 mt-4 mb-1 overflow-auto scrollbar-hide'>
                <NavLink to='/' end className={linkClass}>
                    All
                </NavLink>
                <NavLink to='/music' className={linkClass}>
                    Music
                </NavLink>
                <NavLink to="/search" className={({ isActive }) => `${linkClass({ isActive })} flex items-center gap-[2px]`}>
                    Search
                </NavLink>

                <NavLink to="/playlist" className={({ isActive }) => `${linkClass({ isActive })} md:hidden`}>
                    Playlist
                </NavLink>
                <NavLink to='/podcast' className={linkClass}>
                    Podcasts
                </NavLink>
            </div>

        </>
    )
}