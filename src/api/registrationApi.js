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
 * Verify Razorpay payment and confirm registration.
 * Backend expects snake_case Razorpay fields.
 */
export function verifyPayment(razorpayResponse) {
  const payload = {
    razorpay_order_id:
      razorpayResponse.razorpay_order_id || razorpayResponse.razorpayOrderId,
    razorpay_payment_id:
      razorpayResponse.razorpay_payment_id || razorpayResponse.razorpayPaymentId,
    razorpay_signature:
      razorpayResponse.razorpay_signature || razorpayResponse.signature,
  };

  return apiRequest("/payment/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

