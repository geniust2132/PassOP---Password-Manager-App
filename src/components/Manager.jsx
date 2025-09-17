import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("https://passop-backend-rgfb.onrender.com")
        // let req = await fetch("http://localhost:3000/")
        // let req = await fetch("http://localhost:3000/passwords")

        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)

    }

    useEffect(() => {
        getPasswords()

    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)

        if (ref.current.src.includes("public/eyecross.png")) {
            ref.current.src = "/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "public/eyecross.png"
        }

    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            //If any such id exists in the db delete it
            await fetch("https://passop-backend-rgfb.onrender.com", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id: form.id })
            })




            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            await fetch("https://passop-backend-rgfb.onrender.com", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })


            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            toast('Error: Password Not Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do You Want To Delete?")
        if (c) {
            // console.log("deleting password using id", id)
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("https://passop-backend-rgfb.onrender.com", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }

    const editPassword = (id) => {

        console.log("edit password using id", id)
        setform({...passwordArray.filter(i => i.id === id)[0],id: id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied To ClipBoard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    return (

        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>


            <div className="p-2 pt-3 md:mycontainer min-h-[79.3vh]">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-700'>&lt;</span>
                    Pass<span className='text-green-700'>OP/&gt;</span></h1>

                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className="text-black flex flex-col p-4 text-black gap-5 items-center">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border-2 border-green-400 w-full p-4 py-1' type="text" name="site" id="site" />

                    <div className="flex flex-col md:flex-row w-full gap-5">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-green-400 w-full p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-green-400 w-full p-4 py-1' type="password" name="password" id="password" />

                            <span className='absolute right-[1px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full px-4 py-2 w-fit border-2 border-green-950'>

                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>

                        Add Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-xl py-1'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-2">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} >

                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordcopy cursor-pointer size-7' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordcopy cursor-pointer size-7' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='justify-center py-2 border border-white text-center' >
                                        <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>


                                    </td>

                                </tr>
                            })}
                        </tbody>

                    </table>}
                </div>
            </div >
        </>

    )
}

export default Manager