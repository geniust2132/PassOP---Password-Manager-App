import { useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <div className='min-h-[68vh]'> */}
      <div className='bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] min-h-[68vh]'>
        <Routes>

          {/* Home → Landing */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* <Route path="/manager" element={<Manager />} /> */}

          {/* Protected Manager route */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute>
                <Manager />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App
