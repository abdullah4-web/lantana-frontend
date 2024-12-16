import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PropertyDetails.css';
import Spinner from "../components/Spinner";
import { formatDistanceToNow } from 'date-fns';
import PropertyListing from '../components/PropertyListing';
import { Helmet } from 'react-helmet';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeElapsed = property ? formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true }) : '';

  const getUserPictureUrl = (user) => {
    if (user && user.picture) {
      return user.picture; // Use the provided picture URL
    } else {
      return '/default-user-picture.jpg'; // Use a default picture URL if no picture is available
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProperty(data);
        } else {
          console.error('Failed to fetch property details:', data.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!property) {
    return <div>Failed to fetch property details.</div>;
  }
  const ogImage = property.imageUrls.length > 0 ? property.imageUrls[0] : 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1701269136/swa8ktluihucqayhmhse.png';
  const ogUrl = 'https://example.com/your-page';
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.make,
          text: property.description,
          url: window.location.href,
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Handle the error or provide a fallback for browsers that don't support the Web Share API
    }
  };
  return (
    <>
     <Helmet>
    <title>{property.title}</title>
    <meta name="description" content={property.description}/>
    <meta property="og:title" content="Lantana Marketing Limited" />
    <meta property="og:description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
  </Helmet>
      <div className="yes">
        <div className="bg-light rounded p-2">
          <div className="bg-white rounded p-2" style={{ border: '1px dashed rgba(0, 185, 142, .3)' }}>
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <Carousel
                  showArrows={true}
                  showStatus={true}
                  showThumbs={false} // Disable thumbnail images
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={2000}
                  stopOnHover={true}
                  transitionTime={500}
                  dynamicHeight={false} // Disable dynamic height
                  className="carousel-container"
                >
                  {property.imageUrls.map((imageUrl, index) => (
                    <div key={index} className="carousel-item">
                      <img
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="carousel-image"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="col-lg-6">
                <div>
                  <h1>{property.title}</h1>
                  
                  <p>{property.description}</p>
                  <h3 className="mt-1">{property.price} PKR</h3>
                  <div className="property-details">
                    <i className="fa fa-tags me-3"></i>
                    <strong>Category:</strong> {property.category}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-tags me-3"></i>
                    <strong>Purpose / For :</strong> {property.for}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-sitemap me-3"></i>
                    <strong>Area:</strong> {property.area}
                  </div>

                  <div className="property-details">
                    <i className="fa fa-address-card me-3"></i>
                    <strong>Address:</strong> {property.address}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-map-marker me-3"></i>
                    <strong>Location:</strong> {property.location}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-user me-3"></i>
                    <strong>Posted By:</strong> {property.user.name}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-envelope me-3"></i>
                    <strong>Email:</strong> {property.user.email}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-phone me-3"></i>
                    <strong>Contact Number:</strong> {property.user.contactnumber}
                    <p>
          <i className="fa fa-calendar text-primary me-2" />
          Last Updated {timeElapsed} {/* Display the time elapsed */}
        </p>
                  </div>
                </div>
                <div className="share-button-container mt-3 d-flex justify-content-left align-items-center">
  <a href={`tel:${property.user.contactnumber}`} className="btn btn-secondary me-2">
    <i className="fa fa-phone-alt me-2"></i> Contact Owner
  </a>
  <button className="btn btn-secondary" onClick={handleShare}>
    <i className="fa fa-share-alt me-2"></i> Share
  </button>
</div>


              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="bg-white rounded p-2" style={{ border: '1px dashed rgba(0, 185, 142, .3)' }}>
          <div className="row g-5 align-items-center ">
            <div className="col-lg-6">
              <div className="about-img position-relative overflow-hidden p-5">
                <img
                  className="img-fluid  "
                  src={getUserPictureUrl(property.user)}
                  alt={`About ${property.user.name}`}
                />

              </div>
            </div>
            <div className="col-lg-6">
              <h1 className="mb-4">About The Dealer {property.user.name}</h1>
              <p className="mb-4">Looking to sell your property? Look no further than our trusted estate agency. With years of experience and a team of dedicated professionals, we offer a seamless and stress-free process to help you sell your property quickly and at the best possible price</p>
              <p><i className="fa fa-check text-primary me-3"></i>Sell Your Property</p>
              <p><i className="fa fa-check text-primary me-3"></i>Buy Your Favourite Property </p>
              <p><i className="fa fa-check text-primary me-3"></i>Rent Your Property on Best Price</p>
              <p><i className="fa fa-check text-primary me-3"></i>Email:{property.user.email}</p>
              <p><i className="fa fa-check text-primary me-3"></i> <strong>Contact Number:</strong> {property.user.contactnumber}</p>

              <a className="btn btn-primary py-3 px-5 mt-3" href={`tel:${property.user.contactnumber}`}>Contact Us</a>
            </div>
          </div>
        </div>
        </div>
        <PropertyListing />
    </>
  );
};

export default PropertyDetails;
