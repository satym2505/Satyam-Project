const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    f_Image: {
        type: String,
        required: false
    },
    f_Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    f_Email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    f_Mobile: {
        type: String,
        required: true,
        match: /^[0-9]{10,15}$/
    },
    f_Designation: {
        type: String,
        required: true
    },
    f_Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    f_Course: {
        type: String,
        required: true
    },
    f_Password: {  // You should add this field to store the hashed password
        type: String,
        required: true
    },
    f_Createdate: {
        type: Date,
        default: Date.now
    }
});

// Creating the model from the schema
const Employee = mongoose.model('t_Employee', employeeSchema);

module.exports = Employee;
