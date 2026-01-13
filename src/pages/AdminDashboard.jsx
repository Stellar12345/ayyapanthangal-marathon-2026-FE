import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRegistrations, getRegistrationById } from "../api/adminApi";

function AdminDashboard() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchRegistrations();
  }, [navigate]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getRegistrations();
      if (response.data && Array.isArray(response.data)) {
        setRegistrations(response.data);
      } else {
        setError("Failed to load registrations.");
      }
    } catch (err) {
      setError(err?.message || "Failed to load registrations.");
      if (err?.message?.includes("401") || err?.message?.includes("Unauthorized")) {
        localStorage.removeItem("authToken");
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      setDetailLoading(true);
      const response = await getRegistrationById(id);
      if (response.data) {
        setSelectedRegistration(response.data);
        setShowDetailModal(true);
      }
    } catch (err) {
      alert(err?.message || "Failed to load registration details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatRaceCategory = (category) => {
    if (!category) return "N/A";
    const map = {
      KM_5: "5 KM",
      KM_3: "3 KM",
      KM_1_5: "1.5 KM",
    };
    return map[category] || category;
  };

  const getPaymentStatusBadge = (status) => {
    const statusClass =
      status === "PAID"
        ? "badge bg-success"
        : status === "PENDING"
        ? "badge bg-warning"
        : "badge bg-danger";
    return <span className={statusClass}>{status || "N/A"}</span>;
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Admin Dashboard</h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Registrations List</h5>
          </div>
          <div className="card-body">
            {registrations.length === 0 ? (
              <p className="text-muted">No registrations found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Race Category</th>
                      <th>Amount</th>
                      <th>Payment Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td>
                          <strong>{reg.ticketId || "N/A"}</strong>
                        </td>
                        <td>{reg.name}</td>
                        <td>{reg.email}</td>
                        <td>{reg.mobileNumber}</td>
                        <td>{formatRaceCategory(reg.raceCategory)}</td>
                        <td>₹{reg.amount}</td>
                        <td>{getPaymentStatusBadge(reg.paymentStatus)}</td>
                        <td>{formatDate(reg.createdAt)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleViewDetails(reg.id)}
                            disabled={detailLoading}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRegistration && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Registration Details - {selectedRegistration.ticketId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedRegistration(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>Name:</strong> {selectedRegistration.name}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Email:</strong> {selectedRegistration.email}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Mobile Number:</strong> {selectedRegistration.mobileNumber}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Gender:</strong> {selectedRegistration.gender}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Date of Birth:</strong>{" "}
                    {formatDate(selectedRegistration.dateOfBirth)}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Age:</strong> {selectedRegistration.age}
                  </div>
                  <div className="col-md-12 mb-3">
                    <strong>Present Address:</strong>{" "}
                    {selectedRegistration.presentAddress}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Medical History:</strong>{" "}
                    {selectedRegistration.medicalHistory || "None"}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>T-Shirt Size:</strong> {selectedRegistration.tshirtSize}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Race Category:</strong>{" "}
                    {formatRaceCategory(selectedRegistration.raceCategory)}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Amount:</strong> ₹{selectedRegistration.amount}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Payment Status:</strong>{" "}
                    {getPaymentStatusBadge(selectedRegistration.paymentStatus)}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Email Sent:</strong>{" "}
                    {selectedRegistration.emailSent ? "Yes" : "No"}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Emergency Contact Name:</strong>{" "}
                    {selectedRegistration.emergencyContactName}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Emergency Contact Mobile:</strong>{" "}
                    {selectedRegistration.emergencyContactMobile}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Razorpay Order ID:</strong>{" "}
                    {selectedRegistration.razorpayOrderId || "N/A"}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Razorpay Payment ID:</strong>{" "}
                    {selectedRegistration.razorpayPaymentId || "N/A"}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Waiver Accepted:</strong>{" "}
                    {selectedRegistration.waiverAccepted ? "Yes" : "No"}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Created At:</strong>{" "}
                    {formatDate(selectedRegistration.createdAt)}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Updated At:</strong>{" "}
                    {formatDate(selectedRegistration.updatedAt)}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedRegistration(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => {
              setShowDetailModal(false);
              setSelectedRegistration(null);
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
