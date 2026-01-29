import { apiRequest } from "../utils/apiClient";

/**
 * Admin login
 */
export function adminLogin(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Get all registrations (admin only - requires token)
 * Supports optional filters:
 * paymentStatus, raceCategory, finalRegistration, state, city,
 * search, fromDate, toDate, page, limit
 */
export function getRegistrations(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const query = params.toString() ? `?${params.toString()}` : "";

  return apiRequest(`/registrations/admin${query}`, {
    method: "GET",
  });
}

/**
 * Get registration by ID
 * Uses public registration details endpoint so it includes referenceNumber, etc.
 */
export function getRegistrationById(id) {
  return apiRequest(`/registrations/${id}`, {
    method: "GET",
  });
}

/**
 * Get registration stats (admin only - requires token)
 * Response shape:
 * {
 *   "message": "Stats fetched successfully",
 *   "data": { "totalCount": number, "totalRevenue": number }
 * }
 */
export function getAdminStats() {
  return apiRequest("/registrations/admin/stats", {
    method: "GET",
  });
}