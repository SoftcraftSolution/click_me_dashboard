// AddItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './addItem.css';

const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [isVeg, setIsVeg] = useState(true);
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [nutritionalInfo, setNutritionalInfo] = useState(['']);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // New state for image preview
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => setIngredients([...ingredients, '']);
    const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

    const handleNutritionalInfoChange = (index, value) => {
        const newNutritionalInfo = [...nutritionalInfo];
        newNutritionalInfo[index] = value;
        setNutritionalInfo(newNutritionalInfo);
    };

    const addNutritionalInfo = () => setNutritionalInfo([...nutritionalInfo, '']);
    const removeNutritionalInfo = (index) => setNutritionalInfo(nutritionalInfo.filter((_, i) => i !== index));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Set image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('isVeg', String(isVeg));
        formData.append('description', description);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('nutritionalInfo', JSON.stringify(nutritionalInfo));
        formData.append('image', image);

        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-item', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Item added:', response.data);
            
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);
            
            // Reset the form
            setItemName('');
            setCategory('');
            setPrice('');
            setIsVeg(true);
            setDescription('');
            setIngredients(['']);
            setNutritionalInfo(['']);
            setImage(null);
            setImagePreview(null); // Clear image preview
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className="addItem-container">
            <div className="addItem-title">Add Item</div>
            <form className="addItem-form" onSubmit={handleSubmit}>
                <div className="addItem-column">
                    <input 
                        className="addItem-input" 
                        type="text" 
                        placeholder="Item Name" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                    />

                    <div className="addItem-radioGroup">
                        <label><input type="radio" value="Entrée" checked={category === 'Entrée'} onChange={(e) => setCategory(e.target.value)} /> Entrée</label>
                        <label><input type="radio" value="Plat" checked={category === 'Plat'} onChange={(e) => setCategory(e.target.value)} /> Plat</label>
                        <label><input type="radio" value="Dessert" checked={category === 'Dessert'} onChange={(e) => setCategory(e.target.value)} /> Dessert</label>
                    </div>

                    <input 
                        className="addItem-input" 
                        type="number" 
                        placeholder="Price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />

                    <textarea 
                        className="addItem-input addItem-textarea" 
                        placeholder="Item Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div className="addItem-column">
                    <div className="addItem-vegOptions">
                        <label><input type="radio" value="true" checked={isVeg === true} onChange={() => setIsVeg(true)} /> Veg</label>
                        <label><input type="radio" value="false" checked={isVeg === false} onChange={() => setIsVeg(false)} /> Non Veg</label>
                    </div>

                    <div className="addItem-section">
                        {/* <label>Ingredients</label><br></br> */}
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="addItem-dynamicInput">
                                <input 
                                    type="text" 
                                    placeholder={`${index + 1}. Ingredient`} 
                                    value={ingredient} 
                                    onChange={(e) => handleIngredientChange(index, e.target.value)} 
                                />
                                {ingredients.length > 1 && <button type="button" onClick={() => removeIngredient(index)}>-</button>}
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient}>+</button>
                    </div>

                    <div className="addItem-section">
                        {/* <label>Nutritional Information</label><br></br> */}
                        {nutritionalInfo.map((info, index) => (
                            <div key={index} className="addItem-dynamicInput">
                                <input 
                                    type="text" 
                                    placeholder={`${index + 1}. Nutritional Info`} 
                                    value={info} 
                                    onChange={(e) => handleNutritionalInfoChange(index, e.target.value)} 
                                />
                                {nutritionalInfo.length > 1 && <button type="button" onClick={() => removeNutritionalInfo(index)}>-</button>}
                            </div>
                        ))}
                        <button type="button" onClick={addNutritionalInfo}>+</button>
                    </div>

                    <div className="addItem-fileUpload">
                        <label>Upload Image (optional)</label><br></br>
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && (
                            <div className="addItem-imagePreview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <button className="addItem-submitBtn" type="submit">Add Item</button>
            </form>
            
            {showSuccessPopup && <div className="addItem-successPopup">Item added successfully!</div>}
        </div>
    );
};

export default AddItem;
