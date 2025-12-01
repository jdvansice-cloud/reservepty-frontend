/**
 * ReservePTY API Service
 * Handles all API calls to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || '';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      this.setToken(null);
      window.location.reload();
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setToken(data.token);
    return data;
  }

  async register(name, email, password) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    this.setToken(data.token);
    return data;
  }

  async getMe() {
    return this.request('/api/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // Assets
  async getAssets() {
    return this.request('/api/assets');
  }

  async getAsset(id) {
    return this.request(`/api/assets/${id}`);
  }

  // Reservations
  async getReservations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/reservations${query ? `?${query}` : ''}`);
  }

  async getMyReservations() {
    return this.request('/api/reservations/mine');
  }

  async createReservation(data) {
    return this.request('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async cancelReservation(id) {
    return this.request(`/api/reservations/${id}/cancel`, {
      method: 'PATCH'
    });
  }

  // Calendar
  async getCalendarEvents(start, end, assetId = null) {
    const params = { start, end };
    if (assetId) params.assetId = assetId;
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/calendar?${query}`);
  }

  // Stats
  async getStats() {
    return this.request('/api/stats');
  }

  // Reference data
  async getAirports() {
    return this.request('/api/airports');
  }

  async getPorts() {
    return this.request('/api/ports');
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }
}

export const api = new ApiService();
export default api;
