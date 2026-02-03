import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SmallNavbar from "../components/SmallNavbar";

function Sponsors() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmallNavbar />

      <div className="container-fluid py-5" style={{ marginTop: "100px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="terms-card">
            <h3 className="terms-title mb-4">Sponsors</h3>
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <div style={{ padding: "14px 16px" }}>
                  
                  </div>
                  <div style={{ display: "grid", gap: "12px", padding: "0 16px 16px" }}>
                    <img
                      src="/sponser/group_logo.webp"
                      alt="Sponsor group logo"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    <img
                      src="/sponser/name.webp"
                      alt="Sponsor name logo"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/sponser/WhatsApp Image 2026-02-03 at 4.54.22 PM (1).jpeg"
                    alt="Hinduja Housing Finance sponsor logo"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: "#1f2937" }}>
                      Hinduja Housing Finance
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                      Sponsor
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    src="/sponser/WhatsApp Image 2026-02-03 at 4.54.22 PM.jpeg"
                    alt="Vaaimai Kural sponsor logo"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: "#1f2937" }}>
                      வாய்மை குரல்
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                      Sponsor
                    </div>
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

export default Sponsors;
