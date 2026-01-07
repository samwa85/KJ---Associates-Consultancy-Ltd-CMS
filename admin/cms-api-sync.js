/**
 * CMS API Sync Layer
 * Handles synchronization between CMS admin and the backend API
 * Falls back to localStorage if API is unavailable
 */

const CMSSync = {
  // Check if API is available
  apiAvailable: false,
  syncInProgress: false,
  isAuthenticated: false,

  // Initialize sync layer
  async init() {
    // Check if API client exists and is configured
    if (typeof API === 'undefined') {
      console.warn('[CMSSync] API client not loaded, using localStorage only');
      return false;
    }

    // Test API connectivity
    try {
      const response = await fetch(`${API.baseURL.replace('/api', '')}/health`, {
        method: 'GET',
        timeout: 5000
      });
      if (response.ok) {
        this.apiAvailable = true;
        // Check if we have a token
        this.isAuthenticated = !!API.token;
        if (!this.isAuthenticated) {
          console.warn('[CMSSync] API available but not authenticated. CRUD operations will fail.');
        } else {
          console.log('[CMSSync] API connected and authenticated');
        }
        return true;
      }
    } catch (error) {
      console.warn('[CMSSync] API not available, using localStorage fallback:', error.message);
    }

    this.apiAvailable = false;
    this.isAuthenticated = false;
    return false;
  },

  // Check authentication before making write requests
  checkAuth() {
    if (!this.apiAvailable) {
      return { available: false, authenticated: false };
    }
    const hasToken = !!API.token;
    this.isAuthenticated = hasToken;
    return { available: true, authenticated: hasToken };
  },

  // =====================================================
  // LOAD DATA FROM API
  // =====================================================

  async loadAll() {
    if (!this.apiAvailable) {
      return this.loadFromLocalStorage();
    }

    try {
      const [
        slidesRes,
        projectsRes,
        teamRes,
        boardRes,
        clientsRes,
        testimonialsRes,
        servicesRes,
        blogRes,
        certificationsRes,
        settingsRes
      ] = await Promise.all([
        API.slides.getAll().catch(() => ({ data: [] })),
        API.projects.getAll().catch(() => ({ data: [] })),
        API.team.getAll().catch(() => ({ data: [] })),
        API.board.getAll().catch(() => ({ data: [] })),
        API.clients.getAll().catch(() => ({ data: [] })),
        API.testimonials.getAll().catch(() => ({ data: [] })),
        API.services.getAll().catch(() => ({ data: [] })),
        API.blog.getAll().catch(() => ({ data: [] })),
        API.certifications.getAll().catch(() => ({ data: [] })),
        API.settings.getAll().catch(() => ({ data: {} }))
      ]);

      const data = {
        slides: slidesRes.data || [],
        projects: projectsRes.data || [],
        team: teamRes.data || [],
        board: boardRes.data || [],
        clients: clientsRes.data || [],
        testimonials: testimonialsRes.data || [],
        services: servicesRes.data || [],
        blog: blogRes.data || [],
        certifications: certificationsRes.data || [],
        branding: settingsRes.data?.branding || CMS.defaults.branding,
        contact: settingsRes.data?.contact || CMS.defaults.contact,
        seo: settingsRes.data?.seo || CMS.defaults.seo,
        theme: settingsRes.data?.theme || CMS.defaults.theme
      };

      // Also save to localStorage as backup
      localStorage.setItem('kj_cms_data', JSON.stringify(data));

      console.log('[CMSSync] Data loaded from API');
      return data;
    } catch (error) {
      console.error('[CMSSync] Failed to load from API:', error);
      return this.loadFromLocalStorage();
    }
  },

  loadFromLocalStorage() {
    const stored = localStorage.getItem('kj_cms_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('[CMSSync] Failed to parse localStorage data');
      }
    }
    return null;
  },

  // =====================================================
  // SAVE INDIVIDUAL ITEMS
  // =====================================================

  async saveSlide(slide, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(slide, 'slide');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.slides.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.slides.update(slide.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save slide:', error);
      return { success: false, error: error.message || 'Failed to save slide' };
    }
  },

  async saveProject(project, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(project, 'project');
      
      if (isNew) {
        // Don't send ID for new items - let database generate it
        delete transformed.id;
        const response = await API.projects.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.projects.update(project.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save project:', error);
      const errorMsg = error.message || 'Failed to save project';
      return { success: false, error: errorMsg };
    }
  },

  async saveTeamMember(member, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(member, 'team');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.team.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.team.update(member.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save team member:', error);
      return { success: false, error: error.message || 'Failed to save team member' };
    }
  },

  async saveBoardMember(member, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(member, 'board');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.board.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.board.update(member.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save board member:', error);
      return { success: false, error: error.message || 'Failed to save board member' };
    }
  },

  async saveClient(client, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(client, 'client');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.clients.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.clients.update(client.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save client:', error);
      return { success: false, error: error.message || 'Failed to save client' };
    }
  },

  async saveTestimonial(testimonial, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(testimonial, 'testimonial');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.testimonials.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.testimonials.update(testimonial.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save testimonial:', error);
      return { success: false, error: error.message || 'Failed to save testimonial' };
    }
  },

  async saveCertification(cert, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(cert, 'certification');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.certifications.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.certifications.update(cert.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save certification:', error);
      return { success: false, error: error.message || 'Failed to save certification' };
    }
  },

  async saveBlogPost(post, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      const transformed = this.transformToAPI(post, 'blog');
      
      if (isNew) {
        delete transformed.id;
        const response = await API.blog.create(transformed);
        return { success: true, data: response.data };
      } else {
        const response = await API.blog.update(post.id, transformed);
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save blog post:', error);
      return { success: false, error: error.message || 'Failed to save blog post' };
    }
  },

  // =====================================================
  // DELETE ITEMS
  // =====================================================

  async deleteItem(type, id) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) {
      return { success: true, local: true };
    }
    if (!authCheck.authenticated) {
      return { success: false, error: 'Not authenticated. Please refresh the page and log in again.' };
    }

    try {
      // Map frontend collection names to API endpoints
      const endpointMap = {
        'slides': 'slides',
        'projects': 'projects',
        'team': 'team',
        'board': 'board',
        'clients': 'clients',
        'testimonials': 'testimonials',
        'services': 'services',
        'blog': 'blog',
        'certifications': 'certifications'
      };

      const endpoint = endpointMap[type];
      if (!endpoint) {
        throw new Error(`Unknown collection type: ${type}`);
      }

      // Use proper API endpoint with authentication
      await API[endpoint].delete(id);
      console.log(`[CMSSync] Deleted ${type}/${id} from database`);
      return { success: true };
    } catch (error) {
      console.error(`[CMSSync] Failed to delete ${type}:`, error);
      return { success: false, error: error.message || `Failed to delete ${type}` };
    }
  },

  // =====================================================
  // SETTINGS
  // =====================================================

  async saveBranding(branding) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }

    try {
      await API.settings.updateBranding(branding);
      return { success: true };
    } catch (error) {
      console.error('[CMSSync] Failed to save branding:', error);
      return { success: false, error: error.message };
    }
  },

  async saveContact(contact) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }

    try {
      await API.settings.updateContact(contact);
      return { success: true };
    } catch (error) {
      console.error('[CMSSync] Failed to save contact:', error);
      return { success: false, error: error.message };
    }
  },

  async saveSEO(seo) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }

    try {
      await API.settings.updateSEO(seo);
      return { success: true };
    } catch (error) {
      console.error('[CMSSync] Failed to save SEO:', error);
      return { success: false, error: error.message };
    }
  },

  async saveTheme(theme) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }

    try {
      await API.settings.updateTheme(theme);
      return { success: true };
    } catch (error) {
      console.error('[CMSSync] Failed to save theme:', error);
      return { success: false, error: error.message };
    }
  },

  // =====================================================
  // DATA TRANSFORMATION
  // =====================================================

  // Transform frontend data format to API format (camelCase to snake_case)
  transformToAPI(data, type) {
    const transformed = {};

    for (const [key, value] of Object.entries(data)) {
      // Skip internal metadata fields
      if (key.startsWith('_')) continue;
      
      // Skip id for new items (handled by caller)
      if (key === 'id' && !value) continue;

      // Convert camelCase to snake_case
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      
      // Handle nested objects and arrays
      if (Array.isArray(value)) {
        // Transform array items if they're objects
        transformed[snakeKey] = value.map(item => {
          if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
            // For images array, extract just the path or data
            if (key === 'images' && item.path) {
              return item.path || item.data || item;
            }
            // Recursively transform nested objects
            return this.transformToAPI(item, type);
          }
          return item;
        });
      } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        // Recursively transform nested objects
        transformed[snakeKey] = this.transformToAPI(value, type);
      } else {
        transformed[snakeKey] = value;
      }
    }

    // Special handling for projects - convert images array to string array
    if (type === 'project' && transformed.images && Array.isArray(transformed.images)) {
      transformed.images = transformed.images.map(img => {
        if (typeof img === 'object' && img !== null) {
          return img.path || img.data || img;
        }
        return img;
      }).filter(Boolean);
    }

    return transformed;
  },

  // Transform API data format to frontend format (snake_case to camelCase)
  transformFromAPI(data) {
    if (Array.isArray(data)) {
      return data.map(item => this.transformFromAPI(item));
    }

    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const transformed = {};

    for (const [key, value] of Object.entries(data)) {
      // Convert snake_case to camelCase
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      transformed[camelKey] = value;
    }

    return transformed;
  }
};

// CMSSync.init() is now called explicitly by CMS.init() to ensure proper order
// Do not auto-initialize here to avoid race conditions

