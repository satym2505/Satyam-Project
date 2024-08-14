const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const employeeRouter = require("./routes/employee.js"); // Adjust the path accordingly

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(express.json());
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/employees", employeeRouter); // Route for employee-related operations

// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

// Handle database connection events
mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from database");
});

mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});

// Start the server after connecting to the database
const port = process.env.PORT || 8000;

// Static folder to serve images
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.listen(port, () => {
    connect();
    console.log(`Listening on port ${port}`);
});
