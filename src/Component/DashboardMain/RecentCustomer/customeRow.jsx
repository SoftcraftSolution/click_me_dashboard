import React from 'react';

const CustomerRow = ({ fullName, plan, amount }) => {
  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 15px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #f5f5f5',
  };

  const cellStyle = {
    // flex: 2,
    textAlign: 'left',
  };

  const planColors = {
    'Premium Plan': '#b524f9', // Purple color for Premium Plan
    'Standard Plan': '#2962ff', // Blue color for Standard Plan
    'Basic Plan': '#f8981d',    // Orange color for Basic Plan
  };

  return (
    <div style={rowStyle}>
      <div style={cellStyle}>{fullName}</div>
      <div style={{ ...cellStyle, color: planColors[plan] }}>{plan}</div>
      <div style={cellStyle}>{amount}</div>
    </div>
  );
};

export default CustomerRow;
