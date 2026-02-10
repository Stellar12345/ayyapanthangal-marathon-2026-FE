import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallNavbar from "../components/SmallNavbar";

function TermsAndConditions() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmallNavbar />

      {/* Terms & Conditions Start */}
      <div className="container-fluid py-5" id="terms" style={{ marginTop: "100px", paddingTop: "40px" }}>
        <div className="container-fluid px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="terms-card">
                <h3 className="terms-title mb-3">Terms and Conditions</h3>
                <ol className="terms-list">
                  <li>
                    Please choose the event carefully, confirmed registrations are non-refundable. You will have an option to change the Event
                    Category after registration. The minimum age eligibility for various events is as follows:
                    <ul className="mt-2">
                      <li>1.5 KM: 10 years (born on or before 15th February 2016)</li>
                      <li>3 KM: 12 years (born on or before 15th February 2014)</li>
                      <li>5 KM: 14 years (born on or before 15th February 2012)</li>
                    </ul>
                  </li>
                  <li>Proof of age shall be submitted by all participants while collecting their bib.</li>
                  <li>
                    Please provide us with a secure email address that you can access regularly, as email communication will be our primary means
                    of contacting you during the run up to the Event. Users of email services that offer filtering / blocking of messages from
                    unknown email address should add the event email to their address list.
                  </li>
                  <li>
                    The organizers will contact the runners by email / SMS / WhatsApp. Any notice sent to the email address registered with the
                    organizers shall be deemed as received by the runners.
                  </li>
                  <li>
                    By registering for any of the events, you acknowledge and accept that you are aware that long distance running is an extreme
                    sport and can be injurious to body and health. You take full responsibility for participating in the Ayyapanthangal Marathon
                    2026 and do not hold the organizers or other associated persons / entities responsible for any injury or accident.
                  </li>
                  <li>
                    Irrespective of your age and fitness status, it is recommended that you consult your physician and undergo complete medical
                    examination to assess your suitability to participate in the Event.
                  </li>
                  <li>
                    You agree that you are aware of all risks associated with participating in this Event including, but not limited to, falls,
                    contact with other participants, the effects of the weather (including high heat or humidity), traffic and the condition of
                    the road, arson or terrorist threats and all other risks associated with a public event.
                  </li>
                  <li>
                    You agree that the organizing committee and associated companies or entities that organize the Event shall not be liable for
                    any loss, damage, illness or injury that might occur as a result of your participation in the Event.
                  </li>
                  <li>
                    You agree to abide by the instructions provided by the organizers from time to time in the best interest of your health and
                    Event safety.
                  </li>
                  <li>
                    You agree to dress appropriately for the Event. Inappropriate clothing includes, but is not limited to, clothing or gear
                    dangerous to other participants, unpleasant to other participants, or carrying messages containing political or religious
                    propaganda and advertising an individual name or organization that the Event organizer does not acknowledge.
                  </li>
                  <li>
                    You agree that you will not use the Event to promote or communicate by any means political or religious propaganda or
                    advertising an individual name or organization that the Event organizer does not acknowledge.
                  </li>
                  <li>
                    You also agree to stop running if instructed by the Event organizers or the medical staff or by the aid station volunteers.
                  </li>
                  <li>
                    Copyright of images, photographs, articles, race records, and location information covering the Event, and their usage right
                    for TV broadcasting, newspapers, magazines and the Internet, belongs to the Event organizer. This includes but is not limited
                    to names and other personal information such as age and address of participants mentioned in coverage of the Event. You
                    confirm that your name and media recordings taken during your participation may be used to publicize the Event at any time by
                    the organizers.
                  </li>
                  <li>
                    You acknowledge and agree that your personal information can be stored and used by the organizers or any other company in
                    connection with the organization, promotion and administration of the Event and for the compilation of statistical
                    information.
                  </li>
                  <li>
                    You confirm that, in the event of adverse weather conditions, major incidents or threats on the day, the organizers reserve
                    the right to stop / cancel / postpone the Event. You understand that confirmed registrations and merchandise orders are
                    non‑refundable, non‑transferable and cannot be modified.
                  </li>
                  <li>
                    The organizers reserve the right to reject any application without providing reasons. Any amount collected from rejected
                    applications alone will be refunded in full (excluding bank charges wherever applicable).
                  </li>
                  <li>
                    The Event team will communicate the cut‑off and Event closure time before race day. Participants will not be allowed to stay
                    on the course beyond the stipulated cut‑off time for an event.
                  </li>
                  <li>
                    It is mandatory for confirmed participants to visit the Expo to collect their running bib. If a participant is unable to
                    attend the Expo due to unavoidable reasons, an authorized representative may collect the running bib on their behalf.
                    Detailed instructions in this regard will be sent by email in due course to all participants.
                  </li>
                  <li>
                    We will be sending regular updates to your registered mobile number as well. This should not be treated as spam and you shall
                    not take any action against our bulk SMS / WhatsApp / email service provider and / or the organizers and partners.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Terms & Conditions End */}

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

export default TermsAndConditions;
