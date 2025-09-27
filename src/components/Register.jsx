import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const API_BASE = "https://passop-backend-rgfb.onrender.com";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8 || !/[0-9]/.test(form.password)) {
      toast.error("Password must be at least 8 characters and include a number");
      return;
    }


    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Registration successful! Please log in.");
        setForm({ username: "", password: "" });
        navigate("/login"); // redirect to login page
      } else {
        const data = await res.json();
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className=" bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] min-h-[calc(100vh-120px)]
                flex flex-col 
                items-center 
                justify-center 
                pt-12">
    <div className="flex flex-col h-full items-center justify-center bg-green-100">
      <div className="p-6 max-w-md w-full bg-white rounded shadow">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-white py-2 rounded cursor-pointer"
          >

            Register

          </button>
        </form>

        {/* Login button
        <p className="mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 underline cursor-pointer"
          >
            Log In
          </button>
        </p> */}
      </div>
    </div>
    </main>
  );
};

export default Register;
