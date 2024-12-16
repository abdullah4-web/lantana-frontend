import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PropertyDetails.css';
import Spinner from "../components/Spinner";
import { formatDistanceToNow } from 'date-fns';
import VehicleListing from '../components/VehicleListing';
import { Helmet } from 'react-helmet';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeElapsed = vehicle ? formatDistanceToNow(new Date(vehicle.updatedAt), { addSuffix: true }) : '';

  const getUserPictureUrl = (owner) => {
    if (owner && owner.picture) {
      return owner.picture; // Use the provided picture URL
    } else {
      return '/default-user-picture.jpg'; // Use a default picture URL if no picture is available
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`/api/vehicles/${id}`);
        const data = await response.json();

        if (response.ok) {
          setVehicle(data);
        } else {
          console.error('Failed to fetch Vehicle details:', data.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Vehicle details:', error);
        setIsLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!vehicle) {
    return <div>Failed to fetch Vehicle details.</div>;
  }
  const ogImage = vehicle.imageUrls.length > 0 ? vehicle.imageUrls[0] : 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1701269136/swa8ktluihucqayhmhse.png';
  const ogUrl = 'https://example.com/your-page';
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: vehicle.make,
          text: vehicle.description,
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
        <title>{vehicle.make}</title>
        <meta name="description" content={vehicle.description} />
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
                  {vehicle.imageUrls.map((imageUrl, index) => (
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
                  <h1>{vehicle.make}</h1>

                  <p>{vehicle.description}</p>
                  <h3 className="mt-1">{vehicle.price} PKR</h3>
                  <div className="property-details">
                    <i className="fa fa-car me-3"></i>
                    <strong>Model:</strong> {vehicle.model}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-car me-3"></i>
                    <strong>Year:</strong> {vehicle.year}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-car me-3"></i>
                    <strong>Type:</strong> {vehicle.type}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-tags me-3"></i>
                    <strong>Purpose / For:</strong> {vehicle.for}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-sitemap me-3"></i>
                    <strong>Engine Capacity:</strong> {vehicle.enginecapacity}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-address-card me-3"></i>
                    <strong>Fuel Type:</strong> {vehicle.fuelType}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-address-card me-3"></i>
                    <strong>Registered :</strong> {vehicle.registered}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-address-card me-3"></i>
                    <strong>Address:</strong> {vehicle.city}
                  </div>
                  <div className="property-details">
                    <i className="fa fa-tachometer me-3"></i>
                    <strong>Mileage:</strong> {vehicle.mileage}
                  </div>


                  <div className="property-details">

                    <p>
                      <i className="fa fa-calendar text-primary me-2" />
                      Last Updated {timeElapsed} {/* Display the time elapsed */}
                    </p>
                  </div>
                   
                </div>
                <div className="share-button-container mt-3 d-flex justify-content-left align-items-center">
  <a href={`tel:${vehicle.owner.contactnumber}`} className="btn btn-secondary me-2">
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
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img
                  className="img-fluid rounded w-95"
                  src={getUserPictureUrl(vehicle.owner)}
                  alt={`About ${vehicle.owner.name}`}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h1 className="mb-4">About The Dealer {vehicle.owner.name}</h1>
              <p className="mb-4">Looking to sell your  Vehicle ? Look no further than our trusted estate agency. With years of experience and a team of dedicated professionals, we offer a seamless and stress-free process to help you sell your property quickly and at the best possible price</p>
              <p><i className="fa fa-check text-primary me-3"></i> Sell Your Vehicle</p>
              <p><i className="fa fa-check text-primary me-3"></i> Buy Your Favourite Vehicle </p>
              <p><i className="fa fa-check text-primary me-3"></i> Rent Your Vehicle on Best Price</p>
              <p><i className="fa fa-check text-primary me-3"></i> Email: {vehicle.owner.email}</p>
              <p><i className="fa fa-check text-primary me-3"></i> <strong>Contact Number:</strong> {vehicle.owner.contactnumber}</p>
              <a className="btn btn-primary py-3 px-5 mt-3" href={`tel:${vehicle.owner.contactnumber}`}>Contact Us</a>
            </div>
          </div>
        </div>
      </div>
      <VehicleListing />
    </>
  );
};

export default VehicleDetails;
