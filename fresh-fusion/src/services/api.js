/**
 * API Service for Fresh Fusion
 * Handles API requests with CORS proxy for GitHub Pages
 */

// API Base URL
const API_BASE_URL = 'https://fresh-fusion-backend.onrender.com/api';

// Public CORS proxies
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://thingproxy.freeboard.io/fetch/'
];

/**
 * Fetch data from API with CORS proxy when needed
 * @param {string} endpoint - API endpoint (e.g., '/menu')
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - API response data
 */
export const fetchApi = async (endpoint, options = {}) => {
  // Determine if we're on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // If we're not on GitHub Pages, make a direct request
  if (!isGitHubPages) {
    return fetchDirect(`${API_BASE_URL}${endpoint}`, options);
  }
  
  // Try each proxy in order until one works
  let lastError = null;
  for (const proxy of CORS_PROXIES) {
    try {
      const url = `${proxy}${encodeURIComponent(`${API_BASE_URL}${endpoint}`)}`;
      console.log(`Trying proxy: ${proxy} for ${endpoint}`);
      return await fetchDirect(url, options);
    } catch (error) {
      console.warn(`Proxy ${proxy} failed:`, error);
      lastError = error;
      // Continue to next proxy
    }
  }
  
  // If all proxies fail, try a direct request as a last resort
  try {
    console.log("All proxies failed, attempting direct request");
    return await fetchDirect(`${API_BASE_URL}${endpoint}`, options);
  } catch (error) {
    console.error("All request methods failed:", error);
    throw lastError || error;
  }
};

/**
 * Basic fetch wrapper with error handling
 */
const fetchDirect = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return await response.json();
};

// API Methods
export const getMenu = () => fetchApi('/menu');
export const getMenuByCategory = (category) => fetchApi(`/menu/category/${category}`);
export const login = (credentials) => fetchApi('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials)
});
export const register = (userData) => fetchApi('/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData)
});
export const createOrder = (orderData) => fetchApi('/orders', {
  method: 'POST',
  body: JSON.stringify(orderData),
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
export const getUserOrders = () => fetchApi('/orders/user', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
