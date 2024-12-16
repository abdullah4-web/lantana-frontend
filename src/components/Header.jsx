import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import carousel1 from '../img/slider1.jpeg';
import carousel2 from '../img/slider2.jpeg';
import New from '../img/lantana.jpg';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="main">
    <div className="container-fluid header bg-white p-70">
      <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
        <div className="col-md-6 p-5 mt-lg-5">
          <h2 className="display-8  mb-4"><span className="text-primary">Lantana Marketing Pvt Ltd</span><br></br>Best Place to Sell or Rent Your Property and Vehicle</h2>
          <p>"Looking to sell your property ? Look no further than our trusted estate agency. With years of experience and a team of dedicated professionals, we offer a seamless and stress-free process to help you sell your property quickly and at the best possible price</p>
          <Link to="/postad" className="btn btn-primary py-3 px-5 me-3 animated fadeIn">Post Ad</Link>
        </div>
        <div className="col-md-6 animated fadeIn">
          <Carousel showThumbs={false} autoPlay interval={2000} stopOnHover infiniteLoop>
            <div className="owl-carousel-item">
              <img className="img-fluid" src={New} alt="" />
            </div>
            <div className="owl-carousel-item">
              <img className="img-fluid" src={carousel1} alt="" />
            </div>
            <div className="owl-carousel-item">
              <img className="img-fluid" src={carousel2} alt="" />
            </div>
          </Carousel>

        </div>
      </div>
    </div>
    </div>
  );
}

export default Header;
