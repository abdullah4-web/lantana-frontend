import React from 'react';
import apartment from '../img/icon-apartment.png';
import villa  from '../img/icon-villa.png';
import house  from '../img/icon-house.png';
import neighboorhood  from '../img/icon-neighborhood.png';
import cond  from '../img/icon-condominium.png';
import luxury from '../img/icon-luxury.png';
import houseing  from '../img/icon-housing.png';
import building  from '../img/icon-building.png';
import { Link } from 'react-router-dom';
import "../Pages/main.css";


function PropertyTypes() {
  return (
    <div className="main">
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">Property  And Vehicles Types</h1>
          <p>Following types of Property You can Sell or Rent in Our Platform Lantana Marketing Private Limited</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/properties">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={apartment} alt="Icon" />
                </div>
                <h6>Apartment</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/properties">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={villa} alt="Icon" />
                </div>
                <h6>Villa</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/properties">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Home</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/properties">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={houseing} alt="Icon" />
                </div>
                <h6>Office</h6>
                <span></span>
              </div>
            </Link>
          </div>
          {/* Repeat similar code for other property types */}
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/vehicles">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={cond} alt="Icon" />
                </div>
                <h6>Cars</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/vehicles">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={luxury} alt="Icon" />
                </div>
                <h6>Van</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/vehicles">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={building} alt="Icon" />
                </div>
                <h6>Haice</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link className="cat-item d-block bg-light text-center rounded p-3" to="/vehicles">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={neighboorhood} alt="Icon" />
                </div>
                <h6>bicycle</h6>
                <span></span>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default PropertyTypes;
