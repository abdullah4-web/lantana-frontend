import React, { useEffect } from 'react';
import PropertyCard from '../Pages/PropertyCard';
import './PropertyListing.css';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { useFilterContext } from '../FilterContext';

const LatestProperties = () => {
  const { properties, loading, error } = useFilterContext();

  useEffect(() => {
    // You can add additional logic here if needed
  }, [properties, loading, error]);

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

  // Sort properties based on the update time in descending order
  const sortedProperties = properties.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // Take only the latest three properties
  const latestThreeProperties = sortedProperties.slice(0, 3);

  return (
    <div className="main mt-4">
      <div className="container py-4">
        <div className="text-center mb-4">
          <h1 className="mb-1">Our Latest Properties</h1>
          <p>Explore our properties</p>
        </div>
        <div className="row">
          {latestThreeProperties.map((property) => (
            <div key={property._id} className="col-md-4 col-sm-6 mb-4">
              <PropertyCard property={property} getImageUrl={getImageUrl} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        <Link className="btn btn-primary py-3 px-5" to="/properties">
          Browse More Property
        </Link>
      </div>
    </div>
  );
};

export default LatestProperties;
