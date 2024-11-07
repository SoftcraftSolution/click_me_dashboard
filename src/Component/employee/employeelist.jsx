import './employeelist.css';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/deleteimg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrders, setFilterOrders] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/employee-list');
        if (response.data.message === "Users fetched successfully") {
          const fetchedEmployees = response.data.users.map((employee) => ({
            id: employee._id,
            name: employee.fullName || 'N/A', // Default to 'N/A' if null
            email: employee.email || 'N/A',
            phone: employee.phoneNumber || 'N/A',
            companyName: employee.companyName || 'N/A', // Handle null case
            numberOfOrders: employee.numberOfOrders || 0, // Default to 0 if missing
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

  // Filter employees based on search term and filter criteria
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearchTerm =
      (employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.companyName && employee.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesOrderFilter = filterOrders
      ? employee.numberOfOrders === parseInt(filterOrders, 10)
      : true;

    return matchesSearchTerm && matchesOrderFilter;
  });

  return (
    <div className="employeeList-container">
      <div className="employeeList-heading">Employee List</div>

      <div className="employeeList-tableContainer">
        <div className="employeeList-topBar">
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="employeeList-searchInput"
          />
          <select
            value={filterOrders}
            onChange={(e) => setFilterOrders(e.target.value)}
            className="employeeList-filterSelect"
          >
            <option value="">All Orders</option>
            <option value="0">0 Orders</option>
            <option value="1">1 Order</option>
            <option value="5">5 Orders</option>
            <option value="10">10+ Orders</option>
          </select>
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
            {filteredEmployees.map((employee) => (
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
