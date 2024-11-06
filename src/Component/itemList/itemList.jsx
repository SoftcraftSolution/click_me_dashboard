// ItemList.js
import './itemList.css';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/deleteimg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-all-item');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error.response?.data || error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="itemList-container">
      <div className="itemList-heading">Item List</div>

      <div className="itemList-tableContainer">
        <div className="itemList-topBar">
          <input type="text" placeholder="Search.." className="itemList-searchInput" />
          <input type="date" className="itemList-dateInput" />
        </div>

        <table className="itemList-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Type</th>
              <th>Menu Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>
                  <img src={item.image} alt={item.itemName} className="itemList-itemImage" />
                </td>
                <td>
                  {item.description.length > 50 ? (
                    <>
                      {item.description.substring(0, 50)}... <a href="#">Read All</a>
                    </>
                  ) : (
                    item.description
                  )}
                </td>
                <td>{item.subcategory.categoryId.name}</td>
                <td>₹{item.price}</td>
                <td className={item.isVeg ? "veg" : "nonVeg"}>
                  {item.isVeg ? "Veg" : "Non Veg"}
                </td>
                <td>Global</td> {/* Assuming static value for Menu Type */}
                <td className="itemList-actionIcons">
                  <button className="itemList-editBtn">
                    <img src={editIcon} alt="Edit" className="itemList-actionIcon" />
                  </button>
                  <button className="itemList-deleteBtn">
                    <img src={deleteIcon} alt="Delete" className="itemList-actionIcon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemList;
