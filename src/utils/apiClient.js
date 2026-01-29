// export const API_BASE_URL = "http://localhost:5000";
export const API_BASE_URL = "https://api.marathon.stellarsolutions.org";


export const getAuthToken = () => {
  try {
    return localStorage.getItem("authToken") || "";
  } catch {
    return "";
  }
};

export async function apiRequest(path, options = {}) {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await safeParseError(response);
    const error = new Error(errorData?.message || `Request failed with status ${response.status}`);
    // Preserve full error object for detailed error handling
    if (errorData) {
      error.error = errorData.error;
      error.message = errorData.message;
      error.statusCode = errorData.statusCode;
    }
    throw error;
  }

  return response.status === 204 ? null : await response.json();
}

async function safeParseError(response) {
  try {
    const data = await response.json();
    return data?.message || data?.error;
  } catch {
    return null;
  }
}

