import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SmallNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarCollapse");
    const handleMenuToggle = () => {
      if (navbarCollapse) {
        const isOpen = navbarCollapse.classList.contains("show");
        setIsMenuOpen(isOpen);
      }
    };

    if (navbarCollapse) {
      navbarCollapse.addEventListener("shown.bs.collapse", handleMenuToggle);
      navbarCollapse.addEventListener("hidden.bs.collapse", handleMenuToggle);
      handleMenuToggle();
    }

    return () => {
      if (navbarCollapse) {
        navbarCollapse.removeEventListener("shown.bs.collapse", handleMenuToggle);
        navbarCollapse.removeEventListener("hidden.bs.collapse", handleMenuToggle);
      }
    };
  }, []);

  const linkClass = (path) =>
    `nav-item nav-link${location.pathname === path ? " active" : ""}`;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm px-4 px-lg-5 py-2 py-lg-3"
      style={{ zIndex: 9999 }}
    >
      <Link to="/" className="navbar-brand p-0">
        <h1 className="text-primary m-0" style={{ fontSize: "1.4rem" }}>
          <i className="fa fa-running me-3" />
          Ayyapanthangal Marathon 2026
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
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/event-details" className={linkClass("/event-details")}>
            Event Details
          </Link>
          <Link to="/gallery" className={linkClass("/gallery")}>
            Gallery
          </Link>
          <Link to="/sponsors" className={linkClass("/sponsors")}>
            Sponsors
          </Link>
          <Link to="/chief-guest" className={linkClass("/chief-guest")}>
            Chief Guest
          </Link>
          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default SmallNavbar;
