import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className=" bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] min-h-[calc(100vh-120px)]
                flex flex-col 
                items-center 
                justify-center 
                pt-12">
    <div className="flex flex-col items-center justify-center h-full bg-green-100">
      <h1 className="text-4xl font-bold">Welcome To</h1>
      <h1 className="text-4xl font-bold mb-6">PassOP 🔐</h1>
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
    </main>
  );
};

export default Landing;