import React, { useState } from 'react';
import './AddSbi.css';

const AddSBI = () => {
  const [belowRate, setBelowRate] = useState('');
  const [aboveRate, setAboveRate] = useState('');
  const [date, setDate] = useState('');

  const handlePost = () => {
    // Handle the post action here (e.g., send data to an API)
    console.log({ belowRate, aboveRate, date });
  };

  return (
    <div>
        <div className='sbi-topheading'>Future Price</div>
  <div className='sbi-outside'>     
    <div className="addsbi-container">
      <div className='sbi-subheading'>Add Reference Rate (SBI)</div>
      <div className="addsbi-form-group">
       
        <div className="addsbi-input-container">
          <input
          className='sbi-input'
            type="text"
            placeholder="Add Rate (Below 10L)"
            value={belowRate}
            onChange={(e) => setBelowRate(e.target.value)}
          />
          <input
          className='sbi-input'
            type="text"
            placeholder="Add Rate (Above 10L)"
            value={aboveRate}
            onChange={(e) => setAboveRate(e.target.value)}
          />
        </div>
      </div>
      <div className="addsbi-form-group">
        
        <input
        
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="addsbi-date-picker"
        />
      </div>
      <button className="addsbi-post-btn" onClick={handlePost}>
        Post
      </button>
    </div>
</div>   
    </div>
  );
};

export default AddSBI;
