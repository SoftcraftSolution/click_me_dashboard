import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Rating, TextField, Container, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ReviewUI.css'; // Import the CSS file

// Import icons
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';

const ReviewUI = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const [placeId, setPlaceId] = useState('');
  
  useEffect(() => {
    setPlaceId(Cookies.get('placeId') || '');
    checkR();
  }, []);
  const checkR=async()=>{
    try {
      const businessId=Cookies.get("businessId");
      const userId=Cookies.get("user_id");
      const reviewResponse = await axios.get(`https://ambulance-booking-backend.vercel.app/user/check-review?businessId=${businessId}&userId=${userId}`);
      const hasReviewed = reviewResponse.data.reviewed;
  
      if (hasReviewed) {
        navigate('/home');
      } else {
        navigate('/review');
      }
    } catch (reviewError) {
      console.error('Error checking review status:', reviewError);
      navigate('/home');
    }
  }
   

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    if (newValue > 0) {
      setShowErrorMessage(false);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages([...images, ...selectedImages]);

    const selectedPreviews = selectedImages.map((image) => URL.createObjectURL(image));
    setImagePreviews([...imagePreviews, ...selectedPreviews]);
  };

  const handleCancelImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const callAssignCouponAPI = async (userId, businessId) => {
    try {
      const response = await axios.get(`http://ambulance-booking-backend.vercel.app/user/assign-coupan?userId=${userId}&businessId=${businessId}`);
      const response1 = await axios.post(`https://ambulance-booking-backend.vercel.app/user/add-in-reviewlist?businessId=${businessId}&userId=${userId}`);
      console.log("API call successful:", response.data.coupon);
      navigate("/coupon", { state: { couponData: response.data.coupon } });
      return response.data.coupon; // Return the API response if needed
    } catch (error) {
      console.error("Error calling assign coupon API:", error);
      throw error; // Re-throw the error to handle it outside if necessary
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setShowErrorMessage(true);
      return;
    }

    if (rating > 3) {
      if (placeId) {
        try {
          // window.location.href = `https://search.google.com/local/writereview?placeid=${placeId}`;
          const userId=Cookies.get("user_id");
          const businessId=Cookies.get("businessId");
          
          navigate('/home');
          await callAssignCouponAPI(userId,businessId);
          window.location.href = `https://search.google.com/local/writereview?placeid=${placeId}`;
           
         
        } catch (error) {
          console.error("Error redirecting:", error);
        }
        return;
      } else {
        console.error("placeId is null or undefined");
      }
    }
   
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('qrCodeId', Cookies.get('businessId'));
    formData.append('userId', Cookies.get('user_id'));

    try {
      const response = await axios.post('https://ambulance-booking-backend.vercel.app/user/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message !== 'Review created successfully') {
        throw new Error('Failed to post review');
      }

      setRating(0);
      setComment('');
      setImages([]);
      setImagePreviews([]);
      setShowSuccessMessage(true);

      navigate('/review-submitted');
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  const name = Cookies.get('name');

  return (
    <Container id="styled-container11">
      <div className='top-header'>
        <Avatar id="profile-avatar1">
          {Cookies.get('name') ? Cookies.get('name')[0].toUpperCase() : 'U'}
        </Avatar>
        <div>
          <div className='top-header-1'>
            {Cookies.get('name')}
            
          </div>
          <div style={{color:"grey"}}>Posting publicly across Google</div>
          </div>
      </div>
      
        
      <div id="star12">
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
          iconSize={38}
          sx={{
            '& .MuiRating-iconFilled': { fontSize: '38px' },
            '& .MuiRating-iconHover': { fontSize: '38px' },
            '& .MuiRating-iconEmpty': { fontSize: '38px' },
            '& .MuiRating-icon': {
              fontSize: '38px',
              margin: '0 7px',
            },
          }}
        />
        {showErrorMessage && (
          <Typography className="typography-error">Please provide a star rating.</Typography>
        )}
      </div>
      <TextField
        id="comment"
        placeholder="Share details of your own experience at this place."
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={comment}
        onChange={handleCommentChange}
        sx={{ my: 2 }}
      />

      <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" type="file" onChange={handleImageChange} />
      <label htmlFor="contained-button-file">
        <div id="pare12"><Button id="add-photos-button12" variant="outlined" component="span" startIcon={<AddAPhotoIcon />}>
          Add Photos
        </Button></div>
      </label>

      <Box className="image-preview-container">
        {imagePreviews.map((preview, index) => (
          <Box key={index} className="image-preview">
            <img src={preview} alt="Preview" />
            <IconButton className="cancel-button" onClick={() => handleCancelImage(index)}>
              <ClearIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <div id="paPost12">


      <div id="post-review-button12" variant="contained" color="primary" onClick={handleSubmit}>
        Post
      </div>
      </div>
      {rating < 3 && showSuccessMessage && (
        <Typography className="typography-success">Your review has been successfully submitted!</Typography>
      )}
    </Container>
  );
};

export default ReviewUI;