import React, { useEffect, useState } from 'react';
import './couponList.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';

const CouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        fetch('https://clickmeal-backend.vercel.app/user/coupan-list')
            .then(response => response.json())
            .then(data => setCoupons(data.coupons))
            .catch(error => console.error("Error fetching coupons:", error));
    }, []);

    // Filtered coupons based on search term and filter criteria
    const filteredCoupons = coupons.filter(coupon => {
        const matchesSearchTerm =
            coupon.couponName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (coupon.employeeName && coupon.employeeName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDate = filterDate
            ? new Date(coupon.createdAt).toISOString().split('T')[0] === filterDate
            : true;

        return matchesSearchTerm && matchesDate;
    });

    // Helper function to determine status based on expiry date
    const getStatus = (expiryDate) => {
        const today = new Date();
        const expirationDate = new Date(expiryDate);
        return expirationDate > today ? 'Active' : 'Expired';
    };

    return (
        <div className="couponList-container">
            <div className="couponList-title">Coupon List</div>
            <div className="couponList-card">
                <div className="couponList-searchFilter">
                    <input 
                        type="text" 
                        placeholder="Search by name, description, or employee..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="couponList-searchInput" 
                    />
                    <input 
                        type="date" 
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="couponList-dateInput" 
                    />
                </div>
                <table className="couponList-table">
                    <thead>
                        <tr>
                            <th>Promotion Name</th>
                            <th>Promotion Type</th>
                            <th>Company/Employee Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Description</th>
                            <th>Coupon</th>
                            <th>Redemption Limit</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoupons.map(coupon => (
                            <tr key={coupon._id}>
                                <td>{coupon.couponName}</td>
                                <td>{coupon.couponType}</td>
                                <td>{coupon.employeeName || 'N/A'}</td>
                                <td>{new Date(coupon.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                                <td>{coupon.description}</td>
                                <td>{coupon._id}</td>
                                <td>{coupon.redemptionLimit}</td>
                                <td className={getStatus(coupon.expiryDate) === 'Active' ? 'status-active' : 'status-expired'}>
                                    {getStatus(coupon.expiryDate)}
                                </td>
                                <td>
                                    <button className="couponList-editBtn">
                                        <img src={editimg} alt="Edit" className="couponList-action-img" />
                                    </button>
                                    <button className="couponList-deleteBtn">
                                        <img src={deleteimg} alt="Delete" className="couponList-action-img" />
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

export default CouponList;
