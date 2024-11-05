import './verifyuser.css';
import filterimg from '../../assets/filter.png';
import tickimg from '../../assets/tickimg.png';
import delimg from '../../assets/removeimg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination';

function VerifyUsers() {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('https://markethub-app-backend.onrender.com/user/pending-user-list');
        if (response.data.success) {
          const fetchedUsers = response.data.data.map((user) => ({
            id: user._id,
            name: user.fullName,
            phone: user.phoneNumber,
            alterno: user.whatsappNumber,
            email: user.email,
            pincode: user.pincode,
            city: user.city,
            state: user.state,
            visitingCard: user.visitingCard,
            dateTime: new Date(user.createdAt).toLocaleString(),
          }));
          setUsers(fetchedUsers);
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleTickClick = (user) => {
    setSelectedUser(user);
    setIsAcceptModalOpen(true);
  };

  const handleRejectClick = (user) => {
    setSelectedUser(user);
    setIsRejectModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      console.log("Selected User Email:", selectedUser.email); // Log the email being sent
      const response = await axios.get(`https://markethub-app-backend.onrender.com/user/user-approve`, {
        params: {
          email: selectedUser.email,
          isApproved: "true",
        },
      });
      if (response.data.success) {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== selectedUser.id));
      } else {
        console.error('Failed to approve user:', response.data.message);
      }
    } catch (error) {
      console.error('Error approving user:', error.response?.data || error.message);
    } finally {
      setIsAcceptModalOpen(false);
    }
  };
  
  const handleRejectConfirm = async () => {
    try {
      const response = await axios.get('https://markethub-app-backend.onrender.com/user/reject-user', {
        params: {
          email: selectedUser.email,
          isRejected: "false",
        },
      });
      if (response.data.success) {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== selectedUser.id));
      } else {
        console.error('Failed to reject user:', response.data.message);
      }
    } catch (error) {
      console.error('Error rejecting user:', error.response?.data || error.message);
    } finally {
      setIsRejectModalOpen(false);
    }
  };
  

  const handleCancel = () => {
    setIsAcceptModalOpen(false);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="verify-users-container">
      <div className="verify-heading">Verify Users</div>

      <div className="table-container">
        <div className="top-bar">
          <div style={{ paddingTop: '10px', fontSize: "16px", fontWeight: "600" }}>Verify Users</div>
          <div className="verify-search">
            <input type="text" placeholder="Search by name, phone..." className="expired-input" />
          </div>
          <button className="filter-btn">
            <img src={filterimg} alt="filter" />
          </button>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Full Name</th>
              <th>WhatsApp No</th>
              <th>Alternate No</th>
              <th>Email</th>
              <th>Pincode</th>
              <th>City</th>
              <th>State</th>
              <th>Visiting Card</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='buttonsverify'>
                  <button className="edit-btn" onClick={() => handleTickClick(user)}>
                    <img src={tickimg} alt="accept" />
                  </button>
                  <button className="delete-btn" onClick={() => handleRejectClick(user)}>
                    <img src={delimg} alt="reject" />
                  </button>
                </td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.alterno}</td>
                <td>{user.email}</td>
                <td>{user.pincode}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>
                  {user.visitingCard ? (
                    <img src={user.visitingCard} alt="Visiting Card" className="visiting-card" />
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>{user.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

      {isAcceptModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content accept-modal">
            <div className='modal-title'>Add User</div>
            <div className='modal-confirmation-message'>Are you sure you want to accept the user?</div>
            <div className="modal-actions">
              <button className="modal-btn modal-cancel" onClick={handleCancel}>No</button>
              <button className="modal-btn modal-confirm" onClick={handleConfirm}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {isRejectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content reject-modal">
            <div className='modal-title-reject'>Reject User</div>
            <div className='modal-confirmation-message-reject'>Are you sure you want to reject the user?</div>
            <div className="modal-actions-reject">
              <button className="modal-reject-btn modal-reject-cancel" onClick={handleCancel}>No</button>
              <button className="modal-reject-btn modal-reject-confirm" onClick={handleRejectConfirm}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyUsers;
