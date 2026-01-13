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
 */
export function getRegistrations() {
  return apiRequest("/registrations/admin/list", {
    method: "GET",
  });
}

/**
 * Get registration by ID (admin only - requires token)
 */
export function getRegistrationById(id) {
  return apiRequest(`/registrations/admin/${id}`, {
    method: "GET",
  });
}
