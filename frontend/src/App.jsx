import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Home from "./components/Home";
import UpdateEmployee from "./components/UpdateEmployee";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else if (window.location.pathname !== "/register") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {user && <Header userName={user.f_Name} />}{" "}
      {/* Show navbar if user is logged in */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updateEmployeeDetails" element={<UpdateEmployee user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
