import React, { useEffect, useState } from 'react';
import PropertyCard from '../Pages/PropertyCard';
import "./PropertyListing.css";
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch properties from the API
    fetch(`/api/properties/featured`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Sort properties by updatedAt in descending order (latest first)
      const sortedProperties = data.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });

      // Slice the array to only keep the first three properties
      const topThreeProperties = sortedProperties.slice(0, 3);

      setProperties(topThreeProperties);
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

  return (
    <div className="main mt-4">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="mb-1">Properties Managed By Lantana Marketing Ltd</h1>
          <p>Explore our properties</p>
        </div>
        <div className="row">
          {properties.map((property) => (
            <div key={property._id} className="col-md-4 col-sm-6 mb-4">
              <PropertyCard property={property} getImageUrl={getImageUrl} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        <Link className="btn btn-primary py-3 px-5" to="/properties">Browse More Property</Link>
      </div>
    </div>
  );
};

export default PropertyListing;
