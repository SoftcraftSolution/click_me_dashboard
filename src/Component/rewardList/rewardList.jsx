import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rewardList.css";
import product from '../../assets/productimageforproductpage.png';
import profileimg from '../../assets/profile.png';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://clouthing-ecommerce-backend.vercel.app/user/order-list");
        if (response.data.success) {
          const formattedOrders = response.data.data.map(order => ({
            id: order.orderId,
            date: new Date(order.orderDate).toLocaleString(),
            customerName: order.username,
            total: order.totalPrice,
            paymentMethod: order.paymentMethod,
            details: {
              products: order.products || [],
              customerDetails: {
                name: order.username,
                email: order.userEmail || "N/A",
              },
              shippingAddress: {
                name: order.username,
                phone: order.userPhone || "N/A",
                address: order.shippingAddress || "N/A",
              },
            },
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const calculateSummary = (products) => {
    const subtotal = products.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 1), 0);
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

  const renderProductItems = (products) => {
    return products.length > 0 ? (
      products.map((product, index) => (
        <tr key={index}>
          <td style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={product.images[0]} // Use the first image from the product's images array
              alt={product.productName}
              style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '8px' }}
            />
            <div>
              {product.productName}
              <br />
              <small>Color - {product.color || "N/A"}</small><br />
              <small>Size - {product.size || "N/A"}</small>
            </div>
          </td>
          <td>${product.price || 0}</td>
          <td>{product.quantity || 1}</td>
          <td>${(product.price || 0) * (product.quantity || 1)}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>No product details available</td>
      </tr>
    );
  };

  const renderSummary = (products) => {
    const { subtotal, deliveryCharge, tax, discount, totalAmount } = calculateSummary(products);
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
        <h3 style={{ color: "#8B909A", fontWeight: "400", paddingLeft: "8px" }}>Customer Details</h3>
        <div className="customer-info">
          <img 
            src={profileimg} 
            alt="Customer Profile" 
            className="customer-profile-img" 
          />
          <div>
            <div style={{ color: "#23272E" }}>{details.customerDetails.name}</div>
            <div style={{ color: "#808191" }}>{details.customerDetails.email}</div>
          </div>
        </div>
      </div>

      <div className="orderDetails-shipping">
        <h3 style={{ color: "#8B909A", fontWeight: "400" }}>Shipping Address</h3>
        <p>{details.shippingAddress.name}</p>
        <p>{details.shippingAddress.phone}</p>
        <p>{details.shippingAddress.address}</p>
      </div>
    </>
  );

  return (
    <div className="ordersList-container">
      <button style={{ border: "none", background: "none", width: "20%", textAlign: "left" }} className="backToOrdersButton" onClick={handleBackToOrders}>
        &larr; Order Details
      </button>
      {selectedOrder ? (
        <div className="orderDetails-container">
          <div className="orderDetails-header">
            <h2 style={{ fontWeight: 400, fontSize: '18px', color: '#23272E' }}>
              {selectedOrder.id} | {selectedOrder.date} | {selectedOrder.details.products.length} PRODUCTS | 
              <strong> Total ${selectedOrder.total}</strong> | 
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', backgroundColor: '#279F51', borderRadius: "10px", padding: "4px" }} >
                PAID
              </span>
            </h2>
          </div>

          <div className="orderDetails-body">
            <div className="orderDetails-items">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCTS</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>{renderProductItems(selectedOrder.details.products)}</tbody>
              </table>
              {renderSummary(selectedOrder.details.products)}
            </div>
            <div className="orderDetails-sidebar">
              {renderDetails(selectedOrder.details)}
            </div>
          </div>
        </div>
      ) : (
        <div className="ordersList">
          <h1>Orders</h1>
          <div style={{ paddingBottom: "10px" }} className="ordertabs">
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
                <tr key={order.id} >
                  <td onClick={() => handleOrderClick(order)}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customerName}</td>
                  <td>${order.total}</td>
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
      )}
    </div>
  );
}

export default OrdersList;
