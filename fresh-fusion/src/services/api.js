/**
 * API Service for Fresh Fusion
 * Handles API requests with CORS proxy for GitHub Pages
 */

// API Base URL
const API_BASE_URL = 'https://fresh-fusion-backend.onrender.com/api';

// Public CORS proxies
const CORS_PROXY = 'https://corsproxy.io/?';

/**
 * Fetch data from API with CORS proxy when needed
 * @param {string} endpoint - API endpoint (e.g., '/menu')
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - API response data
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    // Determine if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Use proxy for GitHub Pages, direct connection otherwise
    const url = isGitHubPages 
      ? `${CORS_PROXY}${encodeURIComponent(`${API_BASE_URL}${endpoint}`)}`
      : `${API_BASE_URL}${endpoint}`;
    
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
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
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
