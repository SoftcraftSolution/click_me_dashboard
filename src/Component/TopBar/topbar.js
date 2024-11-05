import React from 'react';
import './topbar.css';  // Import the external CSS
import pro from '../../assets/profile.png';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="profile-container">
        <div className="notification-icon">
          {/* Inline SVG for bell icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
            fill="currentColor"
          >
            <path d="M480 1200q-29 0-48.5-19.5T412 1132h136q0 29-19.5 48.5T480 1200Zm-240-240v-60h60v-300q0-96 54-175.5T480 339v-43q0-24 17-41t41-17q24 0 41 17t17 41v43q96 30 150 109.5T800 600v300h60v60H240Zm240-240Z" />
          </svg>
        </div>
        <div className="profile-icon">
          <img src={pro} alt="User Profile" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
