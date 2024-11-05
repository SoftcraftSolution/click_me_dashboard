import React, { useState } from 'react';
import './Updates.css';
import Pagination from '../Pagination';
import deleteIcon from '../../assets/deleteimg.png';
import sampleImage from '../../assets/logo.png';
import edit from '../../assets/edit.png';
import filter from '../../assets/filter.png'

const Updates = () => {
  const newsData = [
    {
      postedby: 'Ajmal Khan',
      title: 'Global Copper Cathode Market Growing',
      content: 'We are pleased to introduce the latest enhancements to our impending expansion...',
      link: 'https://tradegenomics.com/xxxxxx',
      pdf: true,
      image: sampleImage,
      uploadDate: '12-04-2024, 12:03',
    },
    {
      postedby: 'Kaushal Kumar',
      title: 'New Bulletin on New Price Updates',
      content: 'We are pleased to introduce the latest enhancements to our impending expansion...',
      link: 'https://tradegenomics.com/xxxxxx',
      pdf: false,
      image: sampleImage,
      uploadDate: '12-04-2024, 08:22',
    },
    // More mock data for rows can be added here
  ];

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    setSelectedDate(date);
    console.log(date);
  };

  const getStringDate = (date) => {
    if (!(date instanceof Date)) {
      throw new Error("Input must be a Date object");
    }
    return date.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="updates-page">
      <div className='updates-header'>Updates</div>


      <div className="updates-list">
        <div className='updates-close'>
          <div className='updatestitle'>
            News List
          </div>
          <div className="updatessearch-and-date">
            <input type="text" placeholder="Search by name, phone..." className="updatessearch-bar" />
            <div id="updates-datteePickeer">
              <input type="date" id="birthday" name="birthday" className="date-picker-input" value={getStringDate(selectedDate)} onChange={handleDateChange} />
            </div>
    
          </div>
        </div>

        <table className='updatestable'>
          <thead>
            <tr>
              <th className='updates-heading'>Posted By</th>
              <th className='updates-heading'>Title</th>
              <th className="content-column">Content</th>
              <th className='updates-heading'>News Link</th>
              <th className='updates-heading'>Image</th>
              <th className='updates-heading'>Pdf</th>
              <th className='updates-heading'>Date and Time</th>
              <th className='updates-heading'>Action</th>
            </tr>
          </thead>
          <tbody>
            {newsData.map((news, index) => (
              <tr key={index}>
                <td>{news.postedby}</td>
                <td>{news.title}</td>
                <td className="content-column">{news.content}</td>
                <td><a href={news.link} target="_blank" rel="noopener noreferrer">View Link</a></td>
                <td>
                  {news.image ? <img src={news.image} alt="news-img" style={{ width: '50px', height: '50px', borderRadius: '10px' }} /> : '-'}
                </td>
                <td>{news.pdf ? <img src="/pdf-icon.png" alt="PDF" /> : '-'}</td>
                <td>{news.uploadDate}</td>
                <td>
                  <button style={{border:"none",backgroundColor:"#FFFFFF"}}  className="delete-button">
                    <img src={deleteIcon} alt="delete" />
                  </button>
                  <button style={{border:"none",backgroundColor:"#FFFFFF"}} className="edit-button">
                    <img src={edit} alt="delete" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination /> 
    </div>
  );
};

export default Updates;



