import React from 'react'
import apartment from '../img/icon-apartment.png';
import villa  from '../img/icon-villa.png';
import house  from '../img/icon-house.png';
import houseing  from '../img/icon-housing.png';
import { Link } from 'react-router-dom';
import "./main.css";
const AdminDashboard = () => {
  return (
   <>
   <div className="main">
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <h1 className="mb-3">Admin Dashboard</h1>
          <p>Add ,Delete and Update Properties and Vehicles . See all users and therir properties and Vehicles .Further more Features are Comming Soon More ... </p>
        </div>
        <div className="row g-4">
          
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
          <Link to="/addadminproperty" className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={apartment} alt="Icon" />
                </div>
                <h6>Add New Property</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <Link to="/allproperties" className="cat-item d-block bg-light text-center rounded p-3" href="">
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={villa} alt="Icon" />
                </div>
                <h6>All Properties</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/allproperties" className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={house} alt="Icon" />
                </div>
                <h6>Edit Properties</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link to="/allusers"className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={houseing} alt="Icon" />
                </div>
                <h6>All Users</h6>
                <span></span>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link to="/addadminvehicle"className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={houseing} alt="Icon" />
                </div>
                <h6>Add Vehicle</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link to="/adminallvehicles"className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={houseing} alt="Icon" />
                </div>
                <h6>All Vehicles</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link to="/adminallvehicles"className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={houseing} alt="Icon" />
                </div>
                <h6>Edit Vehicles</h6>
                <span></span>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link to="/adminallvehicles"className="cat-item d-block bg-light text-center rounded p-3" >
              <div className="rounded p-4">
                <div className="icon mb-3">
                  <img className="img-fluid" src={houseing} alt="Icon" />
                </div>
                <h6>Delete Vehicles</h6>
                <span></span>
              </div>
            </Link>
          </div>
          </div>
      </div>
    </div>
    </div>
   </>
  )
}

export default AdminDashboard
