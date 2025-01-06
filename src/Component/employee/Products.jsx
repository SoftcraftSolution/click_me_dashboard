import React, { useState } from "react";
import "./Products.css";
import "./AddProduct.css";
import productimg from "../../assets/productimageforproductpage.png";
import detailsimg from '../../assets/detailsimage.png';

// Sample product data
const products = [
  {
    id: 1,
    name: "Black & Green Long Kurti Top",
    price: "2457₹",
    pattern: "Lucknowi",
    fabric: "Italian Linear",
    category: "Wardrobe - Long Kurti",
    description:
      "The term kurti traditionally refers to waist coats, jackets, and blouses that sit above the waist without side slits. It is believed to have descended from the tunic of the Shunga period (2nd century B.C.).",
    sizes: [
      { size: "M", quantity: 244 },
      { size: "L", quantity: 244 },
      { size: "XL", quantity: 244 },
      { size: "XXL", quantity: 10 },
      { size: "3XL", quantity: 244 },
    ],
    images: [productimg, productimg], // Replace with actual image URLs
    totalOrders: 506,
    totalQty: 14,
    status: "Out of Stock",
    visits: "124k",
  },
  {
    id: 2,
    name: "Black & Green Co-ord Set",
    price: "3499₹",
    pattern: "Striped",
    fabric: "Silk",
    category: "Occasion - Co-ord Set",
    description:
      "A trendy co-ord set for modern fashion lovers. Perfect for casual and evening wear.",
    sizes: [
      { size: "M", quantity: 50 },
      { size: "L", quantity: 120 },
      { size: "XL", quantity: 60 },
    ],
    images: [productimg, productimg],
    totalOrders: 760,
    totalQty: 14,
    status: "In Stock",
    visits: "200k",
  },
  // Add more products as needed
];

