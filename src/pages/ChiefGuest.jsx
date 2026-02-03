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
            <div className="row g-4 align-items-start">
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
                    alt="Commander L. Radhakrishnan (Retd)"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <h4 className="mb-3">Commander L. Radhakrishnan (Retd)</h4>
                <p>
                  Commander L. Radhakrishnan (Retd) is a veteran of the Indian Navy known for
                  his continued service to the veteran community and his active involvement in
                  humanitarian work.
                </p>

                <h5 className="mt-4">Career and Professional Profile</h5>
                <ul>
                  <li>
                    <strong>Naval Veteran:</strong> He reached the rank of Commander in the
                    Indian Navy, with a career involving specialized naval operations. After
                    retirement, he remained deeply connected to the service through the Navy
                    Foundation, where he notably served as the Secretary of the Chennai Chapter.
                  </li>
                  <li>
                    <strong>Humanitarian Leadership:</strong> He is a prominent figure in Rotary
                    International, having served as the Past President of the Rotary Club of
                    Chennai IT City. He frequently advocates for social causes, including
                    literacy, environmental sustainability, and public health through Rotary
                    initiatives.
                  </li>
                  <li>
                    <strong>Key Themes in Speeches:</strong> As a public speaker, he often
                    discusses the evolution of the Indian Navy and the importance of
                    “Service Above Self.” He focuses on motivating the youth and supporting
                    the welfare of retired naval personnel.
                  </li>
                </ul>

                <h5 className="mt-4">Important Distinction</h5>
                <p className="mb-2">
                  His name is often associated with other notable figures in Indian public life:
                </p>
                <ul className="mb-0">
                  <li>Admiral Radhakrishna Hariram Tahiliani: The 11th Chief of Naval Staff (1984–1987).</li>
                  <li>Admiral R. Hari Kumar: The 25th Chief of Naval Staff (2021–2024).</li>
                  <li>C. P. Radhakrishnan: The current Vice President of India and former Governor of Maharashtra.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChiefGuest;
