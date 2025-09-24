import React from 'react'

const Navbar = () => {
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

            </div>
        </nav>
    )
}

export default Navbar