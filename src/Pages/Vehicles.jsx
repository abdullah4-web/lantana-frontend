import React, { useEffect, useState } from 'react';
import './Properties.css';
import Spinner from '../components/Spinner';
import PropertySearch from '../components/PropertySearch';
import VehicleCard from './VehicleCard';
import VehicleSearch from '../components/VehicleSearch';
import { Helmet } from 'react-helmet';

const Vehicles = () => {
  const [vehicleData, setVehicleData] = useState([]); // Changed the variable name to avoid conflict
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch properties from the API
    fetch(`/api/vehicles/getallapprovedvehicles`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const sortedVehicles = data.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });

        setVehicleData(sortedVehicles); // Updated the state variable name here
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0]; // Use the first image URL as the property image
    }
    return '/placeholder.jpg';
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const ogImage = 'https://example.com/your-image.jpg'; // Replace with your actual image URL
  const ogUrl = 'https://example.com/your-page';
  return (
    <>
    <Helmet>
    <title>Vehicles</title>
    <meta name="description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:title" content="Lantana Marketing Limited" />
    <meta property="og:description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
  </Helmet>
    <VehicleSearch />
    <div className="main">
      <div className="container py-4">
        
        <div className="text-center mb-4">
          <h1 className="mb-1">Available Vehicles</h1>
          <p>Buy and Sell your Favorite Vehicles For Yourself with Lantana Marketing Limited</p>
        </div>
        <div className="row">
          {vehicleData.map((vehicle) => (
            <div key={vehicle._id} className="col-md-4 col-sm-6 mb-4">
              <VehicleCard vehicle={vehicle} getImageUrl={getImageUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Vehicles; // Updated the component name to start with an uppercase letter
