import React from "react";
import "./mostbought.css"

const plansData = [
  { users: 230, name: "Basic Plan", usage: 30, percent: 15, color: "#4263EB" },
  { users: 160, name: "Standard Plan", usage: 15, percent: 7, color: "#F59E0B" },
  { users: 100, name: "Premium Plan", usage: 5, percent: 3, color: "#10B981" },
  { users: 969, name: "Free Trial Plan", usage: 80, percent: 75, color: "#FBBF24" },
];

const MostBoughtPlans = () => {
  return (
    <div className="most-bought-plans">
      <div className="mbought-title">Most Bought Plans</div>
      <div className="mbought-table-container">
        <div className="mbought-table-header">
          <div className="header-item">No of Users</div>
          <div className="header-item">Plan Name</div>
          <div className="header-item">Usage</div>
          <div className="header-item">Percent</div>
        </div>
        <div className="table-body">
          {plansData.map((plan, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{plan.users}</div>
              <div className="table-cell">{plan.name}</div>
              <div className="table-cell">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${plan.usage}%`, backgroundColor: plan.color }}
                  ></div>
                </div>
              </div>
              <div className="table-cell">
                <span
                  className={`badge`} style={{ border:`1px solid ${plan.color}`} }
                >
                  {plan.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostBoughtPlans;