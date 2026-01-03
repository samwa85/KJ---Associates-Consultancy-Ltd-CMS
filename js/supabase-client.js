/**
 * Supabase Client for KJ & Associates CMS
 * Direct connection to Supabase without Node.js backend
 */

// Supabase configuration
const SUPABASE_CONFIG = {
  // These will be set via meta tags or config
  url: null,
  anonKey: null
};

// Initialize from meta tags or defaults
(function() {
  const metaUrl = document.querySelector('meta[name="supabase-url"]')?.content;
  const metaKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;
  
  SUPABASE_CONFIG.url = metaUrl || window.SUPABASE_URL || 'http://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io';
  SUPABASE_CONFIG.anonKey = metaKey || window.SUPABASE_ANON_KEY || '';
  
  console.log('[Supabase] URL:', SUPABASE_CONFIG.url);
})();

// Supabase client wrapper
const SupabaseClient = {
  client: null,
  
  // Initialize the client
  init() {
    if (!window.supabase) {
      console.error('[Supabase] Supabase JS library not loaded');
      return false;
    }
    
    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
      console.error('[Supabase] Missing URL or anon key');
      return false;
    }
    
    this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('[Supabase] Client initialized');
    return true;
  },
  
  // Check if connected
  isConnected() {
    return this.client !== null;
  },

  // =====================================================
  // AUTH
  // =====================================================
  auth: {
    async signUp(email, password, metadata = {}) {
      const { data, error } = await SupabaseClient.client.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      if (error) throw error;
      return data;
    },
    
    async signIn(email, password) {
      const { data, error } = await SupabaseClient.client.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    },
    
    async signOut() {
      const { error } = await SupabaseClient.client.auth.signOut();
      if (error) throw error;
    },
    
    async getUser() {
      const { data: { user }, error } = await SupabaseClient.client.auth.getUser();
      if (error) throw error;
      return user;
    },
    
    async getSession() {
      const { data: { session }, error } = await SupabaseClient.client.auth.getSession();
      if (error) throw error;
      return session;
    },
    
    onAuthStateChange(callback) {
      return SupabaseClient.client.auth.onAuthStateChange(callback);
    }
  },

  // =====================================================
  // GENERIC CRUD
  // =====================================================
  async getAll(table, options = {}) {
    let query = SupabaseClient.client.from(table).select('*');
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? true });
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  
  async getById(table, id) {
    const { data, error } = await SupabaseClient.client
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  
  async create(table, record) {
    const { data, error } = await SupabaseClient.client
      .from(table)
      .insert(record)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async update(table, id, updates) {
    const { data, error } = await SupabaseClient.client
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async delete(table, id) {
    const { error } = await SupabaseClient.client
      .from(table)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },
  
  async upsert(table, record) {
    const { data, error } = await SupabaseClient.client
      .from(table)
      .upsert(record)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // =====================================================
  // STORAGE (for images)
  // =====================================================
  storage: {
    async upload(bucket, path, file) {
      const { data, error } = await SupabaseClient.client.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });
      if (error) throw error;
      return data;
    },
    
    async getPublicUrl(bucket, path) {
      const { data } = SupabaseClient.client.storage
        .from(bucket)
        .getPublicUrl(path);
      return data.publicUrl;
    },
    
    async delete(bucket, paths) {
      const { error } = await SupabaseClient.client.storage
        .from(bucket)
        .remove(Array.isArray(paths) ? paths : [paths]);
      if (error) throw error;
      return true;
    },
    
    async list(bucket, folder = '') {
      const { data, error } = await SupabaseClient.client.storage
        .from(bucket)
        .list(folder);
      if (error) throw error;
      return data;
    }
  },

  // =====================================================
  // SPECIFIC TABLE HELPERS
  // =====================================================
  
  // Projects
  projects: {
    async getAll() { return SupabaseClient.getAll('projects', { orderBy: 'created_at', ascending: false }); },
    async getFeatured() { return SupabaseClient.getAll('projects', { filter: { featured: true } }); },
    async getById(id) { return SupabaseClient.getById('projects', id); },
    async create(data) { return SupabaseClient.create('projects', data); },
    async update(id, data) { return SupabaseClient.update('projects', id, data); },
    async delete(id) { return SupabaseClient.delete('projects', id); }
  },
  
  // Team
  team: {
    async getAll() { return SupabaseClient.getAll('team_members', { orderBy: 'display_order' }); },
    async getById(id) { return SupabaseClient.getById('team_members', id); },
    async create(data) { return SupabaseClient.create('team_members', data); },
    async update(id, data) { return SupabaseClient.update('team_members', id, data); },
    async delete(id) { return SupabaseClient.delete('team_members', id); }
  },
  
  // Board
  board: {
    async getAll() { return SupabaseClient.getAll('board_members', { orderBy: 'display_order' }); },
    async getById(id) { return SupabaseClient.getById('board_members', id); },
    async create(data) { return SupabaseClient.create('board_members', data); },
    async update(id, data) { return SupabaseClient.update('board_members', id, data); },
    async delete(id) { return SupabaseClient.delete('board_members', id); }
  },
  
  // Clients
  clients: {
    async getAll() { return SupabaseClient.getAll('clients', { orderBy: 'display_order' }); },
    async getById(id) { return SupabaseClient.getById('clients', id); },
    async create(data) { return SupabaseClient.create('clients', data); },
    async update(id, data) { return SupabaseClient.update('clients', id, data); },
    async delete(id) { return SupabaseClient.delete('clients', id); }
  },
  
  // Testimonials
  testimonials: {
    async getAll() { return SupabaseClient.getAll('testimonials', { orderBy: 'created_at', ascending: false }); },
    async getById(id) { return SupabaseClient.getById('testimonials', id); },
    async create(data) { return SupabaseClient.create('testimonials', data); },
    async update(id, data) { return SupabaseClient.update('testimonials', id, data); },
    async delete(id) { return SupabaseClient.delete('testimonials', id); }
  },
  
  // Slides
  slides: {
    async getAll() { return SupabaseClient.getAll('slides', { orderBy: 'display_order' }); },
    async getActive() { return SupabaseClient.getAll('slides', { filter: { active: true }, orderBy: 'display_order' }); },
    async getById(id) { return SupabaseClient.getById('slides', id); },
    async create(data) { return SupabaseClient.create('slides', data); },
    async update(id, data) { return SupabaseClient.update('slides', id, data); },
    async delete(id) { return SupabaseClient.delete('slides', id); }
  },
  
  // Services
  services: {
    async getAll() { return SupabaseClient.getAll('services', { orderBy: 'display_order' }); },
    async getById(id) { return SupabaseClient.getById('services', id); },
    async create(data) { return SupabaseClient.create('services', data); },
    async update(id, data) { return SupabaseClient.update('services', id, data); },
    async delete(id) { return SupabaseClient.delete('services', id); }
  },
  
  // Blog
  blog: {
    async getAll() { return SupabaseClient.getAll('blog_posts', { orderBy: 'created_at', ascending: false }); },
    async getPublished() { return SupabaseClient.getAll('blog_posts', { filter: { published: true }, orderBy: 'created_at', ascending: false }); },
    async getById(id) { return SupabaseClient.getById('blog_posts', id); },
    async getBySlug(slug) {
      const { data, error } = await SupabaseClient.client
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
    async create(data) { return SupabaseClient.create('blog_posts', data); },
    async update(id, data) { return SupabaseClient.update('blog_posts', id, data); },
    async delete(id) { return SupabaseClient.delete('blog_posts', id); }
  },
  
  // Certifications
  certifications: {
    async getAll() { return SupabaseClient.getAll('certifications', { orderBy: 'display_order' }); },
    async getById(id) { return SupabaseClient.getById('certifications', id); },
    async create(data) { return SupabaseClient.create('certifications', data); },
    async update(id, data) { return SupabaseClient.update('certifications', id, data); },
    async delete(id) { return SupabaseClient.delete('certifications', id); }
  },
  
  // Settings (single row table)
  settings: {
    async get() {
      const { data, error } = await SupabaseClient.client
        .from('settings')
        .select('*')
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      return data;
    },
    async update(updates) {
      // Upsert settings (id=1 is the default settings row)
      const { data, error } = await SupabaseClient.client
        .from('settings')
        .upsert({ id: 1, ...updates })
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  }
};

// Export for use
window.SupabaseClient = SupabaseClient;

