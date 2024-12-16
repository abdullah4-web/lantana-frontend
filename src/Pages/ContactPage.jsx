import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  useEffect(() => {
    // Scroll to the top when the component is rendered
    window.scrollTo(0, 0);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xrgwlqpr', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        alert('Form submitted successfully!');
      } else {
        alert('Form submission failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const ogImage = 'https://example.com/your-image.jpg'; // Replace with your actual image URL
  const ogUrl = 'https://example.com/your-page';

  return (
    <>
    <Helmet>
    <title>Contact Us</title>
    <meta name="description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:title" content="Lantana Marketing Limited" />
    <meta property="og:description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
  </Helmet>
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: '600px' }}
        >
          <h1 className="mb-3">Contact Us</h1>
          <p>
          Contact us today to discuss your real estate goals and let us help you find or market your dream property.Whether you're looking to rent, buy, or sell property, our dedicated team is here to assist you every step of the way.
          </p>
        </div>
        <div className="row g-4">
          <div className="col-12">
            <div className="row gy-4">
              <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                <div className="bg-light rounded p-3">
                  <div
                    className="d-flex align-items-center bg-white rounded p-3"
                    style={{ border: '1px dashed rgba(0, 185, 142, .3)' }}
                  >
                    <div
                      className="icon me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-map-marker-alt text-primary"></i>
                    </div>
                    <span>Office 79, Doha centre, Tarnol, Islamabad</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.3s">
  <div className="bg-light rounded p-3">
    <a href="mailto:anayatorakzai@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="d-flex align-items-center bg-white rounded p-3"
        style={{ border: '1px dashed rgba(0, 185, 142, .3)' }}
      >
        <div
          className="icon me-3"
          style={{ width: '45px', height: '45px' }}
        >
          <i className="fa fa-envelope-open text-primary"></i>
        </div>
        <span>anayatorakzai@gmail.com</span>
      </div>
    </a>
  </div>
</div>

              <div className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.5s">
  <div className="bg-light rounded p-3">
    <a href="tel:+923339688178" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className="d-flex align-items-center bg-white rounded p-3"
        style={{ border: '1px dashed rgba(0, 185, 142, .3)' }}
      >
        <div
          className="icon me-3"
          style={{ width: '45px', height: '45px' }}
        >
          <i className="fa fa-phone-alt text-primary"></i>
        </div>
        <span>0333 9688178</span>
      </div>
    </a>
  </div>
</div>

            </div>
          </div>
          <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <iframe
              className="position-relative rounded w-100 h-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.745427045681!2d72.89691801013988!3d33.63784217320452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df97755a424281%3A0x73f2f2e1952bb957!2sDoha%20centre!5e0!3m2!1sen!2s!4v1694748916087!5m2!1sen!2s"
              frameBorder="0"
              style={{ minHeight: '400px', border: '0' }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="col-md-6">
            <div className="wow fadeInUp" data-wow-delay="0.5s">
              <p className="mb-4">
              Contact us today to discuss your real estate goals and let us help you find or market your dream property.
                
              </p>
              <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                          />
                          <label htmlFor="subject">Subject</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            name="message"
                            style={{ height: '150px' }}
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>           </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
