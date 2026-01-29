import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRegistrations, getRegistrationById, getAdminStats } from "../api/adminApi";

function AdminDashboard() {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ totalCount: 0, totalRevenue: 0 });
  const [filters, setFilters] = useState({
    paymentStatus: "PAID",
    raceCategory: "",
    finalRegistration: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    totalResults: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [selectedIds, setSelectedIds] = useState([]);
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
    fetchStats();
  }, [navigate]);

  const fetchRegistrations = async (overrideFilters) => {
    try {
      setLoading(true);
      setError("");
      const activeFilters = overrideFilters || filters;
      const response = await getRegistrations({
        ...activeFilters,
        page: activeFilters?.page || 1,
        limit: activeFilters?.limit || 10,
      });
      const responseData = response.data || response;
      const container = responseData.data || responseData;
      const items = container.items || container.results || container.registrations || container;
      const pageInfo = container.pageInfo || responseData.pageInfo;

      if (Array.isArray(items)) {
        setRegistrations(items);
      } else {
        setError("Failed to load registrations.");
      }

      if (pageInfo) {
        const currentPage = Number(pageInfo.currentPage || pageInfo.page || 1);
        const totalPages = Number(pageInfo.totalPages || pageInfo.pageCount || 1);
        setPagination({
          totalResults: pageInfo.totalResults ?? pageInfo.total ?? stats.totalCount ?? 0,
          currentPage,
          totalPages,
          hasNextPage: !!pageInfo.hasNextPage,
          hasPrevPage: !!pageInfo.hasPrevPage,
        });
        setFilters((prev) => ({ ...prev, page: currentPage, limit: pageInfo.resultsPerPage || prev.limit || 50 }));
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

  const fetchStats = async () => {
    try {
      const response = await getAdminStats();
      if (response.data) {
        setStats({
          totalCount: response.data.totalCount ?? 0,
          totalRevenue: response.data.totalRevenue ?? 0,
        });
      }
    } catch (err) {
      // Do not block the page for stats error; just log silently.
      console.error("Failed to load admin stats:", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchRegistrations({ ...filters, page: 1 });
  };

  const handleClearFilters = () => {
    const empty = {
      paymentStatus: "",
      raceCategory: "",
      finalRegistration: "",
      search: "",
    };
    setFilters(empty);
    fetchRegistrations({ ...empty, page: 1 });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages || page === pagination.currentPage) return;
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchRegistrations(newFilters);
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

  const toggleSelectAll = () => {
    if (selectedIds.length === registrations.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(registrations.map((r) => r.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleExportCsv = () => {
    const rows =
      selectedIds.length > 0
        ? registrations.filter((r) => selectedIds.includes(r.id))
        : registrations;

    if (!rows.length) {
      alert("No registrations to export.");
      return;
    }

    const header = [
      "Reference Number",
      "Name",
      "Email",
      "Mobile",
      "Race Category",
      "Amount",
      "Payment Status",
      "Created At",
    ];

    const csvRows = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.referenceNumber || r.ticketId || "",
          `"${(r.name || "").replace(/"/g, '""')}"`,
          `"${(r.email || "").replace(/"/g, '""')}"`,
          r.mobileNumber || "",
          formatRaceCategory(r.raceCategory),
          r.amount ?? "",
          r.paymentStatus || "",
          formatDate(r.createdAt),
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "registrations.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Admin Dashboard</h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Stats Summary */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card border-primary h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Total Registrations</h6>
                  <h3 className="card-title mb-0">{stats.totalCount}</h3>
                </div>
                <div>
                  <i className="fa fa-users text-primary" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card border-success h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Total Revenue (₹)</h6>
                  <h3 className="card-title mb-0">₹{stats.totalRevenue}</h3>
                </div>
                <div>
                  <i className="fa fa-rupee-sign text-success" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Filters</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleFilterSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Payment Status</label>
                  <select
                    name="paymentStatus"
                    className="form-select"
                    value={filters.paymentStatus}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="PAID">Paid</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Race Category</label>
                  <select
                    name="raceCategory"
                    className="form-select"
                    value={filters.raceCategory}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="KM_1_5">1.5 KM</option>
                    <option value="KM_3">3 KM</option>
                    <option value="KM_5">5 KM</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Final Registration</label>
                  <select
                    name="finalRegistration"
                    className="form-select"
                    value={filters.finalRegistration}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Search (name/email/mobile)</label>
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search..."
                  />
                </div>
                
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              Registrations List{" "}
              {pagination.totalResults > 0 && (
                <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                  (Page {pagination.currentPage} of {pagination.totalPages})
                </span>
              )}
            </h5>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleExportCsv}
              disabled={registrations.length === 0}
            >
              Export CSV
            </button>
          </div>
          <div className="card-body">
            {registrations.length === 0 ? (
              <p className="text-muted">No registrations found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover admin-dashboard-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            registrations.length > 0 &&
                            selectedIds.length === registrations.length
                          }
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th>Reference Number</th>
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
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(reg.id)}
                            onChange={() => toggleSelectOne(reg.id)}
                          />
                        </td>
                        <td>
                          <strong>{reg.referenceNumber || reg.ticketId || "N/A"}</strong>
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
            {pagination.totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Total Results: {pagination.totalResults}
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    disabled={!pagination.hasNextPage}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRegistration && (
        <div className="admin-detail-modal-backdrop">
          <div className="admin-detail-modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Registration Details -{" "}
                  {selectedRegistration.referenceNumber ||
                    selectedRegistration.ticketId ||
                    selectedRegistration.id}
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
              <div
                className="modal-body"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  backgroundColor: "#ffffff",
                  color: "#212529",
                }}
              >
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
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
