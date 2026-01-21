import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CancellationRefund() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const navbarCollapse = document.getElementById('navbarCollapse');
    const handleMenuToggle = () => {
      if (navbarCollapse) {
        const isOpen = navbarCollapse.classList.contains('show');
        setIsMenuOpen(isOpen);
      }
    };

    if (navbarCollapse) {
      navbarCollapse.addEventListener('shown.bs.collapse', handleMenuToggle);
      navbarCollapse.addEventListener('hidden.bs.collapse', handleMenuToggle);
      handleMenuToggle();
    }

    return () => {
      if (navbarCollapse) {
        navbarCollapse.removeEventListener('shown.bs.collapse', handleMenuToggle);
        navbarCollapse.removeEventListener('hidden.bs.collapse', handleMenuToggle);
      }
    };
  }, []);

  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm px-4 px-lg-5 py-3 py-lg-4" style={{ zIndex: 9999 }}>
        <Link to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <i className="fa fa-running me-3" />
            Marathon 2026
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className={isMenuOpen ? "fa fa-times" : "fa fa-bars"} />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <Link to="/event-details" className="nav-item nav-link">
              Event Details
            </Link>
            <a 
              href="/#register" 
              className="nav-item nav-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                setTimeout(() => {
                  const element = document.getElementById('register');
                  if (element) {
                    window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
                  } else {
                    setTimeout(() => {
                      const retryElement = document.getElementById('register');
                      if (retryElement) {
                        window.scrollTo({ top: retryElement.offsetTop - 80, behavior: 'smooth' });
                      }
                    }, 500);
                  }
                }, 300);
              }}
            >
              Register
            </a>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar End */}

      {/* Cancellation & Refund Policy Start */}
      <div className="container-fluid py-5" style={{ marginTop: "100px", paddingTop: "40px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="terms-card">
                <h3 className="terms-title mb-4">Cancellation & Refund Policy</h3>
                
                <div className="mb-4">
                  <h5 className="mb-3">No Cancellations</h5>
                  <p className="mb-3">
                    All registrations for APT Marathon are final and cannot be cancelled once payment is successfully processed. By completing your registration and payment, you acknowledge that you understand and agree to this policy.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">No Refunds</h5>
                  <p className="mb-2">
                    We do not provide refunds under any circumstances, including but not limited to:
                  </p>
                  <ul>
                    <li>Non-attendance at the event</li>
                    <li>Medical emergencies or health issues</li>
                    <li>Change of plans or personal circumstances</li>
                    <li>Weather conditions or natural disasters</li>
                    <li>Event date changes or postponements</li>
                    <li>Event cancellation by organizers</li>
                    <li>Any other reason whatsoever</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">No Transfers</h5>
                  <p>
                    Registrations are non-transferable. You cannot transfer your registration to another person or to a different event category after payment is completed.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Event-Based Service</h5>
                  <p>
                    APT Marathon is an event-based registration service. Once you register and pay, your registration fee is committed to securing your participation slot in the event. This is a one-time event registration service, not a product purchase.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Payment Processing</h5>
                  <p className="mb-2">
                    Payments are processed securely through Razorpay, our authorized payment gateway partner. Once payment is successfully processed:
                  </p>
                  <ul>
                    <li>Your registration is immediately confirmed</li>
                    <li>You will receive a confirmation email and SMS</li>
                    <li>The registration fee cannot be refunded or reversed</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Technical Payment Issues</h5>
                  <p className="mb-2">
                    If you experience any technical issues during payment processing, such as:
                  </p>
                  <ul>
                    <li>Payment deducted but registration not confirmed</li>
                    <li>Duplicate payment charges</li>
                    <li>Payment gateway errors</li>
                  </ul>
                  <p className="mt-2">
                    Please contact us immediately at <a href="mailto:rameshnivasha@gmail.com">rameshnivasha@gmail.com</a> with your payment transaction details, and we will investigate and resolve the issue. This is the only exception where we may process refunds or corrections, subject to verification.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Event Cancellation by Organizers</h5>
                  <p>
                    In the unlikely event that the marathon is cancelled by the organizers due to circumstances beyond our control, registrations will remain non-refundable. However, we will make reasonable efforts to reschedule the event or provide alternative arrangements, subject to feasibility.
                  </p>
                </div>

                <div className="alert alert-warning mt-4">
                  <strong>Important Notice:</strong> Please ensure you are able to attend the event before completing your registration and payment. By proceeding with registration, you confirm that you have read, understood, and agree to this Cancellation & Refund Policy. If you have any questions before registering, please contact us at <a href="mailto:rameshnivasha@gmail.com">rameshnivasha@gmail.com</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cancellation & Refund Policy End */}

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

export default CancellationRefund;
