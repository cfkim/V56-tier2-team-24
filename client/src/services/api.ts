const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Add auth token if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || 'An error occurred',
          message: data.message,
        };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: 'Network error. Please check your connection.',
      };
    }
  }

  // Password reset endpoints
  async forgotPassword(email: string) {
    return this.request('/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, email: string, password: string) {
    return this.request('/password/reset', {
      method: 'POST',
      body: JSON.stringify({ token, email, password }),
    });
  }

  async verifyResetToken(token: string, email: string) {
    return this.request('/password/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token, email }),
    });
  }

  // Auth endpoints (for future use)
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService; 