import React, { useState } from 'react';
import axios from 'axios';
import './AddLocation.css';

const AddLocation = () => {
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [subcategory, setSubcategory] = useState(''); // Changed to subcategory
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://markethub-app-backend.onrender.com/user/create-item', {
                city,
                category,
                type,
                subcategory, // Use subcategory here
                price,
            });
            // Handle successful response
            console.log('Location added:', response.data);
            // Optionally, reset the form fields
            setCity('');
            setCategory('');
            setType('');
            setSubcategory(''); // Reset subcategory
            setPrice('');
        } catch (error) {
            // Handle error
            console.error('Error adding location:', error);
        }
    };

    return (
        <div>
            <div className='addloaction-toptitle'>Spot Price</div>
            <div className='locationoutsideconatiner'> 
                <div className="add-location-container">
                    <div className="addlocation-form-container">
                        <div className='addlocation-formtitle'>Add New Location</div>
                        <form className='addlocation-form' onSubmit={handleSubmit}>
                            <div className="addlocation-form-row">
                                <input 
                                    className='searchbox' 
                                    type="text" 
                                    placeholder="Add City" 
                                    value={city} 
                                    onChange={(e) => setCity(e.target.value)} 
                                />
                                <input 
                                    className='searchbox' 
                                    type="text" 
                                    placeholder="Add Category" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                />
                            </div>
                            <div className="addlocation-form-row">
                                <input 
                                    className='searchbox' 
                                    type="text" 
                                    placeholder="Add Type" 
                                    value={type} 
                                    onChange={(e) => setType(e.target.value)} 
                                />
                                <input 
                                    className='searchbox' 
                                    type="text" 
                                    placeholder="Add Sub Category" 
                                    value={subcategory} // Use subcategory here
                                    onChange={(e) => setSubcategory(e.target.value)} 
                                />
                            </div>
                            <div>
                                <input 
                                    className='pricesearchbox' 
                                    type="text" 
                                    placeholder="Add Price" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>   
                            <button className="addlocation-continue-btn" type="submit">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLocation;
