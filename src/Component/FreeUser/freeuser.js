import React, { useEffect, useState } from 'react';
import './freeuser.css';
import action from '../../assets/action.png';
import deleteimage from '../../assets/deleteimg.png';
import Pagination from '../Pagination';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://markethub-app-backend.onrender.com/user/free-user-list');
        if (response.data.success) {
          setUsers(response.data.data); // Set the fetched user data
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const openDeletePopup = (user) => {
    setUserToDelete(user);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        // Replace with your delete API endpoint
        await axios.delete(`https://markethub-app-backend.onrender.com/user/delete-user/${userToDelete._id}`);
        // Remove the deleted user from the local state
        setUsers(users.filter(user => user._id !== userToDelete._id));
        closeDeletePopup();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="user-list-label">
        <div>User List</div>
      </div>
      <div className="user-list">
        <div className="user-list-header">
          <div className='freeuserdiv'>Free Users</div>
          <input type="text" placeholder="Search by name, phone..." className="freeuserlist-input" />
          <input type="date" className="freeuserlist-dateepicker" />
        </div>
        <table>
          <thead>
            <tr>
              <th className='tableheadingfont'>Full Name</th>
              <th className='tableheadingfont'>WhatsApp No</th>
              <th className='tableheadingfont'>Alternate No</th>
              <th className='tableheadingfont'>Pincode</th>
              <th className='tableheadingfont'>City</th>
              <th className='tableheadingfont'>State</th>
              <th className='tableheadingfont'>Start Date</th>
              <th className='tableheadingfont'>Plan Status</th>
              <th className='tableheadingfont'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='freeuserdata'>{user.fullName}</td>
                <td className='freeuserdata'>{user.whatsappNumber}</td>
                <td className='freeuserdata'>{user.phoneNumber}</td>
                <td className='freeuserdata'>{user.pincode}</td>
                <td className='freeuserdata'>{user.city}</td>
                <td className='freeuserdata'>{user.state}</td>
                <td className='freeuserdata'>{new Date(user.planStartDate).toLocaleDateString()}</td>
                <td className={user.planName.toLowerCase()}>{user.planName}</td>
                <td className='freeuser-buttons'>
         
                  <button className="edit-button" onClick={() => openDeletePopup(user)}>
                    <img src={deleteimage} alt='delete button' />
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

export default UserList;
