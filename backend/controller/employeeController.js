const employeeModel = require("../model/employee.js");

const bcrypt = require('bcryptjs');

const employeeRegister =  async (req, res) => {
    try {
        const { f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Password } = req.body;

        // Check if the email already exists
        const existingEmployee = await employeeModel.findOne({ f_Email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(f_Password, 10);

        const newEmployee = new employeeModel({
            f_Image: req.file.filename,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
            f_Password: hashedPassword
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee registered successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: "Error registering employee", error });
    }
}

const employeeLogin = async (req, res) => {
    try {
        const { f_Email, f_Password } = req.body;

        // Find the employee by email
        const employee = await employeeModel.findOne({ f_Email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(f_Password, employee.f_Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Assuming token generation or session management here
        res.status(200).json({ message: "Login successful", employee });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}

const updateEmployeeDetails = async (req, res) => {
    const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_Gender } = req.body;
    const f_Image = req.file ? req.file.filename : undefined; // Handle file upload

    try {
        // Find the employee by ID
        const employee = await employeeModel.findById(f_Id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update the employee fields
        if (f_Name) employee.f_Name = f_Name;
        if (f_Email) employee.f_Email = f_Email;
        if (f_Mobile) employee.f_Mobile = f_Mobile;
        if (f_Designation) employee.f_Designation = f_Designation;
        if (f_Gender) employee.f_Gender = f_Gender;
        if (f_Image) employee.f_Image = f_Image; // Update image if present

        // Save the updated employee
        await employee.save();

        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (error) {
        console.error('Error updating employee details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getallEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving employees", error });
    }
}


module.exports = { employeeLogin, employeeRegister, getallEmployee, updateEmployeeDetails }