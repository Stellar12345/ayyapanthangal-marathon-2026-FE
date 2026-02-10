import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallNavbar from "../components/SmallNavbar";

function Contact() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmallNavbar />

      {/* Contact Us Start */}
      <div className="container-fluid py-5" style={{ marginTop: "100px", paddingTop: "40px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="terms-card">
                <h3 className="terms-title mb-4">Contact Us</h3>
                
                <div className="mb-4">
                  <h5 className="mb-3">APT Marathon</h5>
                  <p className="mb-2">
                    <strong>Organizer:</strong> Ramesh Nivash
                  </p>
                  <p className="mb-2">
                    <strong>Website:</strong> <a href="https://apt-marathon.stellarsolutions.org" target="_blank" rel="noopener noreferrer">https://apt-marathon.stellarsolutions.org</a>
                  </p>
                  <p className="mb-2">
                    <strong>Country:</strong> India
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Get in Touch</h5>
                  <p className="mb-2">
                    <i className="fa fa-envelope me-2 text-primary"></i>
                    <strong>Email:</strong> <a href="mailto:rameshnivasha@gmail.com">rameshnivasha@gmail.com</a>
                  </p>
                  <p className="mb-2">
                    <i className="fa fa-phone me-2 text-primary"></i>
                    <strong>Phone:</strong> <a href="tel:+919444662322" style={{ textDecoration: "none", color: "inherit" }}>+91-94446 62322</a>
                  </p>
                  <p className="mb-2">
                    <i className="fa fa-clock me-2 text-primary"></i>
                    <strong>Support Hours:</strong> Monday to Friday, 10:00 AM – 6:00 PM IST
                  </p>
                  <p className="mb-2">
                    <i className="fa fa-map-marker-alt me-2 text-primary"></i>
                    <strong>Address:</strong>{" "}
                    Ramesh Nivash A, Gowri Nivas, Advisor to Govt of Tamil Nadu, No 229 B Maduram Nagar,
                    Ayyapanthangal, Chennai - 600 056.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">How We Can Help</h5>
                  <p className="mb-2">
                    Our support team is available to assist you with:
                  </p>
                  <ul>
                    <li>Event registration inquiries</li>
                    <li>Payment-related technical issues</li>
                    <li>General questions about the marathon event</li>
                    <li>Account and registration status inquiries</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Response Time</h5>
                  <p>
                    We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters related to payment processing, please mention "URGENT" in your email subject line.
                  </p>
                </div>

                <div className="alert alert-info mt-4">
                  <strong>Note:</strong> Please note that all registrations are final and non-refundable. For details regarding our cancellation and refund policy, please visit our <Link to="/cancellation-refund">Cancellation & Refund Policy</Link> page.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Us End */}

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
                <i className="fa fa-map-marker-alt me-3" />
                Ayyapanthangal
              </p>
              <p className="mb-2">
                <i className="fa fa-route me-3" />
                1.5 KM | 3 KM | 5 KM
              </p>
              <p className="mb-2">
                <i className="fa fa-rupee-sign me-3" />
                Registration Fee: 1.5 KM - ₹350 | 3 KM - ₹350 | 5 KM - ₹400
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

export default Contact;
