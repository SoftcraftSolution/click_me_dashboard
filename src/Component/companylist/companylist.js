import React, { useEffect, useState } from 'react';
import './companylist.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        fetch('https://clickmeal-backend.vercel.app/user/get-company')
            .then(response => response.json())
            .then(data => setCompanies(data.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    // Filtered companies based on search term and filter criteria
    const filteredCompanies = companies.filter(company => {
        const matchesSearchTerm = 
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            company.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = filterDate
            ? new Date(company.createdAt).toISOString().split('T')[0] === filterDate
            : true;

        return matchesSearchTerm && matchesDate;
    });

    return (
        <div className="companyList-container">
            <div className="expired-title-top">Company List</div>
            <div className='companyList-card'>
                <div className="companyList-searchFilter">
                    <input 
                        type="text" 
                        placeholder="Search by name or address..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="companyList-searchInput" 
                    />
                    <input 
                        type="date" 
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="companyList-dateInput" 
                    />
                </div>
                <table className="companyList-table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Delivery Address</th>
                            <th>Employee Count</th>
                            <th>Order History</th>
                            <th>Menu Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map(company => (
                            <tr key={company._id}>
                                <td>{company.name}</td>
                                <td>{company.deliveryAddress}</td>
                                <td>{company.numberOfEmployees}</td>
                                <td><a href="#">View</a></td>
                                <td>Global</td>
                                <td>
                                    <button className="companyList-editBtn">
                                        <img src={editimg} alt="Action" className="companyList-action-img" />
                                    </button>
                                    <button className="companyList-deleteBtn">
                                        <img src={deleteimg} alt="Delete" className="companyList-action-img" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyList;
