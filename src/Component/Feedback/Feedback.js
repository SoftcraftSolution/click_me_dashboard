import './Feedback.css';
import React, { useState } from 'react';

function FeedbackList() {
  // Dummy data for feedbacks
  const dummyFeedbacks = [
    {
      id: 'FB123',
      username: 'John Doe',
      email: 'johndoe@example.com',
      companyName: 'Tech Solutions',
      rating: 4,
      description: 'Great service, will use again.',
    },
    {
      id: 'FB124',
      username: 'Jane Smith',
      email: 'janesmith@example.com',
      companyName: 'Marketing Co.',
      rating: 5,
      description: 'Excellent experience, highly recommended!',
    },
    {
      id: 'FB125',
      username: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      companyName: 'Web Innovators',
      rating: 3,
      description: 'Good, but there is room for improvement.',
    },
    {
      id: 'FB126',
      username: 'Alice Brown',
      email: 'alicebrown@example.com',
      companyName: 'Creative Solutions',
      rating: 2,
      description: 'Not satisfied with the service, could be better.',
    },
  ];

  const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');  // To hold the selected message for the popup

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    return (
      <span className="feedbackList-stars">
        {'★'.repeat(starCount)}
        {'☆'.repeat(5 - starCount)}
      </span>
    );
  };

  // Filter feedbacks based on search term and selected rating
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch = feedback.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating ? feedback.rating === parseInt(selectedRating, 10) : true;
    return matchesSearch && matchesRating;
  });

  // Handle the "View" button click to show the message in a popup
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedMessage('');
  };

  return (
    <div className="feedbackList-container">
      <div className="feedbackList-heading">Contact Us</div>
      <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="feedbackList-searchInput"
        />
      <div className="feedbackList-tableContainer">
        <table className="feedbackList-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL ADDRESS</th>
              <th>PHONE NO</th>
              <th>DATE & TIME</th>
             
              <th>MESSAGE</th> {/* Added column for View button */}
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.username}</td>
                <td>{feedback.email}</td>
                <td>{feedback.companyName}</td>
                <td>{feedback.description}</td>
                
                <td>
                  <button style={{border:"none",background:"transparent",textDecoration:"underline",fontSize:"14px"}} className="viewButton" onClick={() => handleViewMessage(feedback.description)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for displaying the message */}
      {selectedMessage && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>✖</button>
            <h2>Feedback Message</h2>
            <p>{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackList;
