import React, { useState } from 'react';
import './selfnews.css'; // Importing external CSS
import preview from '../../assets/previewimg.png';
import axios from 'axios'; // Import Axios for HTTP requests

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '',
    image: null,
    imagePreview: preview, // Default placeholder path
    shareWith: {
      freeTrialUsers: true,
      extendedTrialUsers: true,
      basicTrailUsers: false,
      standardTrailUsers: false,
      premiumTrailUsers: false,
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        shareWith: {
          ...formData.shareWith,
          [name]: checked,
        },
      });
     
      console.log("name ==>"+name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result, // Set uploaded image preview
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shareNews = Object.keys(formData.shareWith).filter(
      (key) => formData.shareWith[key]
    );

    const newsData = new FormData();
    newsData.append('addTitle', formData.title);
    console.log("==========>my log");
    // console.log(formData.title);
    // console.log("news data");
    // console.log(newsData);
    newsData.append('addContent', formData.content);
    newsData.append('addLink', formData.link);
    if (formData.image) {
      newsData.append('image', formData.image); // Append the file if it exists
    }
    newsData.append('shareNews', JSON.stringify(shareNews));

    for (const [key, value] of newsData.entries()) {
      console.log(`${key}:`, value);
    }

    // console.log("news data");
    // console.log(newsData.data);
    try {
      const response = await axios.post(
        'https://markethub-backend-ceka.onrender.com/admin/add-self-news',
      
        newsData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting the news:', error);
      alert('There was an error posting the news. Please try again.');
    }
  };

  return (
    <div className="selfnewsbiggestcontainer">
      <div className='selfnewstoptitle'>News</div>
      <div className="selfnews-container">
        <div className="selfnews-heading">Add Self News</div>
        <form className="selfnews-form" onSubmit={handleSubmit}>
          <div className="selfnewsinput-group">
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={formData.title}
              onChange={handleChange}
              className="selfnewsinput-field"
            />
            <input
              type="text"
              name="content"
              placeholder="Add Content"
              value={formData.content}
              onChange={handleChange}
              className="selfnewsinput-field"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="link"
              placeholder="Add Link (optional)"
              value={formData.link}
              onChange={handleChange}
              className="selfnewsoptionalfield"
            />
          </div>
          <div style={{ paddingTop: "25px" }}>
            <span style={{ fontWeight: "500" }}>Upload Image </span> 
            <span className="optional-text">(optional)</span>
          </div>

          <div className='fullpreviewflex'>      
            <div className='textbuttonflex'> 
              <div className="file-upload-info" style={{paddingLeft:"10px",paddingTop:"10px"}}>Please upload a JPG or PNG file less than 2MB</div>
              <div className="selfnewsfile-upload">
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png"
                  className="file-input" // Hide the default file input
                />
              </div>  
            </div>   
        
            <div className='selfnewspreviewflex'> 
              <div className="image-preview-container">
                <img src={formData.imagePreview} alt="Preview" className="image-preview" />
              </div>
            </div>
          </div>

          <div className="selfnewscheckbox-group">
            <label style={{fontWeight:"700"}}>Share With</label>
            <div className="selfnewscheckboxes">
              <label>
                <input
                  type="checkbox"
                  name="freeTrialUsers"
                  checked={formData.shareWith.freeTrial}
                  onChange={handleChange}
                /> Free Trial Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="extendedTrialUsers"
                  checked={formData.shareWith.extendedTrial}
                  onChange={handleChange}
                /> Extended Trial Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="basicTrailUsers"
                  checked={formData.shareWith.basic}
                  onChange={handleChange}
                /> Basic Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="standardTrailUsers"
                  checked={formData.shareWith.standard}
                  onChange={handleChange}
                /> Standard Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="premiumTrailUsers"
                  checked={formData.shareWith.premium}
                  onChange={handleChange}
                /> Premium Users
              </label>
            </div>
          </div>
          <button type="submit" className="selfnewssubmit-btn">Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
