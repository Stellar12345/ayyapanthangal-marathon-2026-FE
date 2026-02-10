import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SmallNavbar from "../components/SmallNavbar";

function ChiefGuest() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmallNavbar />

      <div className="container-fluid py-5" style={{ marginTop: "100px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="terms-card">
            <h3 className="terms-title mb-4">Chief Guest</h3>
            <div className="row g-4">
              <div className="col-12 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/chief_guest/ChatGPT Image Feb 3, 2026, 06_16_51 PM.png"
                    alt="Commander RadhaKrishanan"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <h5 className="text-uppercase text-primary mb-2">Chief Guest</h5>
                    <h4 className="mb-2">Commander RadhaKrishanan</h4>
                    <p className="mb-0">Indian Navy</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/chief_guest/WhatsApp Image 2026-02-04 at 7.14.01 AM.jpeg"
                    alt="Dr Siva Kumar IPS"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <h5 className="text-uppercase text-primary mb-2">Special Guest</h5>
                    <h4 className="mb-2">Dr Siva Kumar IPS</h4>
                    <p className="mb-2">Joint Commissioner of Police</p>
                    <p className="mb-0">Aavadi Commissionerate</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/chief_guest/WhatsApp Image 2026-02-06 at 12.52.42 PM.jpeg"
                    alt="Arvindhan IPS"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <h5 className="text-uppercase text-primary mb-2">Special Guest</h5>
                    <h4 className="mb-2">Arvindhan IPS</h4>
                    <p className="mb-2">Zonal Director South</p>
                    <p className="mb-0">Narcotics Control Bureau</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/chief_guest/WhatsApp Image 2026-02-06 at 2.34.04 PM.jpeg"
                    alt="Dr Shanmuga Sundaram"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <h5 className="text-uppercase text-primary mb-2">Special Guest</h5>
                    <h4 className="mb-2">Dr Shanmuga Sundaram</h4>
                    <p className="mb-2">Director, CUIC</p>
                    <p className="mb-0">Anna University</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/chief_guest/WhatsApp Image 2026-02-10 at 4.21.04 PM.jpeg"
                    alt="Mr. Anbarasan"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <h5 className="text-uppercase text-primary mb-2">Special Guest</h5>
                    <h4 className="mb-2">Mr. Anbarasan</h4>
                    <p className="mb-0">
                      Minister for Micro, Small and Medium Enterprises of Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/chief_guest/photo SP1 CCD_page-0001.jpg"
                    alt="Shahnaz Ilyas IPS"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <h5 className="text-uppercase text-primary mb-2">Special Guest</h5>
                    <h4 className="mb-0">Shahnaz Ilyas IPS</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChiefGuest;
