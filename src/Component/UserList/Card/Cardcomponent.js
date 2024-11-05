import React from "react";
import './Cardcomponent.css';
import totalUsersIcon from '../../../assets/userlistimg.png'; // Adjust the path to your image
import freeTrialIcon from '../../../assets/freeuserlist.png'; // Adjust the path to your image
import subscribedIcon from '../../../assets/subscribeduserlist.png'; // Adjust the path to your image
import rejectedIcon from '../../../assets/rejecteduserlist.png'; // Adjust the path to your image

const CardsComponent = () => {
  const cardsData = [
    { title: "Total Users", count: 16689, className: "total-users", iconBgColor: "#E0E7FF", icon: totalUsersIcon },
    { title: "Free Trial Users", count: 10293, className: "free-trial", iconBgColor: "#FFF7CD", icon: freeTrialIcon },
    { title: "Subscribed Users", count: 4279, className: "subscribed", iconBgColor: "#D9FEE6", icon: subscribedIcon },
    { title: "Rejected Users", count: 2040, className: "rejected", iconBgColor: "#FDE7E7", icon: rejectedIcon }
  ];

  return (
    <div className="cards-wrapper">
      <div className="cards-title">User List</div> {/* Using div for title */}
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div key={index} className={`card ${card.className}`}>
            <div className="card-info">
              <p>{card.title}</p>
              <h3>{card.count.toLocaleString()}</h3>
            </div>
            <div className="card-icon-container" style={{ backgroundColor: card.iconBgColor }}>
              <img src={card.icon} alt={card.title} className="card-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsComponent;
