/**
 * CMS API Sync Layer
 * Handles synchronization between CMS admin and Supabase
 * Falls back to localStorage if Supabase is unavailable
 */

const CMSSync = {
  // Check if API (Supabase) is available
  apiAvailable: false,
  syncInProgress: false,
  isAuthenticated: false,


  // Update UI Status Indicator
  updateStatus(state) {
    const indicator = document.getElementById('db-status-indicator');
    if (!indicator) return;

    if (state === 'connected') {
      indicator.className = 'px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 bg-green-100 text-green-700 border border-green-200';
      indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-green-500"></span>Database Connected';
      indicator.title = 'Connected to Supabase';
    } else if (state === 'offline') {
      indicator.className = 'px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 bg-red-100 text-red-700 border border-red-200';
      indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-red-500"></span>Offline Mode';
      indicator.title = 'Using Local Storage (Changes saved locally only)';
    } else {
      indicator.className = 'px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 bg-gray-100 text-gray-500 border border-gray-200';
      indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-gray-400"></span>Connecting...';
    }
  },

  // Initialize sync layer
  async init() {
    this.updateStatus('connecting');

    // Check if Supabase client exists and is initialized
    if (typeof SupabaseClient === 'undefined') {
      console.warn('[CMSSync] Supabase client not loaded, using localStorage only');
      this.updateStatus('offline');
      return false;
    }

    // Initialize Supabase
    const initialized = SupabaseClient.init();

    if (initialized) {
      this.apiAvailable = true;
      // Check session
      const session = await SupabaseClient.auth.getSession().catch(() => null);
      this.isAuthenticated = !!session;

      if (this.isAuthenticated) {
        console.log('[CMSSync] Supabase connected and authenticated');
        this.updateStatus('connected');
      } else {
        console.log('[CMSSync] Supabase connected but not authenticated');
        this.updateStatus('offline'); // Treat unauthenticated as offline for admin purposes
      }
      return true;
    } else {
      console.warn('[CMSSync] Supabase initialization failed, using localStorage fallback');
      this.apiAvailable = false;
      this.updateStatus('offline');
      return false;
    }
  },

  // Check authentication before making write requests
  checkAuth() {
    if (!this.apiAvailable) {
      return { available: false, authenticated: false };
    }
    // Re-check authentication state
    return { available: true, authenticated: this.isAuthenticated };
  },

  // =====================================================
  // LOAD DATA FROM SUPABASE
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
        SupabaseClient.slides.getAll().catch(() => []),
        SupabaseClient.projects.getAll().catch(() => []),
        SupabaseClient.team.getAll().catch(() => []),
        SupabaseClient.board.getAll().catch(() => []),
        SupabaseClient.clients.getAll().catch(() => []),
        SupabaseClient.testimonials.getAll().catch(() => []),
        SupabaseClient.services.getAll().catch(() => []),
        SupabaseClient.blog.getAll().catch(() => []),
        SupabaseClient.certifications ? SupabaseClient.certifications.getAll().catch(() => []) : Promise.resolve([]),
        SupabaseClient.settings.get().catch(() => ({}))
      ]);

      const data = {
        slides: slidesRes || [],
        projects: projectsRes || [],
        team: teamRes || [],
        board: boardRes || [],
        clients: clientsRes || [],
        testimonials: testimonialsRes || [],
        services: servicesRes || [],
        blog: blogRes || [],
        certifications: certificationsRes || [],

        // Settings mapping
        branding: {
          logoType: 'image',
          logoText: settingsRes?.site_title || CMS.defaults.branding.logoText,
          logoSubtitle: CMS.defaults.branding.logoSubtitle,
          logoImageUrl: settingsRes?.logo_url || CMS.defaults.branding.logoImageUrl,
          faviconUrl: settingsRes?.favicon_url || CMS.defaults.branding.faviconUrl,
          ...settingsRes
        },
        contact: {
          email: settingsRes?.contact_email || CMS.defaults.contact.email,
          phone: settingsRes?.contact_phone || CMS.defaults.contact.phone,
          address: settingsRes?.contact_address || CMS.defaults.contact.address,
          ...settingsRes
        },
        seo: {
          title: settingsRes?.site_title || CMS.defaults.seo.title,
          description: settingsRes?.site_description || CMS.defaults.seo.description,
          keywords: settingsRes?.site_keywords || CMS.defaults.seo.keywords,
          ogImage: settingsRes?.og_image_url || CMS.defaults.seo.ogImage
        },
        theme: settingsRes?.theme || CMS.defaults.theme
      };

      // Also save to localStorage as backup
      localStorage.setItem('kj_cms_data', JSON.stringify(data));

      console.log('[CMSSync] Data loaded from Supabase');
      return data;
    } catch (error) {
      console.error('[CMSSync] Failed to load from Supabase:', error);
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

    try {
      const transformed = this.transformToAPI(slide, 'slide');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.slides.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.slides.update(slide.id, transformed);
        return { success: true, data };
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

    try {
      const transformed = this.transformToAPI(project, 'project');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.projects.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.projects.update(project.id, transformed);
        return { success: true, data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save project:', error);
      return { success: false, error: error.message || 'Failed to save project' };
    }
  },

  async saveTeamMember(member, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) return { success: true, local: true };

    try {
      const transformed = this.transformToAPI(member, 'team');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.team.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.team.update(member.id, transformed);
        return { success: true, data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save team member:', error);
      return { success: false, error: error.message || 'Failed to save team member' };
    }
  },

  async saveBoardMember(member, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) return { success: true, local: true };

    try {
      const transformed = this.transformToAPI(member, 'board');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.board.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.board.update(member.id, transformed);
        return { success: true, data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save board member:', error);
      return { success: false, error: error.message || 'Failed to save board member' };
    }
  },

  async saveClient(client, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) return { success: true, local: true };

    try {
      const transformed = this.transformToAPI(client, 'client');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.clients.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.clients.update(client.id, transformed);
        return { success: true, data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save client:', error);
      return { success: false, error: error.message || 'Failed to save client' };
    }
  },

  async saveTestimonial(testimonial, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) return { success: true, local: true };

    try {
      const transformed = this.transformToAPI(testimonial, 'testimonial');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.testimonials.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.testimonials.update(testimonial.id, transformed);
        return { success: true, data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save testimonial:', error);
      return { success: false, error: error.message || 'Failed to save testimonial' };
    }
  },

  async saveCertification(cert, isNew = false) {
    // Check if method exists (might not be implemented in SupabaseClient yet)
    if (!SupabaseClient.certifications) return { success: true, local: true };

    const authCheck = this.checkAuth();
    if (!authCheck.available) return { success: true, local: true };

    try {
      const transformed = this.transformToAPI(cert, 'certification');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.certifications.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.certifications.update(cert.id, transformed);
        return { success: true, data };
      }
    } catch (error) {
      console.error('[CMSSync] Failed to save certification:', error);
      return { success: false, error: error.message || 'Failed to save certification' };
    }
  },

  async saveBlogPost(post, isNew = false) {
    const authCheck = this.checkAuth();
    if (!authCheck.available) return { success: true, local: true };

    try {
      const transformed = this.transformToAPI(post, 'blog');

      if (isNew) {
        delete transformed.id;
        const data = await SupabaseClient.blog.create(transformed);
        return { success: true, data };
      } else {
        const data = await SupabaseClient.blog.update(post.id, transformed);
        return { success: true, data };
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
    if (!authCheck.available) return { success: true, local: true };

    try {
      // Map frontend types to SupabaseClient properties
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
      if (!endpoint || !SupabaseClient[endpoint]) {
        console.warn(`[CMSSync] No endpoint found for ${type}`);
        return { success: true, local: true };
      }

      await SupabaseClient[endpoint].delete(id);
      console.log(`[CMSSync] Deleted ${type}/${id} from Supabase`);
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
    if (!this.apiAvailable) return { success: true, local: true };
    try {
      // Map branding fields to settings table columns
      const settingsData = {
        site_title: branding.logoText,
        logo_url: branding.logoImageUrl,
        favicon_url: branding.faviconUrl
      };
      await SupabaseClient.settings.update(settingsData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async saveContact(contact) {
    if (!this.apiAvailable) return { success: true, local: true };
    try {
      const settingsData = {
        contact_email: contact.email,
        contact_phone: contact.phone,
        contact_address: contact.address
      };
      await SupabaseClient.settings.update(settingsData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async saveSEO(seo) {
    if (!this.apiAvailable) return { success: true, local: true };
    try {
      const settingsData = {
        site_title: seo.title,
        site_description: seo.description,
        site_keywords: seo.keywords,
        og_image_url: seo.ogImage
      };
      await SupabaseClient.settings.update(settingsData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async saveTheme(theme) {
    if (!this.apiAvailable) return { success: true, local: true };
    try {
      await SupabaseClient.settings.update({ theme });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // =====================================================
  // DATA TRANSFORMATION
  // =====================================================

  // Transform frontend data format to Supabase format (camelCase to snake_case)
  transformToAPI(data, type) {
    const transformed = {};

    for (const [key, value] of Object.entries(data)) {
      // Skip internal metadata fields
      if (key.startsWith('_')) continue;

      // Skip id for new items (handled by caller)
      if (key === 'id' && !value) continue;

      // Convert camelCase to snake_case
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      // CRITICAL: Preserve base64 image data as-is
      if (typeof value === 'string' && value.startsWith('data:image/')) {
        transformed[snakeKey] = value;
        continue;
      }

      // Handle nested objects and arrays
      if (Array.isArray(value)) {
        // Transform array items if they're objects
        transformed[snakeKey] = value.map(item => {
          // Preserve base64 in arrays too
          if (typeof item === 'string' && item.startsWith('data:image/')) {
            return item;
          }
          if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
            // For images array, keep as is effectively, or recurs
            // But specifically for projects images array, we want clean data
            return item.path || item.data || item;
          }
          return item;
        });
      } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        // Basic recursion? For now let's just keep as is for complex objects 
        // unless specific mapping needed.
        // Supabase often expects JSONB for complex fields.
        transformed[snakeKey] = value;
      } else {
        transformed[snakeKey] = value;
      }
    }

    // Special handlers
    if (type === 'project') {
      if (transformed.images && Array.isArray(transformed.images)) {
        // Ensure it's just paths/urls or base64
        transformed.images = transformed.images.map(img => {
          if (typeof img === 'string' && img.startsWith('data:image/')) {
            return img; // Preserve base64
          }
          return (typeof img === 'object' ? (img.path || img.data) : img);
        }).filter(Boolean);
      }
    }

    return transformed;
  },

  // Transform Supabase data format to frontend format (snake_case to camelCase)
  transformFromAPI(data) {
    if (Array.isArray(data)) return data.map(i => this.transformFromAPI(i));
    if (typeof data !== 'object' || data === null) return data;

    const transformed = {};
    for (const [key, value] of Object.entries(data)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      transformed[camelKey] = value;
    }
    return transformed;
  }
};
