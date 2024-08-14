import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees/getALlEmployess",{ headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(response);
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.f_Gender === selectedFilter ||
          employee.f_Designation === selectedFilter
      );
      setFilteredEmployees(filtered);
    }
  }, [selectedFilter, employees]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div id="filter-container">
        <h3>Filter Employees</h3>
        <div id="filter-options">
          {["All", "Male", "Female", "HR", "Manager"].map((filter, index) => (
            <button
              key={index}
              className={`filter-button ${
                selectedFilter === filter ? "active" : ""
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>
                    {/* {console.log(`http://localhost:8000/public/uploads/${employee.f_Image}`)} */}
                  <img
                  id="employee-img"
                    src={`http://localhost:8000/public/uploads/${employee.f_Image}`}
                    alt="Employee Image"
                  />
                </td>
                <td>{employee._id}</td>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Gender}</td>
                <td>{employee.f_Course}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-employees">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
