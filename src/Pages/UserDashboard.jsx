import React from 'react';
import apartment from '../img/icon-apartment.png';
import villa from '../img/icon-villa.png';
import house from '../img/icon-house.png';
import houseing from '../img/icon-housing.png';
import { Link } from 'react-router-dom';
import "./main.css";

const UserDashboard = () => {
  return (
    <div className="main">
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">User Dashboard</h1>
          <p>Edit Your Profile, See your all properties and Contact Manager for approval of the properties. More Features Coming Soon...</p>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <Link to="/userprofile" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={apartment} alt="Icon" />
                </div>
                <h6>Profile</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/addproperty" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Post Property Ad</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <Link to="/userproperties" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={villa} alt="Icon" />
                </div>
                <h6>Your uploaded Properties</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/contact" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Contact Manager</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/adduservehicle" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Post Vehicle Ad</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/uservehicles" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>All Vehicles</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/uservehicles" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Edit Vehicles</h6>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/uservehicles" className="cat-item d-block bg-light text-center rounded p-3">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Delete Vehicles</h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;