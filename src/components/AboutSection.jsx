import React from 'react';
import team from '../img/lantana.jpg';
import { Link } from 'react-router-dom';
import "./aboutSection.css";

function AboutSection() {
  return (
    <div className="main">
    <div className="bg-white rounded p-2" style={{ border: '1px dashed rgba(0, 185, 142, .3)' }}>
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="about-img position-relative overflow-hidden p-5 pe-0">
              <img className="img-fluid w-100" src={team} alt="About" />
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="mb-4">No. 1 Place To Find The Perfect Property</h1>
            <p className="mb-4">Looking to sell your property? Look no further than our trusted estate agency. With years of experience and a team of dedicated professionals, we offer a seamless and stress-free process to help you sell your property quickly and at the best possible price</p>
            <p><i className="fa fa-check text-primary me-3"></i>Sell Your Property</p>
            <p><i className="fa fa-check text-primary me-3"></i>Buy Your Favorite Property</p>
            <p><i className="fa fa-check text-primary me-3"></i>Rent Your Property on Best Price</p>
            <Link className="btn btn-primary py-3 px-5 mb-3" to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default AboutSection;
