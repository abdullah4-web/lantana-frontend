import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import PropertySearch from '../components/PropertySearch';
import PropertyTypes from '../components/PropertyTypes';
import AboutSection from '../components/AboutSection';
import PropertyListing from '../components/PropertyListing';
import ContactSection from '../components/ContactSection';
import ClientTestimonials from '../components/ClientTestimonials';
import VehicleListing from '../components/VehicleListing';
import LatestProperties from '../components/LatestProperties';
import LatestVehicles from '../components/LatestVehicles';



const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ogImage = 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1700895513/osuteaijthzldpbdhvxh.png'; // Replace with your actual image URL
  const ogUrl = 'https://lantanapk.com';

  return (
    <>
      <Helmet>
        <title>Lantana - Home</title>
        <meta name="description" content="Lantana Marketing Pvt Limited - Sell and rent your property or vehicles.Find Perfect place and Favoruit Vehicle" />
        <meta property="og:title" content="Lantana Marketing Pvt Limited" />
        <meta property="og:description" content="Lantana Marketing Pvt Limited - Sell and rent your property or vehicles.Find Perfect place and Favoruit Vehicle" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
      </Helmet> 

      <Header />
      <PropertySearch />
      <PropertyTypes />
      <AboutSection />
      <PropertyListing />
      <LatestProperties />
      <VehicleListing />
      <LatestVehicles />
      <ContactSection />
     {/* <PropertyAgents /> */}
      <ClientTestimonials />
    </>
  );
};


export default Home
