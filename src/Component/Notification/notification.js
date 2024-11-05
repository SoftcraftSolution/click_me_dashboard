import React from "react";
import "./notification.css";
import { FaSearch } from "react-icons/fa";
import notificationicon from '../../assets/notificationicon.png';

const Notifications = () => {
  const notifications = [
    { name: "Ajith Bhatia", message: "Received a request for Free Trial", time: "5 min ago" },
    { name: "Anna Phil", message: "Free Trial has Expired", time: "24 min ago" },
    { name: "Tushar harihant", message: "Payment of 1900 received for the Premium Subscription", time: "1 hr ago" },
    { name: "Ashutosh Kumar", message: "Rescheduled his appointment with Dr. Saniya Kotak", time: "6 hr ago" },
    { name: "Shreya John", message: "Payment of 1400 received for the Standard Subscription", time: "Yesterday" },
    { name: "Admeya Shaikh", message: "Premium Subscription will be expiring in 4 days", time: "Monday" },
    { name: "Nikhil Chandra Kamath", message: "Free Trial has Expired", time: "Monday" },
  ];

  return (
    <div className="notification-container">
      <h2 className="notification-title">Notifications</h2>
      <h3>12 new notifications (120)</h3>
      <div className="notification-header">
        <div className="notification-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <select className="sort-by">
          <option>Sort by: Recent</option>
        </select>
      </div>
      <div className="notification-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div className="notification-avatar">
              <img src={notificationicon} alt="Notification Avatar" />
            </div>
            <div className="notification-content">
              <div className="notification-header-content">
                <h4>{notification.name}</h4>
           
                  <p>{notification.time}</p>
               
              </div>
              <p>{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
