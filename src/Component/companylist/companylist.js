import React, { useEffect, useState } from 'react';
import './companylist.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [deletePopup, setDeletePopup] = useState({ show: false, companyId: null });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://clickmeal-backend.vercel.app/user/get-company')
            .then(response => response.json())
            .then(data => setCompanies(data.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    const handleDeleteCompany = async (companyId) => {
        try {
            const response = await fetch(`https://clickmeal-backend.vercel.app/user/delete-company?id=${companyId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.message === "Company deleted successfully") {
                setCompanies(companies.filter((company) => company._id !== companyId));
                setMessage('Company deleted successfully!');
            } else {
                setMessage('Failed to delete the company.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setDeletePopup({ show: false, companyId: null });
            setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
        }
    };

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

            {message && <div className="companyList-message">{message}</div>}

            <div className="companyList-card">
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
                                    <button
                                        className="companyList-deleteBtn"
                                        onClick={() => setDeletePopup({ show: true, companyId: company._id })}
                                    >
                                        <img src={deleteimg} alt="Delete" className="companyList-action-img" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {deletePopup.show && (
                <div className="companyList-popup">
                    <div className="companyList-popupContent">
                        <p>Are you sure you want to delete this company?</p>
                        <div className="companyList-popupActions">
                            <button onClick={() => setDeletePopup({ show: false, companyId: null })}>
                                Cancel
                            </button>
                            <button onClick={() => handleDeleteCompany(deletePopup.companyId)}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyList;
