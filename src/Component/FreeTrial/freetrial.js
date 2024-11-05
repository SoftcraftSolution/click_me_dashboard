import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './freetrial.css';
import actionimg from '../../assets/action.png';
import delimg from '../../assets/deleteimg.png';
import Pagination from '../Pagination';

const FreeTrial = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);  // State to control delete popup visibility
  const [selectedUser, setSelectedUser] = useState(null);  // State to store the selected user for deletion

  useEffect(() => {
    // Fetch data from the API
    const fetchFreeTrialUsers = async () => {
      try {
        const response = await axios.get('https://markethub-app-backend.onrender.com/user/free-trail-user-list');
        if (response.data.success) {
          // Filter users where isInTrial is true
          const trialUsers = response.data.data.filter(user => user.isInTrail);
          setUsers(trialUsers);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchFreeTrialUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);  // Set the user to be deleted
    setShowDeletePopup(true);  // Show the delete confirmation popup
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        // Call the delete API using the user's email
        await axios.delete(`https://markethub-app-backend.onrender.com/user/delete-user?email=${encodeURIComponent(selectedUser.email)}`);
        // Remove the user from the list after successful deletion
        setUsers(users.filter(user => user._id !== selectedUser._id));
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setShowDeletePopup(false);  // Close the popup
        setSelectedUser(null);  // Reset selected user
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2 style={{ margin: '0px' }}>Free Trial</h2>
        <input type="text" placeholder="Search by name, phone..." className="freetrial-input" />
        <input type="date" className="freetrial-datepicker" />
      </div>

      <table className="user-list-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone No</th>
            <th>Start Date</th>
            <th>Extended Days</th>
            <th>Expiration Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.phoneNumber}</td>
              <td>{new Date(user.planStartDate).toLocaleDateString()}</td>
              <td>{user.extendendDays}</td>
              <td>{new Date(user.planEndDate).toLocaleDateString()}</td>
              <td className='freetrial-buttons'>
                
                <button 
                  style={{ border: 'none', backgroundColor: '#FFFFFF' }} 
                  onClick={() => handleDeleteClick(user)}  // Show popup on delete button click
                >
                  <img src={delimg} alt="delete"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {/* Delete confirmation popup */}
      {showDeletePopup && (
        <div className="delete-popup">
          <div className="delete-popup-content">
            <div className='freetrial-deletepopupheading'></div>
            <div>Are you sure you want to continue?</div>
            <div className="popup-actions">
              <button className="popup-button" onClick={() => setShowDeletePopup(false)}>No</button>
              <button className="popup-button popup-button-confirm" onClick={handleConfirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeTrial;
