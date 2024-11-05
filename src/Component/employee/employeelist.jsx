// EmployeeList.js
import './employeelist.css';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/deleteimg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/employee-list');
        if (response.data.message === "Users fetched successfully") {
          const fetchedEmployees = response.data.users.map((employee) => ({
            id: employee._id,
            name: employee.fullName,
            email: employee.email,
            phone: employee.phoneNumber,
            companyName: employee.companyName,
            numberOfOrders: employee.numberOfOrders || 0, // Assuming `numberOfOrders` is part of the response; default to 0 if missing
          }));
          setEmployees(fetchedEmployees);
        } else {
          console.error('Failed to fetch employees:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching employees:', error.response?.data || error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employeeList-container">
      <div className="employeeList-heading">Employee List</div>

      <div className="employeeList-tableContainer">
        <div className="employeeList-topBar">
          <input type="text" placeholder="Search.." className="employeeList-searchInput" />
          <input type="date" className="employeeList-dateInput" />
        </div>

        <table className="employeeList-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone No</th>
              <th>Company Name</th>
              <th>No of Orders</th>
              <th>Order History</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.companyName}</td>
                <td>{employee.numberOfOrders}</td>
                <td><a href="#">View</a></td>
                <td className="employeeList-actionIcons">
                  <button className="employeeList-editBtn">
                    <img src={editIcon} alt="Edit" className="employeeList-actionIcon" />
                  </button>
                  <button className="employeeList-deleteBtn">
                    <img src={deleteIcon} alt="Delete" className="employeeList-actionIcon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
