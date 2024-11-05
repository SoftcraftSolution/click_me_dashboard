import React, { useState } from 'react';
import './VerifySpot.css'; // External CSS for this component
import filter from '../../../assets/filter.png';
import tick from '../../../assets/tickimg.png';
import untic from '../../../assets/dontverify.png';

const userData = [
  {
    postedBy: 'Bhavesh Kumar',
    commodity: 'Steel Ingot',
    city: 'Mumbai',
    country: 'India',
    previousAmt: '1800',
    currentAmt: '1800',
    dateTime: '12-04-2024, 22:14',
  },
  {
    postedBy: 'Ram Bandhu',
    commodity: 'Armature',
    city: 'Nairobi',
    country: 'Kenya',
    previousAmt: '23,000',
    currentAmt: '22,890',
    dateTime: '30-12-2024, 14:27',
  },
  // Add more user data here as needed
];

const VerifyUsersTable = () => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleTickClick = (user) => {
    setSelectedUser(user);
    setIsAcceptModalOpen(true);
  };

  const handleRejectClick = (user) => {
    setSelectedUser(user);
    setIsRejectModalOpen(true);
  };

  const handleConfirm = () => {
    console.log('User accepted:', selectedUser);
    setIsAcceptModalOpen(false);
    // Add your logic here for accepting the user
  };

  const handleRejectConfirm = () => {
    console.log('User rejected:', selectedUser);
    setIsRejectModalOpen(false);
    // Add your logic here for rejecting the user
  };

  const handleCancel = () => {
    setIsAcceptModalOpen(false);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="spotverify-users">
      <div className='spotverifyheadingfunctions'>
        <div className='spotverifytitle'>Verify Users</div>
        <div className="spotverifytable-controls">
          <input type="text" placeholder="Search by name, phone..." className="spotverify-input" />
          <button style={{ border: "none", backgroundColor: "#FFFFFF", paddingLeft: "20px" }}>
            <img src={filter} alt="filter" />
          </button>
        </div>
      </div>
      <table className='spotverifytable'>
        <thead>
          <tr>
            <th className='spotverifyheading'>Posted by</th>
            <th className='spotverifyheading'>Commodity</th>
            <th className='spotverifyheading'>City</th>
            <th className='spotverifyheading'>Country</th>
            <th className='spotverifyheading'>Previous Amt</th>
            <th className='spotverifyheading'>Current Amt</th>
            <th className='spotverifyheading'>Date & Time</th>
            <th className='spotverifyheading'>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td className='spotverifydata'>{user.postedBy}</td>
              <td className='spotverifydata'>{user.commodity}</td>
              <td className='spotverifydata'>{user.city}</td>
              <td className='spotverifydata'>{user.country}</td>
              <td className='spotverifydata'>{user.previousAmt}</td>
              <td className='spotverifydata'>{user.currentAmt}</td>
              <td className='spotverifydata'>{user.dateTime}</td>
              <td className='spotverifydata'>
                <button style={{ border: "none", backgroundColor: "#FFFFFF" }} onClick={() => handleTickClick(user)}>
                  <img src={tick} alt='tick' />
                </button>
                <button style={{ border: "none", backgroundColor: "#FFFFFF" }} onClick={() => handleRejectClick(user)}>
                  <img src={untic} alt='deny' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Accept Modal Popup */}
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

      {/* Reject Modal Popup */}
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
};

export default VerifyUsersTable;
