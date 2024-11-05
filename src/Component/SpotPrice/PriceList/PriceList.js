import React from 'react';
import './PriceList.css'; // External CSS for this component
import filter from '../../../assets/filter.png';

const PriceListTable = () => {
  return (
    <div className="spotpricelist-list">
    <div className='spotpricelisttablefunctions'>    
      <div className='spotpricetitle'>Price List</div>
      <div className="spotpricelisttable-controls">
      <input type="text" placeholder="Search by name, phone..." className="spotpricelist-input" />
      <div id="spotpricelistpicker">
          <input type="date" id="birthday" name="birthday" className="date-picker-input" />
        </div>
      <button style={{border:"none",backgroundColor:"#FFFFFF", paddingLeft:"20px"}}>
          <img src={filter} alt="filter"/>
    </button>
</div> 
        
      </div>
      <table className='spotpricelisttable'>
        <thead>
          <tr>
            <th className='spotpricelistheading'>Posted by</th>
            <th className='spotpricelistheading'>Commodity</th>
            <th className='spotpricelistheading'>City</th>
            <th className='spotpricelistheading'>Country</th>
            <th className='spotpricelistheading'>Previous Amt</th>
            <th className='spotpricelistheading'>Current Amt</th>
            <th className='spotpricelistheading'>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='spotpricelistdata'>Bhavesh Kumar</td>
            <td className='spotpricelistdata'>Steel Ingot</td>
            <td className='spotpricelistdata'>Mumbai</td>
            <td className='spotpricelistdata'>India</td>
            <td className='spotpricelistdata'>1800</td>
            <td className='spotpricelistdata'>1900</td>
            <td className='spotpricelistdata'>12-04-2024, 22:14</td>
          </tr>
          <tr>
            <td className='spotpricelistdata'>Ram Bandhu</td>
            <td className='spotpricelistdata'>Armature</td>
            <td className='spotpricelistdata'>Nairobi</td>
            <td className='spotpricelistdata'>Kenya</td>
            <td className='spotpricelistdata'>23,000</td>
            <td className='spotpricelistdata'>22,890</td>
            <td className='spotpricelistdata'>30-12-2024, 14:27</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceListTable;
