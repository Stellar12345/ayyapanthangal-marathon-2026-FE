import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallNavbar from "../components/SmallNavbar";

function EventDetails() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <SmallNavbar />

      {/* Event Description Start */}
      <div className="container-fluid py-5 bg-light" style={{ marginTop: "100px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Event Description
            </h5>
            <h1 className="mb-5">Key Details</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-calendar-alt text-primary mb-4" />
                  <h5>Date</h5>
                  <p>Sunday, 15 February 2026</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-clock text-primary mb-4" />
                  <h5>Assembly Time</h5>
                  <p>6:00 AM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-map-marker-alt text-primary mb-4" />
                  <h5>Starting Point</h5>
                  <p>Porur Lake Area</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-flag-checkered text-primary mb-4" />
                  <h5>Finish</h5>
                  <p>Ayyapanthangal Govt HR Sec School</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-users text-primary mb-4" />
                  <h5>Bulk Registration</h5>
                  <p>
                    For bulk registration contact{" "}
                    <a href="tel:+919444662322" style={{ textDecoration: "none" }}>
                      Ramesh Nivash +919444662322
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Event Description End */}

      {/* Event Objectives Start */}
      <div className="container-fluid py-4 bg-light" style={{ paddingTop: "20px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-3">Our Mission</h1>
            <h5 className="section-title ff-secondary text-center text-primary fw-normal mb-5">
              Event Objectives
            </h5>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-heartbeat text-primary mb-4" />
                  <h5>Promote Well-being</h5>
                  <p>Promote physical and mental well-being</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-dumbbell text-primary mb-4" />
                  <h5>Daily Discipline</h5>
                  <p>Encourage daily discipline through fitness</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-users text-primary mb-4" />
                  <h5>Health Awareness</h5>
                  <p>Create health awareness among youngsters and families</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-handshake text-primary mb-4" />
                  <h5>Community Connect</h5>
                  <p>Build a strong community connect through sports</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.9s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-bullhorn text-primary mb-4" />
                  <h5>Brand Visibility</h5>
                  <p>Provide sponsors meaningful brand visibility and goodwill</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Event Objectives End */}

      {/* Event Director Start */}
      <div className="container-fluid py-5 bg-light">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Event Director
            </h5>
            <h1 className="mb-5">Profile</h1>
          </div>
          <div className="row g-5 justify-content-center">
            <div className="col-lg-11 col-xl-10 wow fadeInUp" data-wow-delay="0.3s">
              <div className="director-profile-card">
                {/* First Row: Image + First Paragraph */}
                <div className="row g-4 g-lg-5 align-items-start mb-4">
                  <div className="col-12 col-md-5 col-lg-5 text-center">
                    <div className="director-image-wrapper">
                      <img 
                        className="director-image" 
                        src="/img/Director.jpeg" 
                        alt="Rameshnivash A. - Event Director" 
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-7 col-lg-7">
                    <div className="director-content">
                      <h3 className="director-name mb-4">Rameshnivash A.</h3>
                      <div className="director-bio">
                        <p className="mb-0">
                          Rameshnivash A. is a seasoned corporate leader, public service professional, and passionate fitness advocate with over two decades of experience across banking, finance, digital transformation, fraud prevention, training, and leadership development. Currently serving as Deputy Vice President at HDFC Bank, he has held senior leadership roles with globally reputed organizations including Citibank, Motilal Oswal, and Infosys.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Second Row: Full Width Paragraphs */}
                <div className="row">
                  <div className="col-12">
                    <div className="director-bio">
                      <p className="mb-4">
                        An alumnus with strong academic credentials in Engineering, Finance, Public Administration, and Applied Psychology, he brings a rare blend of operational excellence, policy understanding, and human-centric leadership. He actively contributes to government-led youth and skill-development initiatives as an Executive Member of Naan Mudhalvan and StartUp TN.
                      </p>
                      <p className="mb-4">
                        With a disciplined foundation shaped during his tenure as an NCC Officer, and having been selected for the Indian Army, he strongly believes in values of integrity, resilience, and national service. A committed fitness enthusiast, he has successfully completed 27+ half marathon, viewing endurance sports not merely as competition but as a lifelong discipline and a tool for social transformation.
                      </p>
                      <p className="mb-0">
                        As the Event Director of the Ayyapanthangal Marathon, his vision extends beyond the finish line—aiming to instill healthy habits, mental resilience, and disciplined living among children and youth. Through such community-driven initiatives, he strives to create a healthier, more responsible, and future-ready society.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Event Director End */}

      {/* Medical & Emergency Support Start */}
      <div className="container-fluid py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Safety & Support
            </h5>
            <h1 className="mb-5">Medical & Emergency Support</h1>
            <p className="lead mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
              Your safety is our top priority. Medical facilities and emergency support will be available throughout the entire marathon to ensure a safe and secure running experience.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-10">
              <div className="service-item rounded pt-3 border border-primary">
                <div className="p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="fa fa-3x fa-ambulance text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-2">Ambulance Services</h5>
                          <p className="mb-0">Ambulance services available throughout the event</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="fa fa-3x fa-user-md text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-2">Trained Medical Team</h5>
                          <p className="mb-0">Trained doctors and medical team on standby</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="fa fa-3x fa-heartbeat text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-2">Immediate Medical Attention</h5>
                          <p className="mb-0">Immediate medical attention provided in case of exhaustion, dehydration, or any medical emergency</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-start mb-3">
                        <div className="flex-shrink-0 me-3">
                          <i className="fa fa-3x fa-medkit text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-2">Certified First-Aid Staff</h5>
                          <p className="mb-0">Certified first-aid staff available throughout the event</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-start">
                        <div className="flex-shrink-0 me-3">
                          <i className="fa fa-3x fa-clock text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-2">Quick Response & Evacuation</h5>
                          <p className="mb-0">Quick response and evacuation support ensured for participant safety</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Medical & Emergency Support End */}

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Ayyapanthangal Marathon 2026
              </h4>
              <p>
                A community-driven fitness initiative promoting health awareness, 
                discipline, and an active lifestyle.
              </p>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-twitter" />
                </a>
                <a className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-youtube" />
                </a>
                <a className="btn btn-outline-light btn-social" href="">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Event Details
              </h4>
              <p className="mb-2">
                <i className="fa fa-calendar-alt me-3" />
                Sunday, 15 February 2026
              </p>
              <p className="mb-2">
                <i className="fa fa-clock me-3" />
                Assembly Time: 6:00 AM
              </p>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Starting Point: Porur Lake Area
              </p>
              <p className="mb-2">
                <i className="fa fa-flag-checkered me-3" />
                Finish Point: Ayyapanthangal Govt HR Sec School
              </p>
              <p className="mb-2">
                <i className="fa fa-route me-3" />
                1.5 KM | 3 KM | 5 KM
              </p>
              <p className="mb-2">
                <i className="fa fa-rupee-sign me-3" />
                Registration Fee: 1.5 KM - ₹350 | 3 KM - ₹350 | 5 KM - ₹400
              </p>
              <p className="mb-2">
                <i className="fa fa-users me-3" />
                For bulk registration contact{" "}
                <a
                  href="tel:+919444662322"
                  style={{ color: "#FFD700", textDecoration: "none" }}
                >
                  Ramesh +919444662322
                </a>
              </p>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Contact Us
              </h4>
              <p>For sponsorship inquiries and partnerships, please reach out to us.</p>
              <div className="position-relative mx-auto" style={{ maxWidth: "400px" }}>
                <input
                  className="form-control border-primary w-100 py-3 ps-4 pe-5"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="94446 62322"
                  defaultValue="94446 62322"
                  readOnly
                  style={{ backgroundColor: "#f8f9fa" }}
                />
                <a
                  href="tel:+919444662322"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-phone me-1" style={{ transform: "rotate(90deg)", display: "inline-block" }} /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-4 px-lg-5">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <a className="border-bottom" href="#">
                  Ayyapanthangal Marathon 2026
                </a>
                , All Right Reserved.
                <br />
                <small className="text-muted">
                  Website designed & developed by{" "}
                  <a 
                    href="https://stellarsolutions.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary"
                    style={{ textDecoration: "none" }}
                  >
                    Stellar Solutions
                  </a>
                </small>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href="/#home">Home</a>
                  <Link to="/event-details">Event Details</Link>
                  <a 
                    href="/#register"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                      setTimeout(() => {
                        const element = document.getElementById('register');
                        if (element) {
                          window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    Register
                  </a>
                  <Link to="/contact">Contact</Link>
                  <Link to="/terms">Terms & Conditions</Link>
                  <Link to="/shipping-policy">Shipping Policy</Link>
                  <Link to="/cancellation-refund">Refund Policy</Link>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}

export default EventDetails;
