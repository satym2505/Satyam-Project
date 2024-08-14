import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/employees/login",
        { f_Email: email, f_Password: password }
      );
      setMessage(response.data.message);
      if (response.status >= 200 && response.status < 300) {
        const userData = response.data.employee; // Adjust according to your response
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/home");
      }
    } catch (error) {
      setMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <div id="bg">
        <div id="face">
          <div id="box">
            <form id="fr1" onSubmit={handleLogin}>
              <label id="lab1">enter your email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label id="lab2">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button id="btn1" type="submit">
                Login
              </button>
              <p>
                If you are a new employee, click{" "}
                <Link to="/register">here</Link> to register.
              </p>
            </form>
          </div>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
