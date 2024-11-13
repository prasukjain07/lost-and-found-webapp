// FoundUpload.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./found.css";
import image from "./bg.jpeg";
import Switch from 'react-switch';
import dark from './darkbg.jpg';

const FoundUpload = (props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [place, setPlace] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [details, setDetails] = useState('');
  const [isIdentifiable, setIsIdentifiable] = useState(false);
  const [userName, setUserName] = useState(''); // New state for user name
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number

  const handleSwitchChange = (checked) => {
    setIsIdentifiable(checked);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory('');
    setItemName('');
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
    if (e.target.value === 'other') {
      setItemName('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('date', date);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('itemName', itemName);
    formData.append('place', place);
    formData.append('ownerName', ownerName);
    formData.append('details', details);
    formData.append('isIdentifiable', isIdentifiable);
    formData.append('itemImage', itemImage);
    formData.append('userName', userName); // Append user name
    formData.append('phoneNumber', phoneNumber); // Append phone number

    try {
      await axios.post('http://localhost:5000/api/submitFoundItem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset form fields after successful submission
      setDescription('');
      setDate('');
      setCategory('');
      setSubcategory('');
      setItemName('');
      setItemImage(null);
      setPlace('');
      setOwnerName('');
      setDetails('');
      setIsIdentifiable(false);
      setUserName(''); // Reset user name
      setPhoneNumber(''); // Reset phone number
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (props.theme !== 'dark') {
      document.body.style.background = `url(${image}) `;
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.background = `url(${dark}) `;
      document.body.style.backgroundSize = 'cover';
    }

    return () => {
      document.body.style.background = null;
    };
  }, [props.theme]);

  return (
    <>
      <h1 style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : ''}` }}>Found Item details</h1>

      <form style={{ backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, marginBottom: '150px' }} onSubmit={handleFormSubmit}>
        
        <div className="col-5">
          <label style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : ''}` }} htmlFor="userName">User Name
            <input
              type="text"
              id="userName"
              value={userName}
              style={{ backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`, }}
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="col-5">
          <label style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : ''}` }} htmlFor="phoneNumber">Phone Number
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              style={{ backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`, }}
              placeholder="Enter your phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="col-5">
          <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="description">Description
            <input
              type="text"
              id="description"
              value={description}
              style={{backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}}
              placeholder="Enter description of the item"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="col-4">
          <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="date">Date
            <input
              type="date"
              id="date"
              value={date}
              style={{backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`,}}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="col-3">
          <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="place">Place you Found the Item
            <input
              type="text"
              id="place"
              placeholder='Enter the place you found the item'
              style={{ marginTop: "22px", paddingBottom: "15px",backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`, }}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="col-3">
          <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="category">Category
            <select className='pb-1 pt-2'
              id="category"
              value={category}
              style={{backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`,}}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select category</option>
              <option value="Cards">Cards</option>
              <option value="Electronic Devices">Electronic Devices</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>
            </select>
          </label>
        </div>

        {category && (
          <div className="col-3">
            <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="subcategory">Subcategory
              {category === 'Cards' && (
                <select
                  id="subcategory"
                  value={subcategory}
                  className='pb-1 pt-2'
                  style={{backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`,}}
                  onChange={handleSubcategoryChange}
                  required
                >
                  <option value="">Select subcategory</option>
                  <option value="College ID Card">College ID Card</option>
                  <option value="ATM Card">ATM Card</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Any other item">Any other card</option>
                </select>
              )}

              {/* Similarly for Electronic Devices, Books, and Others categories */}
            </label>
          </div>
        )}

        {subcategory === 'Any other item' && (
          <div className="col-3">
            <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="itemName">Name of Item
              <input
                type="text"
                id="itemName"
                style={{ marginTop: "22px", paddingBottom: "15px",backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`, }}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        <div className="col-3">
          <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="itemImage" type="file">Image
            <div>
              <input className='select pt-1'
                type="file"
                id="itemImage"
                style={{backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`,}}
                onChange={(e) => setItemImage(e.target.files[0])}
                required
              />
            </div>
          </label>
        </div>

        <div className="col-4">
          <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}}>Item is Identifiable?
            <center style={{ position: "relative", marginBottom: "8px", paddingTop: "10px" }}>
              <Switch
                onChange={handleSwitchChange}
                checked={isIdentifiable}
                className="react-switch"
                id="itemIdentifiableSwitch"
              />
            </center>
          </label>
        </div>

        {isIdentifiable && (
          <>
            <div className="col-3">
              <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="ownername">Owner Name
                <input
                  type="text"
                  id="ownerName"
                  value={ownerName}
                  placeholder="Enter owner name"
                  style={{ marginTop: "22px", paddingBottom: "15px", backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`,}}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="col-3">
              <label style={{color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`}} htmlFor="anydetails">Any other details
                <input
                  type="text"
                  id="anydetails"
                  placeholder='Enter any other details'
                  style={{ marginTop: "22px", paddingBottom: "15px", backgroundColor: `${props.theme === 'dark' ? 'rgb(74 72 72)' : ''}`, color: `${props.theme === 'dark' ? '#f5f5f5' : ''}`, }}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </label>
            </div>
          </>
        )}

        <div className="col-submit">
          <button type="submit" className="submitbtn">Submit</button>
        </div>
      </form>
    </>
  );
};

export default FoundUpload;
