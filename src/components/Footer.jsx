import React from 'react';
import property1 from '../img/property-1.jpg';
import property2 from '../img/property-2.jpg';
import property3 from '../img/property-3.jpg';
import property4 from '../img/property-4.jpg';
import property5 from '../img/property-5.jpg';
import property6 from '../img/property-6.jpg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Get In Touch</h5>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>
              Office 79, Doha centre, Tarnol, Islamabad</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>0333 9688178</p>
            <p className="mb-2"><i className="fa fa-envelope me-3"></i>anayatorakzai@gmail.com</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-social" href="https://www.facebook.com/profile.php?id=61550745621764&mibextid=ZbWKwL"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
              <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Quick Links</h5>
            <Link className="btn btn-link text-white-50" to="/about">About Us</Link>
            <Link className="btn btn-link text-white-50" to="/contact">Contact Us</Link>
            <a className="btn btn-link text-white-50" href="">Our Services</a>
            <a className="btn btn-link text-white-50" href="">Privacy Policy</a>
            <a className="btn btn-link text-white-50" href="">Terms & Conditions</a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Photo Gallery</h5>
            <div className="row g-2 pt-2">
              {[
                property1,
                property2,
                property3,
                property4,
                property5,
                property6,
              ].map((property, index) => (
                <div className="col-4" key={index}>
                  <img className="img-fluid rounded bg-light p-1" src={property} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-4">Get Our Mobile App</h5>
            <a href="https://play.google.com/store">
              <img
                className="img-fluid"
                src="https://tse3.mm.bing.net/th?id=OIP.eEjr1GAlYKmQzuQPCYJkngHaDt&pid=Api&P=0&h=220"
                alt="Google Play"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="border-bottom" href="#">Lantana</a>, All Rights Reserved.
              Developed By <a className="border-bottom" href="https://abdullahshahportfolio.netlify.app/">Abdullah Shah</a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="#">Home</a>
                <a href="#">Cookies</a>
                <a href="#">Help</a>
                <a href="#">FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
