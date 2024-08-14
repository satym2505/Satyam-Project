import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_Gender: "Male",
    f_Course: "",
    f_Password: "", // Added password field
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/employees/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      setMessage(response.data.message);
      if (response.status >= 200 && response.status < 300) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <div id="bg2">
        <div id="face2">
          <div id="box2">
            <form
              id="fr2"
              onSubmit={handleRegister}
              enctype="multipart/form-data"
            >
              <label id="labf1">Name</label>
              <input
                type="text"
                name="f_Name"
                placeholder="Enter Your Name"
                value={formData.f_Name}
                onChange={handleChange}
                required
              />
              <label id="labf2">Email</label>
              <input
                type="email"
                name="f_Email"
                placeholder="Enter Your Email"
                value={formData.f_Email}
                onChange={handleChange}
                required
              />
              <label id="labf3">Mobile no</label>
              <input
                type="text"
                name="f_Mobile"
                placeholder="Enter Your Mobile number"
                value={formData.f_Mobile}
                onChange={handleChange}
                required
              />
              <label>Enter Image</label>
              <input
                type="file"
                name="f_Image"
                onChange={(e) =>
                  setFormData({ ...formData, f_Image: e.target.files[0] })
                }
              />
              <label id="labf4">Designation</label>
              <input
                type="text"
                name="f_Designation"
                placeholder="Designation"
                value={formData.f_Designation}
                onChange={handleChange}
                required
              />
              <div id="gender">
                <select
                  name="f_Gender"
                  value={formData.f_Gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div id="check">
                <input
                  type="text"
                  name="f_Course"
                  placeholder="enter Course"
                  value={formData.f_Course}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="password"
                name="f_Password"
                placeholder="Enter your Password"
                value={formData.f_Password}
                onChange={handleChange}
                required
              />{" "}
              <button type="submit" id="btn2">
                Submit
              </button>
            </form>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
