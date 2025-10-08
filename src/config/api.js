// Cấu hình API base URL
export const API_BASE_URL = "https://api.vqmn6623.com";

// Các endpoint API
export const API_ENDPOINTS = {
  // User endpoints
  CHECK_CODE: "/api/6623-reward/check-code",
  USE_CODE: "/api/6623-reward/use-code",
  PLUS_POINT: "/api/6623-reward/plus-poin",

  // Admin endpoints
  ADMIN_LOGIN: "/api/admin/6623-reward/login",
  ADMIN_CODES: "/api/admin/6623-reward/codes",
  ADMIN_REWARDS: "/api/admin/6623-reward/rewards",
  ADMIN_HISTORY: "/api/admin/6623-reward/history",
  ADMIN_REVERT_CODE: "/api/admin/6623-reward/revert-code",
};

// Helper function để tạo full URL
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
