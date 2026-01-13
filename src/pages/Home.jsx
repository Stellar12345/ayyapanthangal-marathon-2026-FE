import React, { useEffect, useState } from "react";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    presentAddress: "",
    mobileNumber: "",
    medicalHistory: "",
    tshirtSize: "",
    raceCategory: "",
    emergencyContactName: "",
    emergencyContactMobile: "",
    waiverConsent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    // Auto-calculate age from date of birth
    if (name === 'dateOfBirth' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.age || parseInt(formData.age) < 1) {
      newErrors.age = "Valid age is required";
    }

    if (!formData.presentAddress.trim()) {
      newErrors.presentAddress = "Present Address is required";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\D/g, ""))) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.tshirtSize) {
      newErrors.tshirtSize = "T-shirt size is required";
    }

    if (!formData.raceCategory) {
      newErrors.raceCategory = "Race category is required";
    }

    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required";
    }

    if (!formData.emergencyContactMobile.trim()) {
      newErrors.emergencyContactMobile = "Emergency contact mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.emergencyContactMobile.replace(/\D/g, ""))) {
      newErrors.emergencyContactMobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.waiverConsent) {
      newErrors.waiverConsent = "You must accept the waiver and consent to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare registration data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        age: parseInt(formData.age),
        presentAddress: formData.presentAddress,
        tshirtSize: formData.tshirtSize,
        raceCategory: formData.raceCategory,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactMobile: formData.emergencyContactMobile,
        medicalHistory: formData.medicalHistory || "None",
        waiverAccepted: formData.waiverConsent,
        amount: 300
      };

      // Create Razorpay order (you'll need to implement this endpoint on your backend)
      // For now, we'll create order directly from frontend
      const RAZORPAY_KEY_ID = 'rzp_test_S07AaxUVYdeeAz';
      const amount = 300; // ₹300 in paise (300 * 100)

      // Open Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Ayyapanthangal Marathon 2026",
        description: "Registration Fee",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobileNumber
        },
        theme: {
          color: "#FF6B35"
        },
        handler: async function (response) {
          setIsSubmitting(false);
          
          // Here you should verify the payment on your backend
          // For now, we'll show success message
          setSubmitSuccess(true);
          
          // You can send payment verification to your backend:
          // await fetch('YOUR_BACKEND_URL/payment/verify', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     razorpayOrderId: response.razorpay_order_id,
          //     razorpayPaymentId: response.razorpay_payment_id,
          //     razorpaySignature: response.razorpay_signature,
          //     registrationData: registrationData
          //   })
          // });

          // Reset form after 5 seconds
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              gender: "",
              dateOfBirth: "",
              age: "",
              presentAddress: "",
              mobileNumber: "",
              medicalHistory: "",
              tshirtSize: "",
              raceCategory: "",
              emergencyContactName: "",
              emergencyContactMobile: "",
              waiverConsent: false
            });
            setSubmitSuccess(false);
          }, 5000);
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      setIsSubmitting(false);
      alert('An error occurred. Please try again.');
    }
  };
  useEffect(() => {
    // Hide spinner immediately when component mounts
    const hideSpinner = () => {
      const spinner = document.getElementById("spinner");
      if (spinner) {
        spinner.classList.remove("show");
        spinner.style.opacity = "0";
        spinner.style.visibility = "hidden";
      }
    };
    
    // Hide spinner as soon as possible
    hideSpinner();
    
    // Also try after a short delay to ensure it's hidden
    setTimeout(hideSpinner, 50);

    // Initialize WOW.js for animations (wait for it to load, max 2 seconds)
    let wowRetries = 0;
    const initWOW = () => {
      if (window.WOW) {
        new window.WOW().init();
      } else if (wowRetries < 20) {
        wowRetries++;
        setTimeout(initWOW, 100);
      }
    };
    initWOW();

    // Initialize counter-up if available (wait for jQuery and counterUp, max 2 seconds)
    let counterRetries = 0;
    const initCounter = () => {
      if (window.jQuery && window.jQuery.fn.counterUp) {
        window.jQuery('[data-toggle="counter-up"]').counterUp({
          delay: 10,
          time: 2000,
        });
      } else if (counterRetries < 20) {
        counterRetries++;
        setTimeout(initCounter, 100);
      }
    };
    initCounter();

    // Sticky navbar on scroll
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        if (window.scrollY > 45) {
          navbar.classList.add("sticky-top", "shadow-sm");
        } else {
          navbar.classList.remove("sticky-top", "shadow-sm");
        }
      }
    };

    // Active link highlighting based on scroll position
    const updateActiveNavLink = () => {
      const sections = ['home', 'about', 'sponsorship', 'register', 'contact'];
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      
      let currentSection = '';
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
          }
        }
      });
      
      // Update active class on nav links
      navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}` || (currentSection === 'home' && href === '#home')) {
          link.classList.add('active');
        }
      });
    };

    // Back to top button
    const backToTop = document.querySelector(".back-to-top");
    const handleBackToTopScroll = () => {
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.style.display = "block";
        } else {
          backToTop.style.display = "none";
        }
      }
    };

    const handleAllScroll = () => {
      handleScroll();
      handleBackToTopScroll();
      updateActiveNavLink();
    };

    window.addEventListener("scroll", handleAllScroll);
    
    // Initial active link check
    updateActiveNavLink();

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href !== "#" && href !== "#!") {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth"
            });
            // Update active link after scroll
            setTimeout(updateActiveNavLink, 500);
          }
        }
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleAllScroll);
    };
  }, []);

  return (
    <div className="container-fluid bg-white p-0">
      {/* Spinner Start */}
      <div
        id="spinner"
        className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        style={{ opacity: 0, visibility: "hidden", transition: "opacity 0.5s ease-out, visibility 0s linear 0.5s" }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      {/* Spinner End */}

      {/* Navbar & Hero Start */}
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
          <a href="#home" className="navbar-brand p-0 d-flex align-items-center">
            <img 
              src="/img/logo_1.png" 
              alt="Ayyapanthangal Marathon 2026 Logo" 
              style={{ height: "60px", width: "auto", marginRight: "15px" }}
              className="logo-img"
              onError={(e) => {
                e.target.src = "/img/logo.png";
                e.target.onerror = null;
              }}
            />
        
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 pe-4">
              <a href="#home" className="nav-item nav-link active">
                Home
              </a>
              <a href="#about" className="nav-item nav-link">
                About Event
              </a>
              <a href="#sponsorship" className="nav-item nav-link">
                Sponsorship
              </a>
              <a href="#register" className="nav-item nav-link">
                Register
              </a>
              <a href="#contact" className="nav-item nav-link">
                Contact
              </a>
            </div>
            <a href="#register" className="btn btn-primary py-2 px-4">
              Register Now
            </a>
          </div>
        </nav>

        <div className="container-fluid hero-banner mb-5" id="home">
          <div className="hero-overlay-dark"></div>
          <div className="container-fluid px-3 px-md-4 px-lg-5 hero-content-wrapper">
            <div className="hero-content">
              {/* Main Title */}
              <h1 className="hero-main-title">
                AYYAPANTHANGAL MARATHON 2026
              </h1>
              
              {/* Tagline */}
              <p className="hero-tagline-text">
                Run for Health • Run for Discipline • Run for a Cause
              </p>
              
              {/* Date & Location */}
              <div className="hero-date-location">
                <i className="fa fa-calendar-alt me-2" />
                <span>15 February 2026</span>
                <span className="hero-separator">•</span>
                <i className="fa fa-map-marker-alt me-2" />
                <span>Ayyapanthangal</span>
              </div>
              
              {/* Prize Money & Registration Fee */}
              <div className="hero-prize-fee">
                <div className="hero-prize-badge">
                  <i className="fa fa-trophy me-2" />
                  <span className="hero-prize-label">Win Cash Prizes</span>
                  <span className="hero-prize-amount">Up to ₹25,000</span>
                </div>
                <div className="hero-fee-badge">
                  <i className="fa fa-rupee-sign me-2" />
                  <span className="hero-fee-label">Registration Fee</span>
                  <span className="hero-fee-amount">₹300</span>
                </div>
              </div>
              
              {/* Primary CTA Button */}
              <a href="#register" className="hero-register-btn">
                REGISTER NOW
              </a>
            </div>
            
            {/* Distance Selector Pills - Bottom Right */}
            <div className="hero-distances">
              <h4 className="hero-distances-heading">Race Categories</h4>
              <div className="hero-distances-pills">
                <button className="hero-distance-pill">1.5 KM</button>
                <button className="hero-distance-pill">3 KM</button>
                <button className="hero-distance-pill">5 KM</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}

      {/* Event Details Start */}
      <div className="container-fluid py-5" id="about">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-calendar-alt text-primary mb-4" />
                  <h5>Date</h5>
                  <p>Sunday, 15 February 2026</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-map-marker-alt text-primary mb-4" />
                  <h5>Venue</h5>
                  <p>Ayyapanthangal</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-route text-primary mb-4" />
                  <h5>Race Categories</h5>
                  <p>1.5 KM | 3 KM | 5 KM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-rupee-sign text-primary mb-4" />
                  <h5>Registration Fee</h5>
                  <p>₹300 per participant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Event Details End */}

      {/* About Event Start */}
      <div className="container-fluid py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row g-5">
            <div className="col-12 text-center">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                About The Event
              </h5>
              <h1 className="mb-4">
                Ayyapanthangal Marathon 2026
              </h1>
              <p className="mb-4">
                The Ayyapanthangal Marathon 2026 is a community-driven fitness initiative 
                aimed at promoting health awareness, discipline, and an active lifestyle 
                among students, youngsters, working professionals, and families.
              </p>
              <p className="mb-4">
                The event is designed to bring together people from different age groups 
                to celebrate fitness, endurance, and community bonding through running.
              </p>
              <div className="row g-4 mb-4 justify-content-center">
                <div className="col-sm-6 col-md-5">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                    >
                      300–500+
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Expected</p>
                      <h6 className="text-uppercase mb-0">Participants</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-5">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1
                      className="flex-shrink-0 display-5 text-primary mb-0"
                    >
                      ₹25,000
                    </h1>
                    <div className="ps-4">
                      <p className="mb-0">Total Prize</p>
                      <h6 className="text-uppercase mb-0">Pool</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="mb-3">All participants completing the run will receive:</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fa fa-check text-primary me-2" />Event T-shirt</li>
                  <li className="mb-2"><i className="fa fa-check text-primary me-2" />Finisher Medal</li>
                  <li className="mb-2"><i className="fa fa-check text-primary me-2" />Participation Certificate</li>
                </ul>
                <p className="mb-0">
                  <strong>Winners across categories will receive cash prizes, with a total prize pool of up to ₹25,000.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Event End */}

      {/* Event Objectives Start */}
      <div className="container-fluid py-5 bg-light">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Event Objectives
            </h5>
            <h1 className="mb-5">Our Mission</h1>
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

      {/* Sponsorship Opportunities Start */}
      <div className="container-fluid py-5" id="sponsorship">
        <div className="container-fluid px-4 px-lg-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Sponsorship Opportunities
            </h5>
            <h1 className="mb-5">Partner With Us</h1>
            <p className="mb-5">
              We invite organizations, institutions, hospitals, corporates, and local 
              businesses to partner with us through the following sponsorship options:
            </p>
          </div>

          {/* Title Sponsor & Co-Sponsor */}
          <div className="row g-4 mb-5">
            <div className="col-lg-6">
              <div className="service-item rounded pt-3 border border-primary h-100">
                <div className="p-4">
                  <h3 className="text-primary mb-4">
                    <i className="fa fa-crown me-2" />
                    TITLE SPONSOR (Exclusive – 1 Partner)
                  </h3>
                  <h5 className="mb-3">Branding Benefits:</h5>
                  <p className="mb-2">
                    Event named as <strong>"[Brand Name] Ayyapanthangal Marathon 2026"</strong>
                  </p>
                  <p className="mb-3">Logo on:</p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Event T-shirts (front – prime visibility)</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Main stage backdrop</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Winner podium</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Certificates & posters</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Brand mentions during announcements</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Stall space at venue</li>
                  </ul>
                  <h5 className="text-primary">Suggested Contribution: ₹75,000 – ₹1,50,000 (Cash / Partial in-kind)</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="service-item rounded pt-3 border border-primary h-100">
                <div className="p-4">
                  <h3 className="text-primary mb-4">
                    <i className="fa fa-handshake me-2" />
                    CO-SPONSOR (2–3 Partners)
                  </h3>
                  <h5 className="mb-3">Branding Benefits:</h5>
                  <p className="mb-3">Logo on:</p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />T-shirt (back/sleeve)</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Stage side banners</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Registration desk</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />On-stage acknowledgement</li>
                  </ul>
                  <h5 className="text-primary">Suggested Contribution: ₹30,000 – ₹50,000 per sponsor</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Category-wise Sponsorship */}
          <div className="sponsorship-categories-section mb-5">
            <div className="text-center mb-5">
              <h3 className="section-title-sponsor mb-3">Category-Wise Sponsorship Options</h3>
              <p className="text-muted">Choose the sponsorship category that best fits your brand</p>
            </div>
            <div className="row g-4">
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="sponsorship-category-card h-100">
                  <div className="sponsorship-icon-wrapper">
                    <i className="fa fa-tshirt sponsorship-icon" />
                  </div>
                  <div className="sponsorship-card-content">
                    <h4 className="sponsorship-card-title">T-Shirt Sponsor</h4>
                    <ul className="sponsorship-benefits-list">
                      <li>Sponsor provides event T-shirts</li>
                      <li>Logo prominently displayed on all runner T-shirts</li>
                    </ul>
                    <div className="sponsorship-ideal-for">
                      <strong>Ideal for:</strong> Local Business conglomerate, Apparel brands, printing companies, sports stores
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                <div className="sponsorship-category-card h-100">
                  <div className="sponsorship-icon-wrapper">
                    <i className="fa fa-tint sponsorship-icon" />
                  </div>
                  <div className="sponsorship-card-content">
                    <h4 className="sponsorship-card-title">Water / Hydration Sponsor</h4>
                    <ul className="sponsorship-benefits-list">
                      <li>Branding at water stations</li>
                      <li>Logo on water bottles / cups</li>
                      <li>Announcements during the event</li>
                    </ul>
                    <div className="sponsorship-ideal-for">
                      <strong>Ideal for:</strong> Drinking water brands, beverage companies, RO suppliers
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <div className="sponsorship-category-card h-100">
                  <div className="sponsorship-icon-wrapper">
                    <i className="fa fa-trophy sponsorship-icon" />
                  </div>
                  <div className="sponsorship-card-content">
                    <h4 className="sponsorship-card-title">Prize Money Sponsor</h4>
                    <ul className="sponsorship-benefits-list">
                      <li>Sponsor supports winner cash prizes</li>
                      <li>"Prizes sponsored by…" recognition</li>
                      <li>On-stage visibility during prize distribution</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                <div className="sponsorship-category-card h-100">
                  <div className="sponsorship-icon-wrapper">
                    <i className="fa fa-video sponsorship-icon" />
                  </div>
                  <div className="sponsorship-card-content">
                    <h4 className="sponsorship-card-title">Stage Backdrop Sponsor</h4>
                    <ul className="sponsorship-benefits-list">
                      <li>Full logo display on main stage backdrop</li>
                      <li>High visibility in photographs & videos</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                <div className="sponsorship-category-card h-100">
                  <div className="sponsorship-icon-wrapper">
                    <i className="fa fa-flag-checkered sponsorship-icon" />
                  </div>
                  <div className="sponsorship-card-content">
                    <h4 className="sponsorship-card-title">Start / Finish Line Sponsor</h4>
                    <ul className="sponsorship-benefits-list">
                      <li>Branding on start/finish arch banners</li>
                      <li>Maximum photo & video exposure</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                <div className="sponsorship-category-card h-100">
                  <div className="sponsorship-icon-wrapper">
                    <i className="fa fa-store sponsorship-icon" />
                  </div>
                  <div className="sponsorship-card-content">
                    <h4 className="sponsorship-card-title">Local Business Partners</h4>
                    <ul className="sponsorship-benefits-list">
                      <li>Banner display at venue</li>
                      <li>Name on sponsor thank-you board</li>
                      <li>Public acknowledgement</li>
                    </ul>
                    <div className="sponsorship-contribution">
                      <strong>Suggested Contribution: ₹5,000 – ₹10,000</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* In-Kind Sponsorship */}
          <div className="row g-4 mb-5">
            <div className="col-12">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h3 className="text-primary mb-4">
                    <i className="fa fa-gift me-2" />
                    In-Kind Sponsorship Options
                  </h3>
                  <p className="mb-3">We also welcome support in the form of:</p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2"><i className="fa fa-check text-primary me-2" />Sound system & stage setup</li>
                        <li className="mb-2"><i className="fa fa-check text-primary me-2" />Printing (banners, posters, certificates)</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2"><i className="fa fa-check text-primary me-2" />Medical support / ambulance</li>
                        <li className="mb-2"><i className="fa fa-check text-primary me-2" />Photography & videography</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mb-0 mt-3">
                    <strong>In-kind sponsors will receive branding and public recognition.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Partner & Post-Event */}
          <div className="row g-4">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h3 className="text-primary mb-4">Why Partner With Us?</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Strong local visibility and goodwill</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Direct engagement with a health-focused audience</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Positive brand association with fitness & community service</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Long-term partnership opportunities for future editions</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h3 className="text-primary mb-4">Post-Event Brand Value</h3>
                  <p className="mb-3">All sponsors will receive:</p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Event photographs with branding</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Thank-you posts on digital platforms</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Certificate of appreciation</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2" />Event impact summary</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sponsorship Opportunities End */}

      {/* Participant Profile Start */}
      <div className="container-fluid py-5 bg-light">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row g-5">
            <div className="col-12">
              <div className="text-center mb-5">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                  Participant Profile
                </h5>
                <h1 className="mb-4">Brand Visibility Opportunities</h1>
              </div>
              
              <div className="row g-4 mb-5 pb-4">
                <div className="col-lg-4 col-md-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3 py-3">
                    <div>
                      <h3 className="text-primary mb-1">300–500+</h3>
                      <p className="mb-0"><strong>Expected participants</strong></p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3 py-3">
                    <div>
                      <h3 className="text-primary mb-1">Youth, working professionals, families</h3>
                      <p className="mb-0"><strong>Age group</strong></p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3 py-3">
                    <div>
                      <p className="mb-0"><strong>High local engagement with strong word-of-mouth reach</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-center mb-4">Excellent Branding Opportunities Through:</h3>
                <div className="row g-4">
                  <div className="col-lg-4 col-md-6">
                    <div className="service-item rounded pt-3">
                      <div className="p-4 text-center">
                        <i className="fa fa-3x fa-tshirt text-primary mb-3" />
                        <h5>Event T-shirts</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="service-item rounded pt-3">
                      <div className="p-4 text-center">
                        <i className="fa fa-3x fa-video text-primary mb-3" />
                        <h5>Stage backdrops</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="service-item rounded pt-3">
                      <div className="p-4 text-center">
                        <i className="fa fa-3x fa-flag-checkered text-primary mb-3" />
                        <h5>Start/Finish banners</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="service-item rounded pt-3">
                      <div className="p-4 text-center">
                        <i className="fa fa-3x fa-camera text-primary mb-3" />
                        <h5>Digital promotions & photographs</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="service-item rounded pt-3">
                      <div className="p-4 text-center">
                        <i className="fa fa-3x fa-bullhorn text-primary mb-3" />
                        <h5>On-stage announcements</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="lead mb-0">
                  This event provides sponsors direct engagement with a health-conscious 
                  and aspirational audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Participant Profile End */}

      {/* Conclusion Start */}
      <div className="container-fluid py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Conclusion
              </h5>
              <h1 className="mb-4">Join Us in This Movement</h1>
              <p className="mb-4 lead">
                We believe that the Ayyapanthangal Marathon 2026 is more than just a run—it 
                is a movement towards healthier living and disciplined lifestyles. We invite 
                you to partner with us and be a part of this meaningful community initiative.
              </p>
              <p className="mb-4 lead">
                We look forward to your support and association.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Conclusion End */}

      {/* Registration Form Start */}
      <div className="container-fluid py-4 py-md-5" id="register">
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="text-center mb-4 mb-md-5">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                  Registration
                </h5>
                <h1 className="mb-3 mb-md-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>Register for Ayyapanthangal Marathon 2026</h1>
                <p className="lead mb-0" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>Registration Fee: ₹300 per participant</p>
              </div>

              {submitSuccess ? (
                <div className="alert alert-success text-center" role="alert">
                  <h4 className="alert-heading" style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}>Registration Successful!</h4>
                  <p style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>Thank you for registering. We will contact you soon with further details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-light p-3 p-md-4 p-lg-5 rounded">
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="name" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Gender */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="gender" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>

                    {/* Date of Birth */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="dateOfBirth" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        required
                      />
                      {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                    </div>

                    {/* Age */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="age" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Age <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        min="1"
                        max="120"
                        required
                      />
                      {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                    </div>

                    {/* Present Address */}
                    <div className="col-12">
                      <label htmlFor="presentAddress" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Present Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${errors.presentAddress ? 'is-invalid' : ''}`}
                        id="presentAddress"
                        name="presentAddress"
                        value={formData.presentAddress}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter your complete address"
                        required
                      ></textarea>
                      {errors.presentAddress && <div className="invalid-feedback">{errors.presentAddress}</div>}
                    </div>

                    {/* Mobile Number */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="mobileNumber" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        pattern="[6-9][0-9]{9}"
                        required
                      />
                      {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                    </div>

                    {/* T-shirt Size */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="tshirtSize" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        T-shirt Size <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.tshirtSize ? 'is-invalid' : ''}`}
                        id="tshirtSize"
                        name="tshirtSize"
                        value={formData.tshirtSize}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select T-shirt Size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="XXXL">XXXL</option>
                      </select>
                      {errors.tshirtSize && <div className="invalid-feedback">{errors.tshirtSize}</div>}
                    </div>

                    {/* Race Category */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="raceCategory" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Race Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.raceCategory ? 'is-invalid' : ''}`}
                        id="raceCategory"
                        name="raceCategory"
                        value={formData.raceCategory}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Race Category</option>
                        <option value="KM_5">5 KM</option>
                        <option value="KM_3">3 KM</option>
                        <option value="KM_1_5">1.5 KM</option>
                      </select>
                      {errors.raceCategory && <div className="invalid-feedback">{errors.raceCategory}</div>}
                    </div>

                    {/* Medical History */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="medicalHistory" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Any Medical History
                      </label>
                      <textarea
                        className="form-control"
                        id="medicalHistory"
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Please mention any medical conditions, allergies, or health concerns (if any)"
                      ></textarea>
                    </div>

                    {/* Emergency Contact Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="emergencyContactName" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Emergency Contact Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.emergencyContactName ? 'is-invalid' : ''}`}
                        id="emergencyContactName"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        placeholder="Emergency contact person's name"
                        required
                      />
                      {errors.emergencyContactName && <div className="invalid-feedback">{errors.emergencyContactName}</div>}
                    </div>

                    {/* Emergency Contact Mobile */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="emergencyContactMobile" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Emergency Contact Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${errors.emergencyContactMobile ? 'is-invalid' : ''}`}
                        id="emergencyContactMobile"
                        name="emergencyContactMobile"
                        value={formData.emergencyContactMobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        pattern="[6-9][0-9]{9}"
                        required
                      />
                      {errors.emergencyContactMobile && <div className="invalid-feedback">{errors.emergencyContactMobile}</div>}
                    </div>

                    {/* Waiver and Consent */}
                    <div className="col-12">
                      <div className={`form-check ${errors.waiverConsent ? 'is-invalid' : ''}`}>
                        <input
                          className={`form-check-input ${errors.waiverConsent ? 'is-invalid' : ''}`}
                          type="checkbox"
                          id="waiverConsent"
                          name="waiverConsent"
                          checked={formData.waiverConsent}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="waiverConsent" style={{ fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}>
                          <span className="text-danger">*</span> I understand, there is associated risk with a marathon and waive the organisers from any liabilities
                        </label>
                        {errors.waiverConsent && <div className="invalid-feedback d-block">{errors.waiverConsent}</div>}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-center mt-3 mt-md-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 w-md-auto px-4 px-md-5 py-2 py-md-3"
                        style={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          "Register & Pay ₹300"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Registration Form End */}

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s" id="contact">
        <div className="container-fluid px-4 px-lg-5 py-5">
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
                Registration Fee: ₹300
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
                  placeholder="6379058035"
                  defaultValue="6379058035"
                  readOnly
                  style={{ backgroundColor: "#f8f9fa" }}
                />
                <a
                  href="tel:+916379058035"
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
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href="#home">Home</a>
                  <a href="#about">About</a>
                  <a href="#sponsorship">Sponsorship</a>
                  <a href="#register">Register</a>
                  <a href="#contact">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Back to Top */}
      <a 
        href="#home" 
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
        style={{ display: "none" }}
      >
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
}

export default Home;
