import React, { useEffect, useState } from 'react';
import './companylist.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';
import customerimg from '../../assets/customerimg.png';
import axios from 'axios'; // Import axios

const CompanyList = () => {
    const [companies, setCompanies] = useState([]); // Default to empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [deletePopup, setDeletePopup] = useState({ show: false, companyId: null });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // To show loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Replacing fetch with axios for the new endpoint
        axios.get('https://clothing-backend-one.vercel.app/user/get-customer')
            .then((response) => {
                if (response.data.message === 'Customers retrieved successfully') {
                    setCompanies(response.data.data || []); // Ensure the data is always an array
                } else {
                    setError('Failed to load customers');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
                setError('Failed to load customers');
                setLoading(false);
            });
    }, []);

    const handleDeleteCompany = async (companyId) => {
        try {
            const response = await fetch(
                `https://clickmeal-backend.vercel.app/user/delete-company?id=${companyId}`,
                {
                    method: 'DELETE',
                }
            );
            const result = await response.json();
            if (result.message === 'Company deleted successfully') {
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

    // Filter companies based on search term and filter criteria
    const filteredCompanies = (companies || []).filter((company) => {
        const matchesSearchTerm =
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.address.toLowerCase().includes(searchTerm.toLowerCase()); // Changed to 'address'

        const matchesDate = filterDate
            ? new Date(company.createdAt).toISOString().split('T')[0] === filterDate
            : true;

        return matchesSearchTerm && matchesDate;
    });

    // Handle when a user clicks on a company row
    const handleViewDetails = (company) => {
        setCompanies([]); // Clear previous content
        document.querySelector('.companyList-container').innerHTML = `
            <div class="customerDetails-container">
                <div class="customerDetails-header">
                    <img src={customerimg} alt="Profile" class="customerDetails-profile" />
                    <div class="customerDetails-info">
                    <div class="flexinfo">
                    <div>
                        <h2>${company.name}</h2>
                        <div>Email: ${company.email}</div> <!-- Displaying email -->

                    </div>
                    <div>
                        <div>Personal Information</div>
                        <p><strong>Gender:</strong> ${company.gender || 'N/A'}</p>
                        <p><strong>Phone No:</strong> ${company.phoneNo || 'N/A'}</p>
                        <p><strong>Date of Birth:</strong> ${company.dob ? new Date(company.dob).toLocaleDateString() : 'N/A'}</p> <!-- Format date -->
                        <p><strong>Member Since:</strong> ${new Date(company.createdAt).toLocaleDateString()}</p>
                        
                    </div>
                           <div>
                        <div>Personal Information</div>
                        <p><strong>A-105,Andugundu Apartment ,Mumbai -10000</strong> </p>
                        <p><strong>Total Orders</strong>: ${company.noOfOrders}</p> <!-- Displaying noOfOrders -->
                      
                    
                        
                    </div>
                    </div>
                    </div>
                </div>
                      <div class="companyList-tabs">
        <button class="companytab-button active">All Orders</button>
        <button class="companytab-button">On the Way</button>
        <button class="companytab-button">Completed</button>
        
      </div>
                <div class="customerDetails-content">
                    <div class="customerDetails-orders">
                       
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date & Time</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#123456</td>
                                    <td>24 Dec 2024</td>
                                    <td>${company.name}</td>
                                    <td>$200</td>
                                    <td>Credit Card</td>
                                </tr>
                                <!-- Add more rows dynamically if needed -->
                            </tbody>
                        </table>
                    </div>
                   
                </div>
            </div>
        `;
    };

    return (
        <div className="companyList-container">
            <div className="expired-title-top" style={{ fontSize: '22px', fontWeight: '400', paddingBottom: '10px', color: '#1C2A53' }}>
                Customers
            </div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="companyList-searchInput"
            />

            {message && <div className="companyList-message">{message}</div>}

            {loading ? (
                <p>Loading companies...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="companyList-card">
                    <table className="companyList-table">
                        <thead>
                            <tr className="customertopname">
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>NO OF ORDERS</th>
                                <th>CREATED</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((company) => (
                                <tr key={company._id} onClick={() => handleViewDetails(company)}>
                                    <td>{company.name}</td>
                                    <td>{company.email}</td> {/* Displaying email */}
                                    <td>{company.noOfOrders}</td> {/* Displaying noOfOrders */}
                                    <td>{new Date(company.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="companyList-editBtn">
                                            <img src={editimg} alt="Action" className="companyList-action-img" />
                                        </button>
                                        <button
                                            className="companyList-deleteBtn"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering row click
                                                setDeletePopup({ show: true, companyId: company._id });
                                            }}
                                        >
                                            <img src={deleteimg} alt="Delete" className="companyList-action-img" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {deletePopup.show && (
                <div className="companyList-popup">
                    <div className="companyList-popupContent">
                        <p>Are you sure you want to delete this customer?</p>
                        <div className="companyList-popupActions">
                            <button onClick={() => setDeletePopup({ show: false, companyId: null })}>Cancel</button>
                            <button onClick={() => handleDeleteCompany(deletePopup.companyId)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyList;
