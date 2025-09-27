import React from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // check if logged in

    // defined logout function here
    const handleLogout = () => {
        localStorage.removeItem("token"); // remove JWT
        navigate("/"); // redirect to Landing page
    };

    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-15">

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-700'>&lt;</span>
                    Pass<span className='text-green-700'>OP/&gt;</span>

                </div>


                {/* <button className='text-white bg-green-900 my-5 rounded-md flex  justify-between items-center'>
                    <img className='invert p-1 w-10' src="/github.svg" alt="GitHub" />
                    <span className='font-bold px-2'>GitHub</span>
                </button> */}

                {/* Logout button */}
                {/* <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-500 my-5 rounded-md flex justify-between items-center px-4 py-2"
                >
                    Logout
                </button> */}

                {/* Conditionally render buttons */}
                {token ? (
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-600 hover:bg-red-500 my-5 rounded-md px-4 py-2"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-white bg-green-700 hover:bg-green-600 rounded-md px-4 py-2"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="text-white bg-blue-700 hover:bg-blue-600 rounded-md px-4 py-2"
                        >
                            Register
                        </button>

                    </div>
                )
                }
            </div>
        </nav>
    )
}

export default Navbar