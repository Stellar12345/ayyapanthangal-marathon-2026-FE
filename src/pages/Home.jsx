import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createRegistration, verifyPayment } from "../api/registrationApi.js";

function Home() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    presentAddress: "",
    state: "",
    city: "",
    pinCode: "",
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
  const [paymentModalData, setPaymentModalData] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const invoiceRef = useRef(null);

  const genderMap = {
    male: "Male",
    female: "Female",
    other: "Others",
  };

  const raceCategoryMap = {
    KM_5: "5 KM",
    KM_3: "3 KM",
    KM_1_5: "1.5 KM",
  };

  const getRegistrationFee = (category) => {
    const feeMap = {
      "1.5 KM": 350,
      "3 KM": 350,
      "5 KM": 400,
      KM_1_5: 350,
      KM_3: 350,
      KM_5: 400,
    };
    return feeMap[category] || 350;
  };

  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentModalData(null);
  };

  const handlePrintInvoice = () => {
    if (!paymentModalData || !invoiceRef.current) return;

    const printContents = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Registration Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            h2 { margin-bottom: 16px; }
            .invoice-section { margin-bottom: 10px; }
            .label { font-weight: 600; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { padding: 8px 6px; border-bottom: 1px solid #ddd; text-align: left; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

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
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "Pin Code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      newErrors.pinCode = "Pin Code must be 6 digits";
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

    // ============================================
    // TEMPORARY: Razorpay integration disabled
    // TODO: Remove this block after Razorpay is set up
    // ============================================
    const RAZORPAY_TEMPORARILY_DISABLED = true; // Set to false when Razorpay is ready
    
    if (RAZORPAY_TEMPORARILY_DISABLED) {
      setIsSubmitting(false);
      showNotification(
        "Oops! Payment gateway is temporarily unavailable. Please try again after some time or contact admin at +91 94446 62322",
        "error"
      );
      // Scroll to contact section after a short delay
      setTimeout(() => {
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          const offsetTop = contactSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }, 1500);
      return;
    }
    // ============================================
    // END OF TEMPORARY BLOCK
    // ============================================

    try {
      // Prepare registration data (normalize values to match backend expectations)
      const registrationData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        gender: genderMap[formData.gender] || formData.gender,
        dateOfBirth: formData.dateOfBirth,
        age: parseInt(formData.age),
        presentAddress: formData.presentAddress,
        state: formData.state,
        city: formData.city,
        pinCode: formData.pinCode,
        tshirtSize: formData.tshirtSize,
        raceCategory: raceCategoryMap[formData.raceCategory] || formData.raceCategory,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactMobile: formData.emergencyContactMobile,
        medicalHistory: formData.medicalHistory || "None",
        waiverAccepted: formData.waiverConsent,
        amount: getRegistrationFee(formData.raceCategory)
      };

      // 1. Create registration on backend (generates Razorpay order)
      const registrationResponse = await createRegistration(registrationData);

      const RAZORPAY_KEY_ID = "rzp_test_S35m3ruk7s318p";
      const amount = registrationResponse.amount || registrationData.amount;
      const orderId =
        registrationResponse.razorpayOrderId ||
        registrationResponse.razorpay_order_id ||
        registrationResponse.razorpayOrderID;

      // 2. Open Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Ayyapanthangal Marathon 2026",
        description: "Registration Fee",
        order_id: orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobileNumber,
        },
        theme: {
          color: "#FF6B35",
        },
        handler: async function (response) {
          try {
            console.log("Razorpay response:", response);
            const verifyResponse = await verifyPayment(response);

            setSubmitSuccess(true);
            setPaymentModalData(verifyResponse);
            setIsPaymentModalOpen(true);

            // Reset form
            setFormData({
              name: "",
              email: "",
              gender: "",
              dateOfBirth: "",
              age: "",
              presentAddress: "",
              state: "",
              city: "",
              pinCode: "",
              mobileNumber: "",
              medicalHistory: "",
              tshirtSize: "",
              raceCategory: "",
              emergencyContactName: "",
              emergencyContactMobile: "",
              waiverConsent: false,
            });
          } catch (err) {
            console.error("Payment verification error:", err);
            showNotification(
              err?.message || "Payment verification failed. Please contact support.",
              "error"
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      
      // Handle email already exists error
      if (error?.message?.includes("email already exists") || error?.error === "REGISTRATION_EMAIL_EXISTS") {
        setErrors(prev => ({
          ...prev,
          email: error.message || "A registration with this email already exists."
        }));
        showNotification(error.message || "A registration with this email already exists.", "error");
      } else {
        showNotification(error?.message || "An error occurred. Please try again.", "error");
      }
    }
  };
  // Handle hash navigation when component mounts or location changes
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Wait for DOM to be ready
      setTimeout(() => {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [location]);

  useEffect(() => {
    // Handle mobile menu icon toggle
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
      
      // Initial check
      handleMenuToggle();
    }

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
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 50; // Near bottom of page
      
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // Special handling for contact section (footer) - if near bottom, make it active
          if (sectionId === 'contact' && isNearBottom) {
            currentSection = sectionId;
          } else if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

    // Handle hash navigation from other pages
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for page to fully load
        setTimeout(() => {
          const targetId = hash.substring(1); // Remove # from hash
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
            // Update active nav link after scroll
            setTimeout(() => {
              updateActiveNavLink();
            }, 500);
          }
        }, 100);
      }
    };

    // Handle hash navigation on mount and after navigation
    handleHashNavigation();
    
    // Also handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href !== "#" && href !== "#!") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
          // Update URL hash
          if (href.startsWith('#')) {
            window.history.pushState(null, '', href);
          }
          // Update active link after scroll
          setTimeout(updateActiveNavLink, 500);
        }
      }
    };
    
    anchorLinks.forEach((link) => {
      link.addEventListener("click", handleAnchorClick);
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleAllScroll);
      window.removeEventListener('hashchange', handleHashNavigation);
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", handleAnchorClick);
      });
      if (navbarCollapse) {
        navbarCollapse.removeEventListener('shown.bs.collapse', handleMenuToggle);
        navbarCollapse.removeEventListener('hidden.bs.collapse', handleMenuToggle);
      }
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
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className={isMenuOpen ? "fa fa-times" : "fa fa-bars"} />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 pe-4">
              <a href="#home" className="nav-item nav-link active">
                Home
              </a>
              <Link to="/event-details" className="nav-item nav-link">
                Event Details
              </Link>
              <a href="#register" className="nav-item nav-link">
                Register
              </a>
              <Link to="/contact" className="nav-item nav-link">
                Contact
              </Link>
            </div>
            <a href="#register" className="btn btn-primary py-2 px-4">
              Register Now
            </a>
          </div>
        </nav>

        <div className="container-fluid hero-banner mb-5" id="home" style={{ minHeight: "60vh", padding: "80px 0 40px" }}>
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
                <div className="hero-date-item">
                  <i className="fa fa-calendar-alt me-2" />
                  <span>15 February 2026</span>
                </div>
                <div className="hero-location-item">
                  <i className="fa fa-map-marker-alt me-2" />
                  <span>Ayyapanthangal</span>
                </div>
              </div>
              
              {/* Registration Fee */}
              <div className="hero-prize-fee">
                <div className="hero-fee-badge">
                  <div className="hero-fee-header">
                    <i className="fa fa-rupee-sign me-2" />
                    <span className="hero-fee-label">Registration Fee</span>
                  </div>
                  <div className="hero-fee-amount-list">
                    <div className="hero-fee-item">
                      <span className="hero-fee-distance">1.5 KM</span>
                      <span className="hero-fee-price">
                        <span style={{ textDecoration: "line-through", opacity: 0.7, marginRight: "4px" }}>₹400</span>
                        <span>₹350</span>
                      </span>
                    </div>
                    <div className="hero-fee-separator">|</div>
                    <div className="hero-fee-item">
                      <span className="hero-fee-distance">3 KM</span>
                      <span className="hero-fee-price">
                        <span style={{ textDecoration: "line-through", opacity: 0.7, marginRight: "4px" }}>₹400</span>
                        <span>₹350</span>
                      </span>
                    </div>
                    <div className="hero-fee-separator">|</div>
                    <div className="hero-fee-item">
                      <span className="hero-fee-distance">5 KM</span>
                      <span className="hero-fee-price">
                        <span style={{ textDecoration: "line-through", opacity: 0.7, marginRight: "4px" }}>₹450</span>
                        <span>₹400</span>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      display: "inline-block",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255, 193, 7, 0.95)",
                      fontSize: "0.9rem",
                      color: "#3b2a00",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      boxShadow: "0 0 10px rgba(0,0,0,0.3)"
                    }}
                  >
                    Early Bird Offer – Limited Period Discount
                  </div>
                </div>
              </div>
              
              {/* Primary CTA Button */}
              <a href="#register" className="hero-register-btn">
                REGISTER NOW
              </a>
            </div>
            
            {/* Prize Money - Right Side (New Attractive Design) */}
            <div className="hero-prize-money-card">
              <div className="hero-prize-money-icon">
                <i className="fa fa-trophy" />
              </div>
              <div className="hero-prize-money-content">
                <div className="hero-prize-money-label">Win Cash Prizes</div>
                <div className="hero-prize-money-amount">Up to ₹25,000</div>
                <div style={{ 
                  marginTop: "16px", 
                  paddingTop: "16px", 
                  borderTop: "2px solid rgba(255, 255, 255, 0.3)",
                  fontSize: "clamp(0.9rem, 1.2vw, 1rem)", 
                  lineHeight: "1.8",
                  fontWeight: "500"
                }}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    marginBottom: "10px",
                    color: "#FFFFFF"
                  }}>
                    <i className="fa fa-tshirt me-3" style={{ fontSize: "1.2rem", color: "#FFD700" }}></i>
                    <span style={{ fontWeight: "600" }}>Event T-shirt</span>
                  </div>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    marginBottom: "10px",
                    color: "#FFFFFF"
                  }}>
                    <i className="fa fa-medal me-3" style={{ fontSize: "1.2rem", color: "#FFD700" }}></i>
                    <span style={{ fontWeight: "600" }}>Finisher Medal</span>
                  </div>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center",
                    color: "#FFFFFF"
                  }}>
                    <i className="fa fa-certificate me-3" style={{ fontSize: "1.2rem", color: "#FFD700" }}></i>
                    <span style={{ fontWeight: "600" }}>Participation Certificate</span>
                  </div>
                </div>
              </div>
              <div className="hero-prize-money-shine"></div>
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
              <div className="service-item rounded pt-3 h-100">
                <div className="p-4 d-flex flex-column h-100">
                  <i className="fa fa-3x fa-calendar-alt text-primary mb-4" />
                  <h5 className="mb-3">Date</h5>
                  <p className="mb-0 flex-grow-1 d-flex align-items-end">Sunday, 15 February 2026</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3 h-100">
                <div className="p-4 d-flex flex-column h-100">
                  <i className="fa fa-3x fa-map-marker-alt text-primary mb-4" />
                  <h5 className="mb-3">Venue</h5>
                  <p className="mb-0 flex-grow-1 d-flex align-items-end">Ayyapanthangal</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3 h-100">
                <div className="p-4 d-flex flex-column h-100">
                  <i className="fa fa-3x fa-route text-primary mb-4" />
                  <h5 className="mb-3">Race Categories</h5>
                  <p className="mb-0 flex-grow-1 d-flex align-items-end">1.5 KM | 3 KM | 5 KM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3 h-100">
                <div className="p-4 d-flex flex-column h-100">
                  <i className="fa fa-3x fa-rupee-sign text-primary mb-4" />
                  <h5 className="mb-3">Registration Fee</h5>
                  <p className="mb-0 flex-grow-1 d-flex align-items-end">1.5 KM: ₹350<br />3 KM: ₹350<br />5 KM: ₹400</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Event Details End */}

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
                <p className="lead mb-0" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>Registration Fee: 1.5 KM - ₹350 | 3 KM - ₹350 | 5 KM - ₹400</p>
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

                    {/* State */}
                    <div className="col-12 col-md-4">
                      <label htmlFor="state" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>

                    {/* City */}
                    <div className="col-12 col-md-4">
                      <label htmlFor="city" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>

                    {/* Pin Code */}
                    <div className="col-12 col-md-4">
                      <label htmlFor="pinCode" className="form-label" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
                        Pin Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`}
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="Enter 6-digit pin code"
                        maxLength="6"
                        pattern="[0-9]{6}"
                        inputMode="numeric"
                        required
                      />
                      {errors.pinCode && <div className="invalid-feedback">{errors.pinCode}</div>}
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
                          <span className="text-danger">*</span> I understand, there is associated risk with a marathon and waive the organisers from any liabilities. I have read and agree to the{" "}
                          <Link to="/terms" target="_blank" className="text-primary fw-bold" style={{ textDecoration: "underline" }}>
                            Terms and Conditions
                          </Link>
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
                          formData.raceCategory 
                            ? `Register & Pay ₹${getRegistrationFee(formData.raceCategory)}`
                            : "Register & Pay"
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
              {/* Benefits & Prizes - Compact Design */}
              <div className="benefits-prizes-compact">
                <div className="row g-3">
                  <div className="col-md-4 col-sm-6">
                    <div className="benefit-item-compact">
                      <div className="benefit-icon-compact">
                        <i className="fa fa-tshirt" />
                      </div>
                      <div className="benefit-text-compact">
                        <span className="benefit-label-compact">Event T-shirt</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="benefit-item-compact">
                      <div className="benefit-icon-compact">
                        <i className="fa fa-medal" />
                      </div>
                      <div className="benefit-text-compact">
                        <span className="benefit-label-compact">Finisher Medal</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="benefit-item-compact">
                      <div className="benefit-icon-compact">
                        <i className="fa fa-certificate" />
                      </div>
                      <div className="benefit-text-compact">
                        <span className="benefit-label-compact">Participation Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prize-highlight-compact">
                  <i className="fa fa-trophy me-2" />
                  <span>Winners across categories will receive <strong>cash prizes</strong></span>
                </div>
              </div>
              {/* Know More Button */}
              <div className="text-center mt-4">
                <Link to="/event-details" className="btn btn-primary btn-lg px-5 py-3">
                  <i className="fa fa-arrow-right me-2" />
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Event End */}



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


      {/* Payment Confirmation Modal */}
      {isPaymentModalOpen && paymentModalData && (
        <div className="payment-modal-backdrop">
          <div className="payment-modal" ref={invoiceRef}>
            <h4 className="payment-modal-title">Registration Confirmation</h4>
            <p className="payment-modal-message">
              {paymentModalData.message || "Payment verified and registration confirmed."}
            </p>
            <div className="payment-modal-section">
              <div><strong>Reference Number:</strong> {paymentModalData.referenceNumber}</div>
              {paymentModalData.userDetails && (
                <>
                  <div><strong>Name:</strong> {paymentModalData.userDetails.name}</div>
                  <div><strong>Email:</strong> {paymentModalData.userDetails.email}</div>
                  <div><strong>Mobile:</strong> {paymentModalData.userDetails.mobileNumber}</div>
                  <div><strong>Category:</strong> {paymentModalData.userDetails.category}</div>
                  <div><strong>Amount:</strong> ₹{paymentModalData.userDetails.amount}</div>
                </>
              )}
            </div>
            <div className="payment-modal-actions">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handlePrintInvoice}
              >
                Print Invoice
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClosePaymentModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <a href="#home">Home</a>
                  <Link to="/event-details">Event Details</Link>
                  <a href="#register">Register</a>
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

      {/* Back to Top */}
      {/* <a 
        href="#home" 
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
        style={{ display: "none" }}
      >
        <i className="bi bi-arrow-up" />
      </a> */}

      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast notification-toast-${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === "error" ? "⚠️" : notification.type === "success" ? "✓" : "ℹ️"}
            </span>
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
