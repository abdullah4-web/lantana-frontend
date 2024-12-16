import React from 'react';
import { Link } from 'react-router-dom';
import './ContactSection.css'; // Import your CSS styles here
import omar from '../img/slider1.jpeg';

function ContactSection() {


  return (
    <div className="main">
      <div className="mt-1">
        <div className="mb-5">
          <div className="bg-white rounded p-2 contact-section">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 ">
                <div className="about-img position-relative overflow-hidden p-5 pe-0">
                  <img
                    className="img-fluid rounded w-100"
                    src={omar}
                    alt="Omar Orakzai - Certified Agent" // Provide a meaningful alt text
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="mb-4">Contact With Our Certified Agent</h2>
                <p>
                  Contact our certified agent today for a real estate
                  experience like no other. Our certified agent is a highly
                  trained and knowledgeable professional who has earned
                  industry-recognized certifications, ensuring they possess the
                  expertise needed to guide you through every step of your real
                  estate journey. Whether you're buying, selling, or investing,
                  our certified agent is here to provide you with expert
                  advice, unmatched market insights, and personalized service.
                  Get in touch with them now to take advantage of their
                  specialized skills and embark on a successful real estate
                  transaction.
                </p>
                <Link to="/contact" className="btn btn-primary py-3 px-4 me-2">
                  <i className="fa fa-phone-alt me-2"></i>Make A Call
                </Link>
                <Link to="/contact" className="btn btn-dark py-3 px-4">
                  <i className="fa fa-calendar-alt me-2"></i>Get Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
