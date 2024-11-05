import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './expiredtrial.css'; // Import the CSS file for styling
import actionImg from '../../assets/action.png'; // Placeholder image for action button
import deleteimg from '../../assets/deleteimg.png';
import Pagination from '../Pagination';

const ExpiredTrial = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // State for delete popup
  const [userToDelete, setUserToDelete] = useState(null); // State to store user to delete

  useEffect(() => {
    const fetchExpiredUsers = async () => {
      try {
        const response = await axios.get('https://markethub-app-backend.onrender.com/user/expired-trail-user-list');
        if (response.data.success) {
          const expiredUsers = response.data.data.filter(user => new Date(user.planEndDate) < new Date());
          setUsers(expiredUsers); // Set the expired users in state
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchExpiredUsers();
  }, []);

  const openDeletePopup = (user) => {
    setUserToDelete(user);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setUserToDelete(null); // Reset the user to delete
  };

  const handleDeleteUser = async () => {
    try {
      // Construct the delete API URL using the user's email
      await axios.delete(`https://markethub-app-backend.onrender.com/user/delete-user?email=${userToDelete.email}`);
      
      // Update the users list by filtering out the deleted user
      setUsers(users.filter(user => user._id !== userToDelete._id)); // This will still use user ID for state management
      closeDeletePopup(); // Close the delete popup
    } catch (error) {
      console.error("Error deleting user:", error);
      closeDeletePopup(); // Close the popup even if there's an error
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching data
  if (error) return <div>{error}</div>; // Show error message if there's an error

  return (
    <div className='expired-root-container'>
      <div className="expired-title-top">Users List</div>
      <div className="expireddd-container">
        <div className="expired-header">
          <div className="expired-title">Expired Trial</div>
          <div className="expired-search">
            <input type="text" placeholder="Search by name, phone..." className="expired-input" />
            <input type="date" className="expired-datepicker" />
          </div>
        </div>

        <table className="expired-table">
          <thead className="expired-thead">
            <tr>
              <th className="expired-th" id='headingexpired'>Full Name</th>
              <th className="expired-th" id='headingexpired'>Phone No</th>
              <th className="expired-th" id='headingexpired'>Start Date</th>
              <th className="expired-th" id='headingexpired'>Expiration Date</th>
              <th className="expired-th" id='headingexpired'>Extended Days</th>
              <th className="expired-th" id='headingexpired'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="expired-row">
                <td className="expired-td">{user.fullName}</td>
                <td className="expired-td">{user.phoneNumber}</td>
                <td className="expired-td">{new Date(user.planStartDate).toLocaleDateString()}</td>
                <td className="expired-td">{new Date(user.planEndDate).toLocaleDateString()}</td>
                <td className="expired-td">{user.extendendDays}</td>
                <td className="expired-td" id="expired-buttons">

                  <button className="expired-action-btn" onClick={() => openDeletePopup(user)}>
                    <img src={deleteimg} alt="Delete" className="expired-action-img" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-content-delete">
            <div className="userdelete-headingpopup">Are you sure you want to delete?</div>
            <div className="delete-confirmation-buttons">
              <button className="custom-continue-btn" onClick={handleDeleteUser}>Yes</button>
              <button className="custom-no-btn" onClick={closeDeletePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpiredTrial;
