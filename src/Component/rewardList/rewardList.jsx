import './rewardList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RewardList() {
  const [rewards, setRewards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPoints, setFilterPoints] = useState('');
  const [filterExpiryDate, setFilterExpiryDate] = useState('');

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/reward-list');
        if (response.data.message === "Rewards fetched successfully") {
          const fetchedRewards = response.data.rewards.map((reward) => ({
            id: reward._id,
            rewardName: reward.rewardName,
            description: reward.rewardDescription,
            requiredPoints: reward.requiredPointsToRedeemReward,
            aboutOffer: reward.aboutOffer.join(', '),
            termsOfUse: reward.termsOfUse.join(', '),
            startDate: new Date(reward.createdAt).toLocaleDateString(),
            endDate: new Date(reward.expiryDate).toLocaleDateString(),
            expiryDate: new Date(reward.expiryDate), // Keep as Date object for filtering
            coupon: reward.rewardCode,
          }));
          setRewards(fetchedRewards);
        } else {
          console.error('Failed to fetch rewards:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching rewards:', error.response?.data || error.message);
      }
    };

    fetchRewards();
  }, []);

  // Filter rewards based on search term, required points, and expiry date
  const filteredRewards = rewards.filter((reward) => {
    const matchesSearchTerm = reward.rewardName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPoints = filterPoints ? reward.requiredPoints === parseInt(filterPoints, 10) : true;
    const matchesExpiry = filterExpiryDate
      ? new Date(reward.expiryDate).toDateString() === new Date(filterExpiryDate).toDateString()
      : true;

    return matchesSearchTerm && matchesPoints && matchesExpiry;
  });

  return (
    <div className="rewardList-container">
      <div className="rewardList-heading">Rewards List</div>
      
      <div className="rewardList-tableContainer">
      <div className="rewardList-controls">
        <input
          type="text"
          placeholder="Search by Reward Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rewardList-searchInput"
        />
        <input
          type="number"
          placeholder="Filter by Required Points"
          value={filterPoints}
          onChange={(e) => setFilterPoints(e.target.value)}
          className="rewardList-filterInput"
        />
        <input
          type="date"
          value={filterExpiryDate}
          onChange={(e) => setFilterExpiryDate(e.target.value)}
          className="rewardList-filterInput"
        />
      </div>
        <table className="rewardList-table">
          <thead>
            <tr>
              <th>Reward Name</th>
              <th>Description</th>
              <th>Req Points</th>
              <th>About Offer</th>
              <th>Terms of Use</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Coupon</th>
            </tr>
          </thead>
          <tbody>
            {filteredRewards.map((reward) => (
              <tr key={reward.id}>
                <td>{reward.rewardName}</td>
                <td>{reward.description}</td>
                <td>{reward.requiredPoints}</td>
                <td>{reward.aboutOffer}</td>
                <td>{reward.termsOfUse}</td>
                <td>{reward.startDate}</td>
                <td>{reward.endDate}</td>
                <td>{reward.coupon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RewardList;
