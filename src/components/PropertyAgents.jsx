import React from 'react';
import team1 from '../img/new Omar.jpeg';
import team2 from '../img/anyatprofile.jpg';
import team3 from '../img/newamir.jpeg';
import pro from '../img/pro.png';
import './Propertyagent.css';

function PropertyAgents() {
  return (
    <div className="main">
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h1 className="mb-3">Property Agents</h1>
            <p>At our real estate agency, we take pride in having the absolute best agents in the industry. Our team is comprised of highly skilled professionals who are dedicated to providing exceptional service to our clients.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Agent 1 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item rounded overflow-hidden">
                <div className="position-relative image-container">
                  <img className="img-fluid" src={team1} alt="" />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Omar Orakzai</h5>
                  <small>Owner Of LANTANA</small>
                </div>
              </div>
            </div>

            {/* Agent 2 */}
           

            {/* Agent 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="team-item rounded overflow-hidden">
                <div className="position-relative image-container">
                  <img className="img-fluid" src={team2} alt="" />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Inayat Orakzai</h5>
                  <small>Fastest Agent</small>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item rounded overflow-hidden">
                <div className="position-relative image-container">
                  <img className="img-fluid" src={pro} alt="Abdullah Shah" />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square mx-1" href="https://www.facebook.com/muhmmad.abbas.5055/"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square mx-1" href="https://www.linkedin.com/in/abdullah-shahorakzai/"><i className="fa fa-linkedin"></i></a>
                    <a className="btn btn-square mx-1" href="https://abdullahshahportfolio.netlify.app/"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Abdullah Shah</h5>
                  <small>MERN Stack Web Developer</small>
                </div>
              </div>
            </div>

            {/* Agent 4 */}
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="team-item rounded overflow-hidden">
                <div className="position-relative image-container">
                  <img className="img-fluid" src={team3} alt="" />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square mx-1" href="/"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Amir Sohail</h5>
                  <small>Outstanding Agent</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyAgents;
