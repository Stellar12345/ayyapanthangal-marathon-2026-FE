import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import Contact from "./pages/Contact.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import CancellationRefund from "./pages/CancellationRefund.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/cancellation-refund" element={<CancellationRefund />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
