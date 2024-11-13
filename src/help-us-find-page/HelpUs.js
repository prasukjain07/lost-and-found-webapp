import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./helpUs.css";
import no_image from "./no-image.png";
import loading from "./loading.gif";
import dark from "./dark.jpg";

const HelpUs = (props) => {
  const [fetched, setFetched] = useState(false);
  const [lostItems, setItems] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [showDetails, setShowDetails] = useState(null); // Track the id of the item with details shown

  const host = "http://localhost:5000";
  const url = `${host}/getLostItems`;

  // Fetch lost items from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();
        setItems(json);
        setFetched(true);
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setSpinner(false);
      }
    }
    fetchData();
  }, [url]);

  // Adjust theme-based background
  useEffect(() => {
    if (props.theme === 'dark') {
      document.body.style.backgroundImage = `url(${dark})`;
      document.body.style.backgroundSize = 'contain';
    } else {
      document.body.style.backgroundImage = 'linear-gradient(to right top, rgb(101 173 191), rgb(237 242 243))';
    }
    return () => {
      document.body.style.backgroundImage = null;
    };
  }, [props.theme]);

  // Toggle details visibility for a specific item by ID
  const toggleDetails = (id) => {
    setShowDetails((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div>
        <Typography variant="h4" className={`gradient-text ${props.theme === 'dark' ? 'dark-mode' : ''}`} style={{ textTransform: "none" }} align="center">
          <span style={{ fontWeight: '600' }}>Help Us</span> Find
        </Typography>

        {spinner ? (
          <div className='text-center my-5 pt-5'>
            <img src={loading} alt="loading" width="40px" />
          </div>
        ) : fetched ? (
          <div className="cards-container">
            {lostItems.map((item) => (
              <Card
                key={item.id}
                className="card"
                style={{
                  backgroundColor: props.theme === 'dark' ? 'rgb(74 72 72)' : 'whitesmoke',
                  color: props.theme === 'dark' ? '#f5f5f5' : '#333',
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={item.itemImage ? `${host}/lostItemImages/${item.itemImage}` : no_image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.subcategory}</Typography>
                  <Typography variant="body2" style={{ color: props.theme === 'dark' ? '#f5f5f5' : '#333' }}>
                    {item.description}
                  </Typography>
                  
                  {/* Button to toggle the details */}
                  <Button
                    size="small"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      marginTop: "10px",
                      borderRadius: "20px",
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={() => toggleDetails(item.id)} // Pass item.id to toggle only this item's details
                  >
                    {showDetails === item.id ? 'Hide Details' : 'Get Details'}
                  </Button>
          
                  {/* Conditionally render user details */}
                  {showDetails === item.id && (
                    <div style={{ marginTop: '10px' }}>
                      <Typography variant="body2" style={{ color: props.theme === 'dark' ? '#f5f5f5' : '#333' }}>
                        <strong>User Name:</strong> {item.name}
                      </Typography>
                      <Typography variant="body2" style={{ color: props.theme === 'dark' ? '#f5f5f5' : '#333' }}>
                        <strong>Phone Number:</strong> {item.phone}
                      </Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center my-5 pt-5">
            <h4>No items to display ...</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default HelpUs;
