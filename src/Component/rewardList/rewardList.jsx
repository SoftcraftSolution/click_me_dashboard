import './rewardList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/order-list');
        if (response.data.message === "Orders fetched successfully") {
          setOrders(response.data.orders);
        } else {
          console.error('Failed to fetch orders:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="ordersList-container">
      <div className="ordersList-heading">Orders</div>
      <div className="ordersList-tabs">
        <button className="tab-button active">Order Placed</button>
        <button className="tab-button">Packaging</button>
        <button className="tab-button">On The Way</button>
        <button className="tab-button">Delivered</button>
        <button className="tab-button">Cancelled</button>
      </div>
      <div className="ordersList-controls">
        <input
          type="text"
          placeholder="Search..."
          className="ordersList-searchInput"
        />
      </div>
      <div className="ordersList-tableContainer">
        <table className="ordersList-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE & TIME</th>
              <th>CUSTOMER</th>
              <th>TOTAL</th>
              <th>PAYMENT METHOD</th>
              <th>TRACKING ID</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customerName}</td>
                <td>{order.total}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <input type="text" placeholder="Enter ID" className="trackingInput" />
                </td>
                <td>
                  <button className="deleteButton">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersList;
