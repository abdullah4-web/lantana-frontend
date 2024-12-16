import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns'; // Import formatDistanceToNow
import './PropertyCard.css';

const PropertyCard = ({ property, getImageUrl }) => {
  // Calculate the time elapsed since updatedAt
  const timeElapsed = formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true });

  return (
    <div className="property-item rounded overflow-hidden">
      <div className="position-relative overflow-hidden image-container">
        <Link to={`/properties/${property._id}`}>
          <div
            className="image-wrapper"
            style={{
              backgroundImage: `url(${getImageUrl(property.imageUrls)})`,
            }}
          ></div>
        </Link>
        <div
          className={`bg-${property.for === 'sale' ? 'primary' : 'success'} rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3`}
        >
          {property.for}
        </div>
        <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
          {property.category}
        </div>
      </div>
      <div className="p-4 pb-0">
        <h5 className="text-primary mb-3">{property.price} PKR</h5>
        <a className="d-block h5 mb-2" href="#">
          {property.title}
        </a>
        <p>
          <i className="fa fa-map-marker-alt text-primary me-2" />
          {property.address}
        </p>
        <p>
          <i className="fa fa-calendar text-primary me-2" />
          Last Updated {timeElapsed} {/* Display the time elapsed */}
        </p>
      </div>
      <div className="d-flex border-top">
        <small className="flex-fill text-center border-end py-2">
          <i className="fa fa-ruler-combined text-primary me-2" />
          {property.area}
        </small>
        <small className="flex-fill text-center border-end py-2">
          <i className="fa fa-mobile text-primary me-2" />
          {property.user.contactnumber}
        </small>
        <small className="flex-fill text-center py-2">
          <i className="fa fa-map-marker text-primary me-2" />
          {property.location}
        </small>
      </div>
    </div>
  );
};

export default PropertyCard;
