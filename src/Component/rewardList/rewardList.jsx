import React, { useState } from "react";
import "./rewardList.css";
import product from '../../assets/productimageforproductpage.png';
import profileimg from '../../assets/profile.png';

function OrdersList() {
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2025-01-01 10:00 AM",
      customerName: "John Doe",
      total: 1200,
      paymentMethod: "Credit Card",
      details: {
        items: [
          { name: "Black & Green Long Kurti", color: "Teal Blue", size: "XS", price: 400, quantity: 2 },
          { name: "Black & Green Long Kurti", color: "Teal Blue", size: "XS", price: 400, quantity: 1 },
        ],
        customerDetails: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        shippingAddress: {
          name: "John Doe",
          phone: "1234567890",
          address: "123 Main Street, New York, NY, 10001",
        },
      },
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = 40;
    const tax = subtotal * 0.05; // 5% GST
    const discount = 40;
    const totalAmount = subtotal + deliveryCharge + tax - discount;
    return { subtotal, deliveryCharge, tax, discount, totalAmount };
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  const renderOrderItems = (items) => {
    return items.map((item, index) => (
      <tr key={index}>
      <td style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={product}  // Replace with item.image if dynamic
          alt={item.name}
          style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '8px' }}
        />
        <div>
          {item.name}
          <br />
          <small>Color - {item.color}</small><br />
          <small>Size - {item.size}</small>
        </div>
      </td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${item.price * item.quantity}</td>
    </tr>
    ));
  };

  const renderSummary = (items) => {
    const { subtotal, deliveryCharge, tax, discount, totalAmount } = calculateSummary(items);
    return (
      <div className="orderDetails-summary">
        <h3>Summary</h3>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charges</span>
          <span>${deliveryCharge}</span>
        </div>
        <div className="summary-item">
          <span>GST and Service Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Coupon Discount</span>
          <span>-${discount}</span>
        </div>
        <div className="summary-total">
          <span>Total Amount</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    );
  };

  const renderDetails = (details) => (
    <>
     <div className="orderDetails-customer">
  <h3 style={{ color: "#8B909A", fontWeight: "400",paddingLeft:"8px" }}>Customer Details</h3>
  <div className="customer-info">
    <img 
      src={profileimg} 
      alt="Customer Profile" 
      className="customer-profile-img" 
    />
    <div>
      <div style={{color:"#23272E"}}>{details.customerDetails.name}</div>
      <div style={{color:"#808191"}}>{details.customerDetails.email}</div>
    </div>
  </div>
</div>

      <div className="orderDetails-shipping">
        <h3 style={{color:"#8B909A",fontWeight:"400"}}>Shipping Address</h3>
        <p>{details.shippingAddress.name}</p>
        <p>{details.shippingAddress.phone}</p>
        <p>{details.shippingAddress.address}</p>
      </div>
    </>
  );

  return (
    <div className="ordersList-container">
      <button style={{border:"none",background:"none",width:"20%",textAlign:"left"}} className="backToOrdersButton" onClick={handleBackToOrders}>
            &larr; Order Details
          </button>
      {selectedOrder ? (
        <div className="orderDetails-container">
          
          <div className="orderDetails-header">
  <h2 style={{ fontWeight: 400, fontSize: '18px', color: '#23272E' }}>
    {selectedOrder.id} | {selectedOrder.date} | {selectedOrder.details.items.length} ITEMS | <strong>Total ${selectedOrder.total}</strong> | <span style={{ color: '#FFFFFF', fontWeight: 'bold',backgroundColor:'#279F51',borderRadius:"10px",padding:"4px" }}>PAID</span>
  </h2>
</div>

          
          <div className="orderDetails-body">
            <div className="orderDetails-items">
              <table>
                <thead>
                  <tr>
                    <th>ITEMS</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>{renderOrderItems(selectedOrder.details.items)}</tbody>
              </table>
              {renderSummary(selectedOrder.details.items)}
            </div>
            <div className="orderDetails-sidebar">
              {renderDetails(selectedOrder.details)}
            </div>
          </div>
        </div>
      ) : (
        <div className="ordersList">
          <h1>Orders</h1>
          <div style={{paddingBottom:"10px"}} className="ordertabs">
              <button className="active">Orders Placed</button>
              <button>On the Way</button>
              <button>Delivered</button>
              <button>Cancelled</button>
            </div>
            <input
              type="text"
              className="orderproductsearchbutton"
              placeholder="Search..."
            />
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
                <tr key={order.id} onClick={() => handleOrderClick(order)}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customerName}</td>
                  <td>${order.total}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                  <input
                    type="text"
                    placeholder="Enter ID"
                    className="trackingInput"
                  />
                </td>
                <td>
                  <button className="deleteButton">✖</button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersList;
