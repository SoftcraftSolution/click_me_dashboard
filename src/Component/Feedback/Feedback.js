import './Feedback.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/feedback-list');
        if (response.data.message === "Feedback fetched successfully") {
          const fetchedFeedbacks = response.data.feedback.map((feedback) => ({
            id: feedback._id,
            username: feedback.userId.fullName,
            email: feedback.userId.email,
            companyName: feedback.userId.companyId?.name || 'N/A',
            rating: feedback.rating,
            description: feedback.description,
          }));
          setFeedbacks(fetchedFeedbacks);
        } else {
          console.error('Failed to fetch feedback:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error.response?.data || error.message);
      }
    };

    fetchFeedbacks();
  }, []);

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

  return (
    <div className="feedbackList-container">
      <div className="feedbackList-heading">Feedback List</div>
      
      <div className="feedbackList-tableContainer">
      <div className="feedbackList-controls">
        <input 
          type="text" 
          placeholder="Search by name, email, company, or description..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="feedbackList-searchInput"
        />
        <select 
          value={selectedRating} 
          onChange={(e) => setSelectedRating(e.target.value)}
          className="feedbackList-filterSelect"
        >
          <option value="">All Ratings</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
        <table className="feedbackList-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email Address</th>
              <th>Company Name</th>
              <th>Feedback Description</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.username}</td>
                <td>{feedback.email}</td>
                <td>{feedback.companyName}</td>
                <td>{feedback.description}</td>
                <td>{renderStars(feedback.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedbackList;
