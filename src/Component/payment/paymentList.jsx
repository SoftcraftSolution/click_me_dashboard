import './paymentList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentList() {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/order-list');
        if (response.data.message === "Orders fetched successfully") {
          const fetchedOrders = response.data.orders.map((order) => ({
            orderId: order.orderId,
            username: order.userId.fullName || 'N/A',
            email: order.userId.email,
            
            companyName: order.userId.companyId?.name || 'N/A',
            numberOfDishes: order.items.reduce((total, item) => total + item.quantity, 0),
            amount: order.totalPrice,
            orderStatus: order.status,
            paymentMethod: order.paymentMethod,
            paymentStatus: order.paymentStatus,
            createdAt: new Date(order.createdAt),
          }));

          setOrders(fetchedOrders);

          // Analytics calculations
          const total = fetchedOrders.reduce((acc, order) => acc + order.amount, 0);
          const currentMonth = new Date().getMonth();
          const currentDate = new Date().toDateString();

          const monthly = fetchedOrders.reduce((acc, order) => {
            const orderMonth = order.createdAt.getMonth();
            return orderMonth === currentMonth ? acc + order.amount : acc;
          }, 0);

          const today = fetchedOrders.reduce((acc, order) => {
            const orderDate = order.createdAt.toDateString();
            return orderDate === currentDate ? acc + order.amount : acc;
          }, 0);

          setTotalRevenue(total);
          setMonthlyRevenue(monthly);
          setTodayRevenue(today);
        } else {
          console.error('Failed to fetch orders:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term, status, and payment method
  const filteredOrders = orders.filter((order) => {
    const matchesSearchTerm =
      order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus ? order.orderStatus === filterStatus : true;
    const matchesPaymentMethod = filterPaymentMethod ? order.paymentMethod === filterPaymentMethod : true;

    return matchesSearchTerm && matchesStatus && matchesPaymentMethod;
  });

  return (
    <div className="paymentList-container">
      <div className="paymentList-heading">Payment</div>
      <div className="paymentList-analytics">
        <div className="paymentList-analyticsCard">
          <div className="analytics-title">Total Revenue</div>
          <div className="analytics-value">{totalRevenue}Rs</div>
        </div>
        <div className="paymentList-analyticsCard">
          <div className="analytics-title">Monthly Revenue</div>
          <div className="analytics-value">{monthlyRevenue}Rs</div>
        </div>
        <div className="paymentList-analyticsCard">
          <div className="analytics-title">Today's Revenue</div>
          <div className="analytics-value">{todayRevenue}Rs</div>
        </div>
      </div>
      
      <div className="paymentList-tableContainer">
      <div className="paymentList-controls">
        <input
          type="text"
          placeholder="Search by name, email, company, or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="paymentList-searchInput"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="paymentList-filterSelect"
        >
          <option value="">All Statuses</option>
          <option value="ordered">Ordered</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
        </select>
        <select
          value={filterPaymentMethod}
          onChange={(e) => setFilterPaymentMethod(e.target.value)}
          className="paymentList-filterSelect"
        >
          <option value="">All Payment Methods</option>
          <option value="card">Card</option>
          <option value="balance">Wallet</option>
          
        </select>
      </div>
        <table className="paymentList-table">
          <thead>
            <tr>
              <th>Customer Name</th>
             
  
              <th>Order ID</th>
              
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.username}</td>
                
               
                <td>{order.companyName}</td>
                
                <td>{order.amount}Rs</td>
                <td>{order.orderId}</td>
        
                <td>{order.paymentMethod}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;
