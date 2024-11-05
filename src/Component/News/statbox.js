import React from 'react';
import './news.css';

const StatBox = ({ title, number, shareCount, imageSrc }) => {
    return (
      <div className="stat-box">
        <div className="stat-image">
          <img src={imageSrc} alt={`${title} icon`} />
        </div>
        <div className="stat-content">
          <div className="news-title">{title}</div>
          <div className="stat-row">
            <div className="stat-number">{number}</div>
            <div className="stat-share">{shareCount} shared this month</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatBox;
  
