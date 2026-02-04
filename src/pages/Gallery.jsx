import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SmallNavbar from "../components/SmallNavbar";

function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmallNavbar />

      <div className="container-fluid py-5" style={{ marginTop: "100px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="terms-card">
            <h3 className="terms-title mb-4">Gallery</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 3fr))",
                gap: "16px",
              }}
            >
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gridRow: "span 2",
                }}
              >
                <img
                  src="/gallery/image.png"
                  alt="Usha Nandhinee with Union Councillor Ayyapanthangal"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#dc3545" }}>
                    Usha Nandhinee
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                    Union Councillor Ayyapanthangal
                  </div>
                  <div style={{ marginTop: "6px", fontWeight: 600, color: "#dc3545" }}>
                    Ethirajan
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src="/gallery/WhatsApp Image 2026-02-03 at 12.41.13 PM.jpeg"
                  alt="Jamila Pandurangan, President, Ayyapanthangal Panchayat"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#dc3545" }}>
                    Jamila Pandurangan
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                    President
                  </div>
                  <div style={{ marginTop: "6px", fontWeight: 600, color: "#dc3545" }}>
                    Ayyapanthangal Panchayat
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src="/gallery/WhatsApp Image 2026-02-03 at 12.42.00 PM.jpeg"
                  alt="Arul, Prop - Saravan Body Works, Ayyapanthangal"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#dc3545" }}>
                    Arul
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                    Prop - Saravan Body Works
                  </div>
                  <div style={{ marginTop: "6px", fontWeight: 600, color: "#dc3545" }}>
                    Ayyapanthangal
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src="/gallery/WhatsApp Image 2026-02-03 at 12.42.52 PM.jpeg"
                  alt="Mrs Lokanayaki Avl, Union Councillor Ayyapanthangal"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#dc3545" }}>
                    Mrs Lokanayaki Avl
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                    Union Councillor Ayyapanthangal
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src="/gallery/WhatsApp Image 2026-02-03 at 12.43.23 PM.jpeg"
                  alt="ANE Bupathi Avargal"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#dc3545" }}>
                    ANE Bupathi Avargal
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
                }}
              >
                <img
                  src="/gallery/WhatsApp Image 2026-02-04 at 5.53.11 AM.jpeg"
                  alt="Mr. Murugados, Vice president, Ayyapanthangal Panchayat"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#dc3545" }}>
                    Mr. Murugados
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>
                    Vice president
                  </div>
                  <div style={{ marginTop: "6px", fontWeight: 600, color: "#dc3545" }}>
                    Ayyapanthangal Panchayat
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

export default Gallery;
