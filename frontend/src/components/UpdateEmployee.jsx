import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UpdateEmployee.css";
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = ({ user }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        f_Id: '',
        f_Image: null, // Change to null for file handling
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_Gender: 'Male',
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                f_Id: user._id,
                f_Image: null, // Reset file input
                f_Name: user.f_Name || '',
                f_Email: user.f_Email || '',
                f_Mobile: user.f_Mobile || '',
                f_Designation: user.f_Designation || '',
                f_Gender: user.f_Gender || 'Male',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'f_Image') {
            setFormData({ ...formData, [name]: files[0] }); // Handle file input separately
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Create a FormData object
        const data = new FormData();
        data.append('f_Id', formData.f_Id);
        if (formData.f_Image) {
            data.append('f_Image', formData.f_Image); // Append the file
        }
        data.append('f_Name', formData.f_Name);
        data.append('f_Email', formData.f_Email);
        data.append('f_Mobile', formData.f_Mobile);
        data.append('f_Designation', formData.f_Designation);
        data.append('f_Gender', formData.f_Gender);

        try {
            const response = await axios.post("http://localhost:8000/api/employees/updateEmployeeDetails", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                navigate("/home");
            }
            setMessage(response.data.message);
        } catch (error) {
            console.log(error);
            setMessage('Update failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Employee Details</h2>
            <form onSubmit={handleUpdate} encType="multipart/form-data">
                <input
                    type="text"
                    name="f_Id"
                    value={formData.f_Id}
                    readOnly
                    required
                />
                <input
                    type="file"
                    name="f_Image"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="f_Name"
                    placeholder="Name"
                    value={formData.f_Name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="f_Email"
                    placeholder="Email"
                    value={formData.f_Email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="f_Mobile"
                    placeholder="Mobile"
                    value={formData.f_Mobile}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="f_Designation"
                    placeholder="Designation"
                    value={formData.f_Designation}
                    onChange={handleChange}
                />
                <select
                    name="f_Gender"
                    value={formData.f_Gender}
                    onChange={handleChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default UpdateEmployee;
