import React, { useEffect, useState } from 'react';
import './couponList.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';

const CouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [deletePopup, setDeletePopup] = useState({ show: false, couponId: null });
    const [message, setMessage] = useState('');
    const [isAddCouponPage, setIsAddCouponPage] = useState(false); // State for toggling the "Add Coupon" page

    useEffect(() => {
        fetch('https://clickmeal-backend.vercel.app/user/coupan-list')
            .then(response => response.json())
            .then(data => setCoupons(data.coupons))
            .catch(error => console.error("Error fetching coupons:", error));
    }, []);

    const handleDeleteCoupon = async (couponId) => {
        try {
            const response = await fetch(`https://clickmeal-backend.vercel.app/user/delete-coupan?id=${couponId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.message === "Coupon deleted successfully.") {
                setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
                setMessage('Coupon deleted successfully!');
            } else {
                setMessage('Failed to delete the coupon.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setDeletePopup({ show: false, couponId: null });
            setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
        }
    };

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

    const getStatus = (expiryDate) => {
        const today = new Date();
        const expirationDate = new Date(expiryDate);
        return expirationDate > today ? 'Active' : 'Expired';
    };

    return (
        <div className="couponList-container">
            {isAddCouponPage ? (
                // Add Coupon Form Page
<div className="addCoupon-page">
<div className='titleaddcoupon'>
    <button className="backButton" onClick={() => setIsAddCouponPage(false)}>
        &larr; 
    </button>
    <div className="addCoupon-title">Add Coupon</div>
</div>
    <form className="addCoupon-form">
        <div className="form-row">
            <div className="form-group">
                <label>Coupon Name</label>
                <input type="text" placeholder="Enter coupon name" />
            </div>
            <div className="form-group">
                <label>Expiry Date</label>
                <input type="date" />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label>Redemption Limit</label>
                <select>
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div className="form-group">
                <label>Coupon Code</label>
                <input type="text" placeholder="Enter coupon code" />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group full-width">
                <label>Coupon Description</label>
                <textarea placeholder="Enter description"></textarea>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group full-width">
                <label>Terms & Conditions</label>
                <textarea placeholder="Add terms and conditions"></textarea>
            </div>
        </div>
        <div className="form-row buttons-row">
            <button className="saveButton" type="submit" style={{display:"flex",justifyContent:"flex-start"}}>Save</button>
        </div>
    </form>
</div>

            ) : (
                // Coupon List Page
                <>
                    <div className="couponList-title">Coupons</div>
                    <div className="couponList-searchFilter">
                        <div className="flexgrpforbutton">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="couponList-searchInput"
                            />
                            <button
                                className="addcouponbutton"
                                onClick={() => setIsAddCouponPage(true)} // Show the Add Coupon page
                            >
                                Add Coupon
                            </button>
                        </div>
                    </div>

                    {message && <div className="couponList-message">{message}</div>}

                    <div className="couponList-card">
                        <table className="couponList-table">
                            <thead>
                                <tr>
                                    <th>Coupon Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Description</th>
                                    <th>Code</th>
                                    <th>Limit</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.map(coupon => (
                                    <tr key={coupon._id}>
                                        <td>{coupon.couponName}</td>
                                        <td>{new Date(coupon.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                                        <td>{coupon.description}</td>
                                        <td>{coupon._id}</td>
                                        <td>{coupon.redemptionLimit}</td>
                                        <td
                                            className={
                                                getStatus(coupon.expiryDate) === 'Active'
                                                    ? 'status-active'
                                                    : 'status-expired'
                                            }
                                        >
                                            {getStatus(coupon.expiryDate)}
                                        </td>
                                        <td>
                                            <button className="couponList-editBtn">
                                                <img src={editimg} alt="Edit" className="couponList-action-img" />
                                            </button>
                                            <button
                                                className="couponList-deleteBtn"
                                                onClick={() => setDeletePopup({ show: true, couponId: coupon._id })}
                                            >
                                                <img src={deleteimg} alt="Delete" className="couponList-action-img" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {deletePopup.show && (
                <div className="couponList-popup">
                    <div className="couponList-popupContent">
                        <p>Are you sure you want to delete this coupon?</p>
                        <div className="couponList-popupActions">
                            <button onClick={() => setDeletePopup({ show: false, couponId: null })}>
                                Cancel
                            </button>
                            <button onClick={() => handleDeleteCoupon(deletePopup.couponId)}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponList;
