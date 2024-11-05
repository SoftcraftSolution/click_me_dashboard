import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './totalrevenue.css';

const data = [
  { day: 'Mon', basic: 10000, standard: 12000, premium: 15000 },
  { day: 'Tues', basic: 11000, standard: 13000, premium: 9000 },
  { day: 'Wed', basic: 8000, standard: 21000, premium: 18000 },
  { day: 'Thur', basic: 12000, standard: 9000, premium: 14000 },
  { day: 'Fri', basic: 15000, standard: 14000, premium: 12000 },
  { day: 'Sat', basic: 9000, standard: 8000, premium: 17000 },
  { day: 'Sun', basic: 20000, standard: 18000, premium: 16000 },
];

const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState('Weekly');
  const [selectedDate, setSelectedDate] = useState('2023-03-12');
  const formatYAxisValue = (value) => {
    return `${(value / 1000).toFixed(0)}k`; // Converts to thousands
  };
  const radius=[3, 3, 3, 3];
  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className='revenue-title'>Total Revenue</div>
        <div className="controls">
          <select style={{fontFamily:"poppins", border:"0px", backgroundColor:"#F0F2F6", fontWeight:"600", padding:"5px 10px"}}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <input 
          style={{fontFamily:"poppins", border:"0px", backgroundColor:"#F0F2F6", fontWeight:"600", padding:"5px 10px"}}
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
         barCategoryGap="20%" // Adjust this value for spacing between bar groups
         categoryGap={20} 
         // Add more space between individual bars within groups
      
        >
          <CartesianGrid vertical={false} stroke="#dcdcdc" /> {/* Show only horizontal lines */}
          
          <XAxis dataKey="day" axisLine={false} tickMargin={10}/>
          <YAxis tickFormatter={formatYAxisValue} axisLine={false} tickMargin={10}/>
          <Tooltip />
          <Legend   content={({ payload }) => (
    <div className="custom-legend" style={{display: 'flex',flexDirection:"row",paddingTop:"30px", justifyContent:"center"}}>
      {payload.map((entry, index) => (
        <div className="legend-item" key={`item-${index}`} style={{ display: 'flex',flexDirection:"row", alignItems: 'center', marginBottom: '5px', padding:"0px 20px"}}>
          <div
            className="legend-bullet"
            style={{
              backgroundColor: entry.color,
              width: '10px', // Circle size
              height: '10px', // Circle size
              borderRadius: '50%', // Makes it a circle
              marginRight: '8px', // Space between bullet and text
            }}
          />
          <span className="legend-text" style={{ color: 'black' }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )}/>
          <Bar dataKey="basic" fill="#1717BE" name="Basic Plan" radius={radius} barSize={15}/>
          <Bar dataKey="standard" fill="#E06A26" name="Standard Plan" radius={radius} barSize={15}/>
          <Bar dataKey="premium" fill="#008242" name="Premium Plan" radius={radius} barSize={15}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
