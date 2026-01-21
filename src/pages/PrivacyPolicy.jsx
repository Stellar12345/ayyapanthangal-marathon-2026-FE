import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PrivacyPolicy() {
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

      {/* Privacy Policy Start */}
      <div className="container-fluid py-5" style={{ marginTop: "100px", paddingTop: "40px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="terms-card">
                <h3 className="terms-title mb-4">Privacy Policy</h3>
                
                <div className="mb-4">
                  <h5 className="mb-3">Introduction</h5>
                  <p>
                    APT Marathon ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and register for our marathon event. By using our website and registering for the event, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Information We Collect</h5>
                  <p className="mb-2">
                    When you register for APT Marathon, we collect the following personal information:
                  </p>
                  <ul>
                    <li><strong>Name:</strong> Your full name as provided during registration</li>
                    <li><strong>Email Address:</strong> Your email address for communication and confirmation</li>
                    <li><strong>Phone Number:</strong> Your mobile number for SMS confirmations and event updates</li>
                    <li><strong>Event Details:</strong> The event category you register for (1.5 KM, 3 KM, or 5 KM)</li>
                    <li><strong>Payment Information:</strong> Payment transaction details processed through Razorpay</li>
                    <li><strong>Registration Date:</strong> Date and time of your registration</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">How We Use Your Information</h5>
                  <p className="mb-2">
                    We use the collected information for the following purposes:
                  </p>
                  <ul>
                    <li>To process and confirm your event registration</li>
                    <li>To send you registration confirmation emails and SMS</li>
                    <li>To communicate important event updates and information</li>
                    <li>To process payments securely through Razorpay</li>
                    <li>To manage event participation and logistics</li>
                    <li>To comply with legal and regulatory requirements</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Payment Processing</h5>
                  <p className="mb-2">
                    All payment transactions are processed securely through Razorpay, our authorized payment gateway partner. When you make a payment:
                  </p>
                  <ul>
                    <li>Razorpay handles all payment data securely</li>
                    <li>We do not store your credit card, debit card, or bank account details</li>
                    <li>Razorpay complies with PCI DSS (Payment Card Industry Data Security Standard) requirements</li>
                    <li>Your payment information is encrypted and transmitted securely</li>
                  </ul>
                  <p className="mt-2">
                    For more information about Razorpay's privacy practices, please visit their privacy policy at <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">https://razorpay.com/privacy/</a>.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Data Protection</h5>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Data Sharing and Disclosure</h5>
                  <p className="mb-2">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul>
                    <li>With Razorpay for payment processing purposes</li>
                    <li>With event management partners necessary for organizing the marathon</li>
                    <li>When required by law or legal process</li>
                    <li>To protect our rights, property, or safety, or that of our users</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Data Retention</h5>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. After the event concludes, we may retain certain information for record-keeping and legal compliance purposes.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Your Rights</h5>
                  <p className="mb-2">
                    Under applicable Indian laws, you have the right to:
                  </p>
                  <ul>
                    <li>Access your personal information we hold</li>
                    <li>Request correction of inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information (subject to legal requirements)</li>
                    <li>Object to processing of your personal information</li>
                    <li>Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, please contact us at <a href="mailto:rameshnivasha@gmail.com">rameshnivasha@gmail.com</a>.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Cookies and Tracking</h5>
                  <p>
                    Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us analyze website traffic and improve our services. You can control cookie preferences through your browser settings.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Third-Party Links</h5>
                  <p>
                    Our website may contain links to third-party websites, including Razorpay's payment gateway. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Children's Privacy</h5>
                  <p>
                    Our event registration requires parental consent for participants under 18 years of age. We do not knowingly collect personal information from children without appropriate parental consent. If you believe we have collected information from a child without consent, please contact us immediately.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Changes to This Privacy Policy</h5>
                  <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Legal Compliance</h5>
                  <p>
                    This Privacy Policy is compliant with applicable Indian laws and regulations, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                  </p>
                </div>

                <div className="mb-4">
                  <h5 className="mb-3">Contact Us</h5>
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> <a href="mailto:rameshnivasha@gmail.com">rameshnivasha@gmail.com</a>
                  </p>
                  <p className="mb-1">
                    <strong>Organizer:</strong> Stellar Solutions
                  </p>
                  <p>
                    <strong>Website:</strong> <a href="https://apt-marathon.stellarsolutions.org" target="_blank" rel="noopener noreferrer">https://apt-marathon.stellarsolutions.org</a>
                  </p>
                </div>

                <div className="alert alert-info mt-4">
                  <strong>Last Updated:</strong> This Privacy Policy was last updated on the date you accessed this page. By using our website and registering for the event, you acknowledge that you have read and understood this Privacy Policy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Policy End */}

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

export default PrivacyPolicy;
