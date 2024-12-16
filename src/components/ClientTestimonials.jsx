import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import test1 from '../img/testimonial-1.jpg';
import test2 from '../img/testimonial-2.jpg';
import test3 from '../img/testimonial-3.jpg';
import test4 from '../img/testimonial-4.jpg';


function ClientTestimonials() {
    const testimonialData = [
      {
        text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos",
        name: "Sami Esakhel",
        profession: "Bussisness Man",
        image: test1,
      },
      {
        text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos",
        name: "Client Name 2",
        profession: "Profession 2",
        image: test2,
      },
      {
        text: "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos",
        name: "Client Name 3",
        profession: "Profession 3",
        image: test3,
      },
    ];
  
    return (
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <h1 className="mb-3">Our Clients Say!</h1>
            <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
          </div>
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000} // Adjust as needed
            transitionTime={500}
            emulateTouch={true}
            stopOnHover={true}
            swipeable={true}
          >
            {testimonialData.map((testimonial, index) => (
              <div key={index} className="testimonial-item bg-light rounded p-3">
                <div className="bg-white border rounded p-4">
                  <p>{testimonial.text}</p>
                  <div className="d-flex align-items-center">
                    <img className="img-fluid flex-shrink-0 rounded" src={testimonial.image} style={{ width: '45px', height: '45px' }} alt="" />
                    <div className="ps-3">
                      <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                      <small>{testimonial.profession}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
  
  export default ClientTestimonials;
  


