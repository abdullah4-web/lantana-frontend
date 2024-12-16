import React, { useEffect } from 'react'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import PropertyAgents from '../components/PropertyAgents'
import { Helmet } from 'react-helmet'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ogImage = 'https://example.com/your-image.jpg'; // Replace with your actual image URL
  const ogUrl = 'https://example.com/your-page';
  return (
   <>
    <Helmet>
    <title>About Us</title>
    <meta name="description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:title" content="Lantana Marketing Limited" />
    <meta property="og:description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
  </Helmet>
   <AboutSection/>
   <ContactSection />
   <PropertyAgents />
   </>
  )
}

export default About
