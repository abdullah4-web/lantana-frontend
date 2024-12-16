import React, { useEffect, useState } from 'react';
import VehicleCard from '../Pages/VehicleCard';
import "./PropertyListing.css";
import { Link } from 'react-router-dom';

const VehicleListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch vehicles from the API
    fetch(`/api/vehicles/featured`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Sort vehicles by updatedAt in descending order (latest first)
        const sortedVehicles = data.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });

        // Slice the array to only keep the first three vehicles
        const topThreeVehicles = sortedVehicles.slice(0, 3);

        setVehicles(topThreeVehicles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0]; // Use the first image URL as the vehicle image
    }
    return '/placeholder.jpg';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main mt-4">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="mb-1">Vehicles Managed By Lantana Pvt Ltd</h1>
          <p>Explore our Vehicles</p>
        </div>
        <div className="row">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="col-md-4 col-sm-6 mb-4">
              <VehicleCard vehicle={vehicle} getImageUrl={getImageUrl} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        <Link className="btn btn-primary py-3 px-5" to="/vehicles">Browse More Vehicles</Link>
      </div>
    </div>
  );
};

export default VehicleListing;
