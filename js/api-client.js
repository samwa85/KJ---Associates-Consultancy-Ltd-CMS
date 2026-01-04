/**
 * KJ & Associates CMS API Client
 * Frontend JavaScript client for interacting with the Node.js backend
 */

const API = {
  // Configuration
  baseURL: window.API_CONFIG?.apiBaseUrl || window.API_BASE_URL || 'http://localhost:3001/api',
  token: null,

  // Initialize API client
  init(config = {}) {
    if (config.baseURL) this.baseURL = config.baseURL;
    this.token = localStorage.getItem('cms_token') || null;
    return this;
  },

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('cms_token', token);
    } else {
      localStorage.removeItem('cms_token');
    }
  },

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  },

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  },

  // HTTP methods
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  },

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  // =====================================================
  // AUTH ENDPOINTS
  // =====================================================
  auth: {
    async signIn(email, password) {
      const response = await API.post('/auth/signin', { email, password });
      if (response.success && response.data.session) {
        API.setToken(response.data.session.access_token);
      }
      return response;
    },

    async signOut() {
      const response = await API.post('/auth/signout', {});
      API.setToken(null);
      return response;
    },

    async getCurrentUser() {
      return API.get('/auth/me');
    },

    async refreshToken(refreshToken) {
      const response = await API.post('/auth/refresh', { refresh_token: refreshToken });
      if (response.success && response.data.access_token) {
        API.setToken(response.data.access_token);
      }
      return response;
    },

    async forgotPassword(email) {
      return API.post('/auth/forgot-password', { email });
    },

    async updatePassword(password) {
      return API.post('/auth/update-password', { password });
    }
  },

  // =====================================================
  // SLIDES ENDPOINTS
  // =====================================================
  slides: {
    async getAll(params = {}) {
      return API.get('/slides', params);
    },

    async getActive() {
      return API.get('/slides/active');
    },

    async getById(id) {
      return API.get(`/slides/${id}`);
    },

    async create(data) {
      return API.post('/slides', data);
    },

    async update(id, data) {
      return API.put(`/slides/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/slides/${id}`);
    }
  },

  // =====================================================
  // PROJECTS ENDPOINTS
  // =====================================================
  projects: {
    async getAll(params = {}) {
      return API.get('/projects', params);
    },

    async getFeatured() {
      return API.get('/projects/featured');
    },

    async getByStatus(status) {
      return API.get(`/projects/status/${status}`);
    },

    async getBySector(sector) {
      return API.get(`/projects/sector/${sector}`);
    },

    async getById(id) {
      return API.get(`/projects/${id}`);
    },

    async create(data) {
      return API.post('/projects', data);
    },

    async update(id, data) {
      return API.put(`/projects/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/projects/${id}`);
    }
  },

  // =====================================================
  // TEAM ENDPOINTS
  // =====================================================
  team: {
    async getAll(params = {}) {
      return API.get('/team', params);
    },

    async getLeadership() {
      return API.get('/team/leadership');
    },

    async getTechnical() {
      return API.get('/team/technical');
    },

    async getByCategory(category) {
      return API.get(`/team/category/${category}`);
    },

    async getById(id) {
      return API.get(`/team/${id}`);
    },

    async create(data) {
      return API.post('/team', data);
    },

    async update(id, data) {
      return API.put(`/team/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/team/${id}`);
    }
  },

  // =====================================================
  // BOARD ENDPOINTS
  // =====================================================
  board: {
    async getAll(params = {}) {
      return API.get('/board', params);
    },

    async getChairman() {
      return API.get('/board/chairman');
    },

    async getById(id) {
      return API.get(`/board/${id}`);
    },

    async create(data) {
      return API.post('/board', data);
    },

    async update(id, data) {
      return API.put(`/board/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/board/${id}`);
    }
  },

  // =====================================================
  // CLIENTS ENDPOINTS
  // =====================================================
  clients: {
    async getAll(params = {}) {
      return API.get('/clients', params);
    },

    async getByCategory(category) {
      return API.get(`/clients/category/${category}`);
    },

    async getById(id) {
      return API.get(`/clients/${id}`);
    },

    async create(data) {
      return API.post('/clients', data);
    },

    async update(id, data) {
      return API.put(`/clients/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/clients/${id}`);
    }
  },

  // =====================================================
  // TESTIMONIALS ENDPOINTS
  // =====================================================
  testimonials: {
    async getAll(params = {}) {
      return API.get('/testimonials', params);
    },

    async getPublished() {
      return API.get('/testimonials/published');
    },

    async getById(id) {
      return API.get(`/testimonials/${id}`);
    },

    async create(data) {
      return API.post('/testimonials', data);
    },

    async update(id, data) {
      return API.put(`/testimonials/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/testimonials/${id}`);
    }
  },

  // =====================================================
  // SERVICES ENDPOINTS
  // =====================================================
  services: {
    async getAll(params = {}) {
      return API.get('/services', params);
    },

    async getByCategory(category) {
      return API.get(`/services/category/${category}`);
    },

    async getById(id) {
      return API.get(`/services/${id}`);
    },

    async create(data) {
      return API.post('/services', data);
    },

    async update(id, data) {
      return API.put(`/services/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/services/${id}`);
    }
  },

  // =====================================================
  // BLOG ENDPOINTS
  // =====================================================
  blog: {
    async getAll(params = {}) {
      return API.get('/blog', params);
    },

    async getPublished(params = {}) {
      return API.get('/blog/published', params);
    },

    async getFeatured() {
      return API.get('/blog/featured');
    },

    async getBySlug(slug) {
      return API.get(`/blog/slug/${slug}`);
    },

    async getByCategory(category) {
      return API.get(`/blog/category/${category}`);
    },

    async getById(id) {
      return API.get(`/blog/${id}`);
    },

    async create(data) {
      return API.post('/blog', data);
    },

    async update(id, data) {
      return API.put(`/blog/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/blog/${id}`);
    }
  },

  // =====================================================
  // CERTIFICATIONS ENDPOINTS
  // =====================================================
  certifications: {
    async getAll(params = {}) {
      return API.get('/certifications', params);
    },

    async getByCategory(category) {
      return API.get(`/certifications/category/${category}`);
    },

    async getById(id) {
      return API.get(`/certifications/${id}`);
    },

    async create(data) {
      return API.post('/certifications', data);
    },

    async update(id, data) {
      return API.put(`/certifications/${id}`, data);
    },

    async delete(id) {
      return API.delete(`/certifications/${id}`);
    }
  },

  // =====================================================
  // SETTINGS ENDPOINTS
  // =====================================================
  settings: {
    async getAll() {
      return API.get('/settings');
    },

    async getBranding() {
      return API.get('/settings/branding');
    },

    async updateBranding(data) {
      return API.put('/settings/branding', data);
    },

    async getContact() {
      return API.get('/settings/contact');
    },

    async updateContact(data) {
      return API.put('/settings/contact', data);
    },

    async getSEO() {
      return API.get('/settings/seo');
    },

    async updateSEO(data) {
      return API.put('/settings/seo', data);
    },

    async getTheme() {
      return API.get('/settings/theme');
    },

    async updateTheme(theme) {
      return API.put('/settings/theme', { theme });
    }
  },

  // =====================================================
  // FILE UPLOAD
  // =====================================================
  upload: {
    async uploadFile(file, category = 'general') {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API.baseURL}/upload/${category}`, {
        method: 'POST',
        headers: {
          'Authorization': API.token ? `Bearer ${API.token}` : ''
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      return data;
    },

    async uploadMultiple(files, category = 'general') {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await fetch(`${API.baseURL}/upload/${category}/multiple`, {
        method: 'POST',
        headers: {
          'Authorization': API.token ? `Bearer ${API.token}` : ''
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      return data;
    },

    async deleteFile(category, filename) {
      return API.delete(`/upload/${category}/${filename}`);
    }
  }
};

// Initialize on load
API.init();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
}

