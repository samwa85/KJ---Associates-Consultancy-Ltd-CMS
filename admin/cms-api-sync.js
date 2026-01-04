/**
 * CMS API Sync Layer
 * Handles synchronization between CMS admin and the backend API
 * Falls back to localStorage if API is unavailable
 */

const CMSSync = {
  // Check if API is available
  apiAvailable: false,
  syncInProgress: false,
  
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
        console.log('[CMSSync] API connected successfully');
        return true;
      }
    } catch (error) {
      console.warn('[CMSSync] API not available, using localStorage fallback:', error.message);
    }
    
    this.apiAvailable = false;
    return false;
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
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.slides.create(this.transformToAPI(slide, 'slide'));
        return { success: true, data: response.data };
      } else {
        const response = await API.slides.update(slide.id, this.transformToAPI(slide, 'slide'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save slide:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveProject(project, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.projects.create(this.transformToAPI(project, 'project'));
        return { success: true, data: response.data };
      } else {
        const response = await API.projects.update(project.id, this.transformToAPI(project, 'project'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save project:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveTeamMember(member, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.team.create(this.transformToAPI(member, 'team'));
        return { success: true, data: response.data };
      } else {
        const response = await API.team.update(member.id, this.transformToAPI(member, 'team'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save team member:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveBoardMember(member, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.board.create(this.transformToAPI(member, 'board'));
        return { success: true, data: response.data };
      } else {
        const response = await API.board.update(member.id, this.transformToAPI(member, 'board'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save board member:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveClient(client, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.clients.create(this.transformToAPI(client, 'client'));
        return { success: true, data: response.data };
      } else {
        const response = await API.clients.update(client.id, this.transformToAPI(client, 'client'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save client:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveTestimonial(testimonial, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.testimonials.create(this.transformToAPI(testimonial, 'testimonial'));
        return { success: true, data: response.data };
      } else {
        const response = await API.testimonials.update(testimonial.id, this.transformToAPI(testimonial, 'testimonial'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save testimonial:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveCertification(cert, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.certifications.create(this.transformToAPI(cert, 'certification'));
        return { success: true, data: response.data };
      } else {
        const response = await API.certifications.update(cert.id, this.transformToAPI(cert, 'certification'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save certification:', error);
      return { success: false, error: error.message };
    }
  },
  
  async saveBlogPost(post, isNew = false) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      if (isNew) {
        const response = await API.blog.create(this.transformToAPI(post, 'blog'));
        return { success: true, data: response.data };
      } else {
        const response = await API.blog.update(post.id, this.transformToAPI(post, 'blog'));
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save blog post:', error);
      return { success: false, error: error.message };
    }
  },
  
  // =====================================================
  // DELETE ITEMS
  // =====================================================
  
  async deleteItem(type, id) {
    if (!this.apiAvailable) {
      return { success: true, local: true };
    }
    
    try {
      switch (type) {
        case 'slides':
          await API.slides.delete(id);
          break;
        case 'projects':
          await API.projects.delete(id);
          break;
        case 'team':
          await API.team.delete(id);
          break;
        case 'board':
          await API.board.delete(id);
          break;
        case 'clients':
          await API.clients.delete(id);
          break;
        case 'testimonials':
          await API.testimonials.delete(id);
          break;
        case 'certifications':
          await API.certifications.delete(id);
          break;
        default:
          console.warn('[CMSSync] Unknown type for delete:', type);
          return { success: false, error: 'Unknown type' };
      }
      return { success: true };
    } catch (error) {
      console.error(`[CMSSync] Failed to delete ${type}:`, error);
      return { success: false, error: error.message };
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
      // Skip id for new items (API will generate)
      if (key === 'id' && !value) continue;
      
      // Convert camelCase to snake_case
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      transformed[snakeKey] = value;
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

