import React from 'react';
import CustomerRow from './customeRow';
import './recentcustomer.css';

const RecentCustomers = ({ customerData = [] }) => {
  // Dummy data to use when no customerData is provided
  const dummyData = [
    { fullName: 'John Doe', plan: 'Premium Plan', amount: '2999' },
    { fullName: 'Jane Smith', plan: 'Standard Plan', amount: '1999' },
    { fullName: 'Alex Brown', plan: 'Basic Plan', amount: '699' },
    { fullName: 'Chris Green', plan: 'Standard Plan', amount: '1999' }
  ];

  // Use provided data if available, otherwise fall back to dummyData
  const data = customerData.length > 0 ? customerData : dummyData;

  return (
    <div className="customer-table-container">
      <div className="recent-table-header">
        <div className="table-title">Recent Customers</div>
        <a href="#" className="view-all">
          View All →
        </a>
      </div>
      <div className="customer-table">
        <div className="customer-table-row header">
          <span className="customer-table-cell">Full Name</span>
          <div className="customer-table-cell">Subscription Type</div>
          <div className="customer-table-cell">Amount</div>
        </div>
        {/* Render CustomerRow for each customer */}
        {data.map((customer, index) => (
          <CustomerRow
            key={index}
            fullName={customer.fullName}
            plan={customer.plan}
            amount={customer.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentCustomers;
