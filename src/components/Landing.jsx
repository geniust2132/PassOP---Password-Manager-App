import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to PassOP 🔐</h1>
      <p className="mb-8 text-lg">Your personal password manager.</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Landing;