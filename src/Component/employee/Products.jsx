import React, { useState } from "react";
import axios from "axios";
import "./Products.css";
import "./AddProduct.css";
import productimg from "../../assets/productimageforproductpage.png";
import detailsimg from "../../assets/detailsimage.png";
import pencil from "../../assets/editpencillatest.png";
import trash from "../../assets/trashbinlatest.png";

const ProductPage = () => {
  const [category, setCategory] = useState("Wardrobe");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sizes, setSizes] = useState([
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
  ]);

  // Define the products array inside the component
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
  };

  const handleSizeQuantityChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].quantity = parseInt(value, 10) || 0;
    setSizes(updatedSizes);
  };

  const handleSave = async (event) => {
    event.preventDefault();
  
    const formData = {
      name: event.target.elements.productName.value,
      price: parseFloat(event.target.elements.price.value),
      pattern: event.target.elements.pattern.value,
      fabric: event.target.elements.fabric.value,
      subcategory: event.target.elements.subcategory.value,
      colors: Array.from(event.target.elements.colors.selectedOptions).map(
        (option) => option.value
      ),
      sizes: sizes,
      description: event.target.elements.description.value,
      categories: category,
      fit: event.target.elements.fit.value,
      images: [], // Add image URLs after uploading
    };
  
    try {
      const response = await axios.post(
        "https://clouthing-ecommerce-backend.onrender.com/product/addProduct",
        formData
      );
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      setIsAddingProduct(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
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
                    <button className="edit-btn">
                      <img style={{ height: "21px" }} src={pencil} alt="pen" />
                    </button>
                    <button className="delete-btn">
                      <img style={{ height: "21px" }} src={trash} alt="tra" />
                    </button>
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
            style={{
              marginBottom: "20px",
              cursor: "pointer",
              border: "none",
              background: "transparent",
              fontSize: "20px",
              color: "#1C2A53",
            }}
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
                        className={
                          size.quantity > 0 ? "in-stock" : "out-of-stock"
                        }
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
                  <input
                    className="addproduct-input"
                    type="text"
                    name="productName"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="addproduct-form-group">
                  <input
                    className="addproduct-input"
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <select
                    className="addproduct-select"
                    name="colors"
                    multiple
                    required
                  >
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                  </select>
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
                className="addproduct-form-group"
              >
                <textarea
                  className="addproduct-textarea"
                  name="description"
                  placeholder="Enter product description"
                  style={{ height: "150px", width: "49%", marginTop: "20px" }}
                  required
                ></textarea>
                <div className="addproduct-form-group">
                  {/* Subcategory */}
                  <select
                    style={{ width: "97%", marginLeft: "20px" }}
                    className="addproduct-select"
                    name="subcategory"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    <option value="Kurti">Kurti</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Saree">Saree</option>
                    <option value="Dress">Dress</option>
                  </select>

                  {/* Pattern */}
                  <select
                    style={{
                      width: "97%",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    className="addproduct-select"
                    name="pattern"
                    required
                  >
                    <option value="">Select Pattern</option>
                    <option value="Lucknowi">Lucknowi</option>
                    <option value="Printed">Printed</option>
                    <option value="Plain">Plain</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Other">Other</option>
                  </select>

                  {/* Fabric */}
                  <select
                    style={{
                      width: "97%",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    className="addproduct-select"
                    name="fabric"
                    required
                  >
                    <option value="">Select Fabric</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Silk">Silk</option>
                    <option value="Wool">Wool</option>
                    <option value="Polyester">Polyester</option>
                    <option value="Linen">Linen</option>
                  </select>

                  {/* Categories */}
                  <div
                    style={{
                      paddingLeft: "16px",
                      paddingTop: "10px",
                      marginTop: "10px",
                    }}
                    className="addproduct-radio-group"
                  >
                    <label>
                      <input
                        type="radio"
                        value="Wardrobe"
                        checked={category === "Wardrobe"}
                        onChange={handleCategoryChange}
                        required
                      />
                      Wardrobe
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Casual Wear"
                        checked={category === "Casual Wear"}
                        onChange={handleCategoryChange}
                      />
                      Casual Wear
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Occasion Wear"
                        checked={category === "Occasion Wear"}
                        onChange={handleCategoryChange}
                      />
                      Occasion Wear
                    </label>
                  </div>
                </div>
              </div>

              <div className="addproduct-form-row">
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                  className="addproduct-form-group"
                >
                  {/* Size and Quantity Fields */}
                  {sizes.map((size, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px" }}>
                      <span>{size.size}</span>
                      <input
                        type="number"
                        value={size.quantity}
                        onChange={(e) =>
                          handleSizeQuantityChange(index, e.target.value)
                        }
                        placeholder="Quantity"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="addproduct-form-row">
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                  className="addproduct-form-group"
                >
                  <select
                    style={{ width: "49%" }}
                    className="addproduct-select"
                    name="fit"
                    required
                  >
                    <option value="">Select Fit</option>
                    <option value="Slim">Slim Fit</option>
                    <option value="Regular">Regular Fit</option>
                    <option value="Loose">Loose Fit</option>
                  </select>
                  <div className="addproduct-form-group">
                    <input
                      className="addproduct-input"
                      type="file"
                      name="images"
                      multiple
                      required
                    />
                  </div>
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