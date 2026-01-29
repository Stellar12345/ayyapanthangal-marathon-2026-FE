import { apiRequest } from "../utils/apiClient";

/**
 * Create a new race registration.
 * Token (if present in localStorage as "authToken") is automatically
 * added as a Bearer token in the Authorization header.
 */
export function createRegistration(payload) {
  return apiRequest("/registrations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Create a Razorpay order for a registration.
 * Expects payload: { registrationId: string, amount: string | number }
 */
export function createPaymentOrder(payload) {
  return apiRequest("/payment/order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Get payment status for a registration
 * @param {string} registrationId - Registration ID from create registration response
 */
export function getPaymentStatus(registrationId) {
  return apiRequest(`/payment/payment-status/${registrationId}`, {
    method: "GET",
  });
}

/**
 * Get registration by ID (public endpoint)
 * @param {string} registrationId - Registration ID
 */
export function getRegistrationById(registrationId) {
  return apiRequest(`/registrations/${registrationId}`, {
    method: "GET",
  });
}

/**
 * Verify Razorpay payment and confirm registration.
 * Backend expects snake_case Razorpay fields.
 * @param {Object} razorpayResponse - Razorpay payment response
 * @param {string} registrationId - Registration ID to verify
 */
export function verifyPayment(razorpayResponse, registrationId) {
  const payload = {
    razorpay_order_id:
      razorpayResponse.razorpay_order_id || razorpayResponse.razorpayOrderId,
    razorpay_payment_id:
      razorpayResponse.razorpay_payment_id || razorpayResponse.razorpayPaymentId,
    razorpay_signature:
      razorpayResponse.razorpay_signature || razorpayResponse.signature,
    registrationId: registrationId,
  };

  // If registrationId is provided, send it as a query parameter
  const url = registrationId 
    ? `/payment/verify?registrationId=${encodeURIComponent(registrationId)}`
    : "/payment/verify";

  return apiRequest(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

