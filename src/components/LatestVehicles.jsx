import React, { useEffect } from 'react';
import VehicleCard from '../Pages/VehicleCard';
import './PropertyListing.css';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { useFilterContext } from '../FilterContext';

const LatestVehicles = () => {
  const { vehicles, loading, error } = useFilterContext();

  useEffect(() => {
    // Additional logic or side effects can be added here if needed
  }, [vehicles, loading, error]);

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

  // Sort vehicles based on the update time in descending order
  const sortedVehicles = vehicles.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Take only the latest three vehicles
  const latestThreeVehicles = sortedVehicles.slice(0, 3);

  return (
    <div className="main mt-4">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="mb-1">Our Latest Vehicles</h1>
          <p>Explore our Vehicles</p>
        </div>
        <div className="row">
          {latestThreeVehicles.map((vehicle) => (
            <div key={vehicle._id} className="col-md-4 col-sm-6 mb-4">
              <VehicleCard vehicle={vehicle} getImageUrl={getImageUrl}/>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        <Link className="btn btn-primary py-3 px-5" to="/vehicles">
          Browse More Vehicles
        </Link>
      </div>
    </div>
  );
};

export default LatestVehicles;
