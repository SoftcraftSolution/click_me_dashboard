// NotificationList.js
import React from 'react';
import NotificationItem from './module';
import './recentnotification.css';

const NotificationList = ({ notifications }) => {
  // Dummy data to be used if no notifications are passed
  const defaultNotifications = [
    { id: 1, name: 'Ajith Bhatia', message: 'Received a request for Free Trial', timeAgo: '5 min ago' },
    { id: 2, name: 'Anna Phil', message: 'Free Trial has Expired', timeAgo: '24 min ago' },
    { id: 3, name: 'Ashutosh Kumar', message: 'Rescheduled his appointment...', timeAgo: '6 hr ago' },
    { id: 4, name: 'Anna Phil', message: 'Free Trial has Expired', timeAgo: '24 min ago' },
  ];

  // Use passed notifications if available, otherwise use the default dummy data
  const displayNotifications = notifications || defaultNotifications;

  return (
    <div className="notification-list-container">
      <div className="notification-header">
        <h3>Recent Notifications</h3>
        <a href="#view-all" className="view-all-link">View All →</a>
      </div>
      <div className="notification-list">
        {displayNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            name={notification.name}
            message={notification.message}
            timeAgo={notification.timeAgo}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