const ProductPage = () => {
  const [category, setCategory] = useState("Wardrobe");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleBackClick = () => {
    setIsAddingProduct(false);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewingDetails(true);
  };

  const handleBackToProducts = () => {
    setIsViewingDetails(false);
    setSelectedProduct(null);
  };

  return (
    <div className="product-page">
      {!isAddingProduct && !isViewingDetails ? (
        <>
          {/* Product List */}
          <header className="product-header">
            <h2 style={{ color: "#1C2A53", fontWeight: "400", fontSize: "24px" }}>
              Products
            </h2>
            <div className="tabs">
              <button className="active">Wardrobe</button>
              <button>Occasion</button>
              <button>Casual</button>
            </div>
          </header>

          <div className="search-add">
            <input
              type="text"
              className="productsearchbutton"
              placeholder="Search..."
            />
            <button className="add-product-btn" onClick={handleAddProductClick}>
              Add Product
            </button>
          </div>

          <table className="product-table">
            <thead>
              <tr className="producttablehead">
                <th style={{ textAlign: "left" }}>Product</th>
                <th style={{ textAlign: "left" }}>Details</th>
                <th style={{ textAlign: "left" }}>Category</th>
                <th style={{ textAlign: "left" }}>Total Orders</th>
                <th style={{ textAlign: "left" }}>Total QT</th>
                <th style={{ textAlign: "left" }}>Status</th>
                <th style={{ textAlign: "left" }}>Visits</th>
                <th style={{ textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="product-info">
                    <img
                      src={productimg}
                      alt={product.name}
                      className="product-image"
                    />
                    <span className="product-name">{product.name}</span>
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleViewProduct(product)}
                    >
                      View
                    </button>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.totalOrders}</td>
                  <td>{product.totalQty}</td>
                  <td
                    className={`status ${
                      product.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    {product.status}
                  </td>
                  <td>{product.visits}</td>
                  <td className="action-buttons">
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : isViewingDetails ? (
        <>
          {/* Product Details */}
          <button
                className="back-btn"
                onClick={handleBackToProducts}
                style={{ marginBottom: "20px", cursor: "pointer", border: "none",
                  background: "transparent",fontSize:"20px" ,color:"#1C2A53"}}
              >
                ← Product Details
              </button>
          <div className="product-details-container">
    
            <div className="product-details-basic">
        
              <h2>Basic Information</h2>
              <p>
                <span>Name:</span> {selectedProduct.name}
              </p>
              <p>
                <span>Price:</span> {selectedProduct.price}
              </p>
              <p>
                <span>Pattern:</span> {selectedProduct.pattern}
              </p>
              <p>
                <span>Fabric:</span> {selectedProduct.fabric}
              </p>
              <p>
                <span>Category:</span> {selectedProduct.category}
              </p>
              <p>
                <span>Description:</span> {selectedProduct.description}
              </p>
            </div>

            <div className="product-details-images">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={detailsimg}
                  alt={`Product Image ${index + 1}`}
                />
              ))}
            </div>

            <div className="product-details-size-quantity">
              <h3>Size & Quantity</h3>
              <table className="size-quantity-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.sizes.map((size, index) => (
                    <tr key={index}>
                      <td>{size.size}</td>
                      <td
                        className={size.quantity > 0 ? "in-stock" : "out-of-stock"}
                      >
                        {size.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Add Product Form */}
          <div className="addproduct-page">
            <header className="addproduct-header">
              <button className="addproduct-back-btn" onClick={handleBackClick}>
                ←
              </button>
              <h2 className="addproduct-title">Add Product</h2>
            </header>
            <form className="addproduct-form" onSubmit={handleSave}>
              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <label>Product Name</label>
                  <input
                    className="addproduct-input"
                    type="text"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="addproduct-form-group">
                  <label>Price</label>
                  <input
                    className="addproduct-input"
                    type="number"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <label>Colour</label>
                  <select className="addproduct-select">
                    <option>Select Colour</option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Green</option>
                  </select>
                </div>
                <div className="addproduct-form-group">
                  <label>Size</label>
                  <select className="addproduct-select">
                    <option>Select Size</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>

              <div className="addproduct-form-group">
                <label>Product Description</label>
                <textarea
                  className="addproduct-textarea"
                  placeholder="Enter product description"
                  style={{ height: "150px" }}
                ></textarea>
              </div>

              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <label>Quantity</label>
                  <input
                    className="addproduct-input"
                    type="number"
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="addproduct-form-group">
                  <label>Fabric Type</label>
                  <select className="addproduct-select">
                    <option>Select Fabric Type</option>
                    <option>Cotton</option>
                    <option>Silk</option>
                    <option>Wool</option>
                  </select>
                </div>
              </div>

              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <label>Pattern</label>
                  <select className="addproduct-select">
                    <option>Select Pattern</option>
                    <option>Plain</option>
                    <option>Striped</option>
                    <option>Checked</option>
                  </select>
                </div>
                <div className="addproduct-form-group">
                  <label>Fit</label>
                  <select className="addproduct-select">
                    <option>Select Fit</option>
                    <option>Slim</option>
                    <option>Regular</option>
                    <option>Loose</option>
                  </select>
                </div>
              </div>

              <div className="addproduct-form-group">
                <label>Category</label>
                <div className="addproduct-radio-group">
                  <label>
                    <input
                      type="radio"
                      value="Wardrobe"
                      checked={category === "Wardrobe"}
                      onChange={handleCategoryChange}
                    />
                    Wardrobe
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Occasion"
                      checked={category === "Occasion"}
                      onChange={handleCategoryChange}
                    />
                    Occasion
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Casual"
                      checked={category === "Casual"}
                      onChange={handleCategoryChange}
                    />
                    Casual
                  </label>
                </div>
              </div>

              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <label>Upload Cover Image</label>
                  <input className="addproduct-input" type="file" />
                </div>
                <div className="addproduct-form-group">
                  <label>Upload Second Image</label>
                  <input className="addproduct-input" type="file" />
                </div>
              </div>

              <button type="submit" className="addproduct-save-btn">
                Save
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
