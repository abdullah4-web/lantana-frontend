import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import UserPropertyCard from './UserPropertyCard';
import Spinner from '../components/Spinner';
import "./main.css";

const UserProperties = () => {
  const { state } = useUserContext();
  const [userProperties, setUserProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0]; // Use the first image URL as the property image
    }
    return '/placeholder.jpg';
  }

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/properties/userproperties/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        // Reverse the userProperties array to show the latest properties first
        setUserProperties(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (state.user.token) {
      fetchUserProperties();
    }
  }, [state.user.token]);

  return (
    <div className="main">
      <div className="container my-4">
        <h1>Your Uploaded Properties</h1>
        {loading ? (
          <Spinner /> // Show the Loading component while waiting for the API response
        ) : userProperties.length === 0 ? (
          <p>No properties uploaded.</p> // Display a message when there are no properties
        ) : (
          <div className="row">
            {userProperties.map((property, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4">
                <UserPropertyCard property={property} getImageUrl={getImageUrl} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProperties;
