import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserData } from '../context/usercontext'

export default function Register() {

    const [name, setname]= useState("")
    const [email, setemail]= useState("")
    const [password, setpassword]= useState("")

    const {registeruser, btnloading}= UserData();
    const handlesubmit= (e)=>{
        e.preventDefault();
        registeruser(name,email,password);
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='bg-black p-4 sm:p-8 rounded-lg w-md max-w-[90vw] shadow-lg shadow-sky-500 border-t-2 border-sky-500/50'>

                <h1 className='text-3xl font-bold text-center mb-8 text-sky-100'>Register to TuneHive</h1>

                <form onSubmit={handlesubmit} className='flex flex-col justify-between gap-6'>

                    <div>
                        <label className='font-medium'>
                            Username:
                            <br />
                            <input type="text" placeholder='Enter Username' value={name} onChange={(e)=>setname(e.target.value)} required />
                        </label>
                    </div>

                    <div>
                        <label className='font-medium'>
                            Email:
                            <br />
                            <input type="email" placeholder='Enter email' value={email} onChange={(e)=>setemail(e.target.value)} required />
                        </label>
                    </div>

                    <div>
                        <label className='font-medium'>
                            Password:
                            <br />
                            <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)} required />
                        </label>
                    </div>

                    <div>
                        <button type='submit' disabled={btnloading} className='w-full bg-sky-300 hover:bg-sky-500 hover:text-white text-black font-semibold py-1 rounded-md my-1 text-lg cursor-pointer'>{btnloading?"Processing..":"Register"}</button>

                        <div>Already have an account?
                            <Link to="/login" className="text-blue-400 underline"> Login</Link>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

