import React, { useState } from 'react';
import './addadmin.css';
import logout from '../../assets/logout.png';
import pencilIcon from '../../assets/pencil.png';
import action from '../../assets/action.png';
import deleteimg from '../../assets/deleteimg.png';
import tickImage from '../../assets/tick.png'; // Import tick image

const AdminDashboard = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showAddNewAdminPopup, setShowAddNewAdminPopup] = useState(false); // State for Add New Admin confirmation popup
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup
    const [adminDetails, setAdminDetails] = useState({ fullName: '', phoneNumber: '+91 ', email: '', accessLevel: '' });

    const admins = [
        { name: 'Shantanu Dixit', mobile: '7689898034', email: 'Shantanu@xyzmail.com', access: 'Spot Price', date: '12-04-2024', action: action, delete: deleteimg },
        { name: 'Abhishek Mishra', mobile: '7689898055', email: 'AbhiMishra@gmail.com', access: 'Spot Price', date: '26-03-2023', action: action, delete: deleteimg },
        { name: 'Niraj Prakash', mobile: '7689898040', email: 'nirajPrakash@workmail.com', access: 'Spot Price', date: '28-05-2024', action: action, delete: deleteimg },
        { name: 'Parmeshwar Kadam', mobile: '7689898049', email: 'parmeshwarKadam@xyzmail.com', access: 'Spot Price', date: '08-12-2023', action: action, delete: deleteimg },
        { name: 'Niraj Prakash', mobile: '7689898050', email: 'Keshav@Niraj123@gmail.com', access: 'Spot Price', date: '27-01-2024', action: action, delete: deleteimg }
    ];

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(image);
        }
    };

    const handleDeleteImage = () => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            setSelectedImage(null);
        }
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAdminInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            if (!value.startsWith('+91 ')) {
                setAdminDetails({ ...adminDetails, phoneNumber: '+91 ' });
            } else {
                setAdminDetails({ ...adminDetails, phoneNumber: value });
            }
        } else {
            setAdminDetails({ ...adminDetails, [name]: value });
        }
    };

    const handleAccessChange = (e) => {
        setAdminDetails({ ...adminDetails, accessLevel: e.target.value });
    };

    const handleSubmit = () => {
        setShowPopup(false);
        setShowAddNewAdminPopup(true);
    };

    const handleConfirmAddAdmin = () => {
        setShowAddNewAdminPopup(false);
        setShowSuccessPopup(true); // Show success popup after confirmation
    };
    

    return (
        <div className="admin-dashboard">
            <div style={{ fontWeight: "800", fontSize: "18px", paddingBottom: "12px" }}>Add Admin</div>
            <div className="admin-header">
                <div className="admin-details">
                    <div className="admin-details-1">
                        <div className="admin-avatar-wrapper">
                            <img
                                src={selectedImage || "https://via.placeholder.com/100"}
                                alt="Admin"
                                className="admin-avatar"
                            />
                            <img
                                src={pencilIcon}
                                alt="Edit"
                                className="edit-icon"
                                onClick={() => document.getElementById('imageUpload').click()}
                            />
                            <input
                                type="file"
                                id="imageUpload"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="admin-info">
                            <div className='basicdetail'>
                                <div className='admin-name'>Raj Deep</div>
                                <span className="admin-role">Admin</span>
                            </div>
                        </div>
                    </div>
                    <div className='admindetailslatest'>
                        <div>
                            <span style={{ color: "#696969" }}>Name - </span>
                            <strong>Raj Deep</strong>
                        </div>
                        <div style={{ paddingTop: "22px" }}>
                            <span style={{ color: "#696969" }}>Mobile - </span>
                            <strong>+91 7098567389</strong>
                        </div>
                    </div>
                </div>
                <div className='admin-buttonflex'>
                    <button className="add-admin-btn" onClick={handleOpenPopup}>Add Admin</button>
                    <button className="logout-btn"><img src={logout} alt="log" /></button>
                </div>
            </div>

            <div className="admin-list">
                <div style={{ fontSize: "17px", fontWeight: "600" }}>List of admins</div>
                <table>
                    <thead>
                        <tr>
                            <th className="admin-headingtable">Admin Name</th>
                            <th className="admin-headingtable">Mobile Number</th>
                            <th className="admin-headingtable">Email ID</th>
                            <th className="admin-headingtable">Access</th>
                            <th className="admin-headingtable">Creation Date</th>
                            <th className="admin-headingtable">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={index}>
                                <td>{admin.name}</td>
                                <td>{admin.mobile}</td>
                                <td>{admin.email}</td>
                                <td>{admin.access}</td>
                                <td>{admin.date}</td>
                                <td>
                                    <img
                                        src={admin.action}
                                        alt="Action"
                                        className="action-icon"
                                        onClick={() => console.log(`Action clicked for ${admin.name}`)}
                                    />
                                    <button style={{ border: "none", backgroundColor: "#FFFFFF" }}>
                                        <img
                                            src={admin.delete}
                                            alt="Delete"
                                            className="action-icon"
                                            onClick={() => console.log(`Delete clicked for ${admin.name}`)}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* First popup (Add Admin) */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <span className="close-icon" onClick={handleClosePopup}>×</span>
                        <div className='poptitle'>Add New Admin</div>
                        <div className='addpopup-flex'>
                            <input
                                className='addadmin-fullname'
                                type="text"
                                name="fullName"
                                placeholder="Enter Full Name"
                                value={adminDetails.fullName}
                                onChange={handleAdminInputChange}
                            />
                            <input
                                className='addadmin-phone'
                                type="text"
                                name="phoneNumber"
                                placeholder="Enter Phone Number"
                                value={adminDetails.phoneNumber}
                                onChange={handleAdminInputChange}
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={adminDetails.email}
                            onChange={handleAdminInputChange}
                        />
                        <div className="access-options">
                            <span className='add-span'>Allow Access to</span>
                            <div className="radio-group">
                                <div className='add-radio'>
                                    <label>
                                        <input
                                            type="radio"
                                            name="accessLevel"
                                            value="Spot Price"
                                            checked={adminDetails.accessLevel === "Spot Price"}
                                            onChange={handleAccessChange}
                                        />
                                        Spot Price
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="accessLevel"
                                            value="News"
                                            checked={adminDetails.accessLevel === "News"}
                                            onChange={handleAccessChange}
                                        />
                                        News
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="accessLevel"
                                            value="Spot Price & News"
                                            checked={adminDetails.accessLevel === "Spot Price & News"}
                                            onChange={handleAccessChange}
                                        />
                                        Spot Price & News
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="submit-btn" onClick={handleSubmit}>Continue</button>
                    </div>
                </div>
            )}

            {/* Second popup (Add New Admin confirmation) */}
            {showAddNewAdminPopup && (
                <div className="popup-overlay">
                    <div className="newadminpopup-content">
                        <span className="close-icon" onClick={() => setShowAddNewAdminPopup(false)}>×</span>
                        <div style={{fontWeight:"700",textAlign:"left",fontSize:"18px"}}>Add New Admin</div>
                        <div className='popup-message'>Are you sure you want to add an Admin?</div>
                        <div className="confirmation-buttons">
                            <button className="confirmation-yes-btn" onClick={handleConfirmAddAdmin}>Yes</button>
                            <button className="confirmation-no-btn" onClick={() => setShowAddNewAdminPopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success popup */}
            {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <span className="close-icon" onClick={() => setShowSuccessPopup(false)}>×</span>
                        <div className='success-message'>
                            <img src={tickImage} alt="Success" className="success-icon" />
                            <span>Admin added successfully!</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
