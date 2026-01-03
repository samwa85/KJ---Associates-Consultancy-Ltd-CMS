/**
 * Services Index
 * Export all service classes
 */

const BaseService = require('./baseService');

// Create service instances for each table
class SlidesService extends BaseService {
  constructor() {
    super('slides');
  }

  async getActive() {
    return this.getAll({
      filters: { active: true },
      orderBy: 'display_order',
      orderDirection: 'asc'
    });
  }
}

class ProjectsService extends BaseService {
  constructor() {
    super('projects');
  }

  async getFeatured() {
    return this.getAll({
      filters: { featured: true },
      orderBy: 'year',
      orderDirection: 'desc',
      limit: 6
    });
  }

  async getByStatus(status) {
    return this.getAll({
      filters: { status },
      orderBy: 'year',
      orderDirection: 'desc'
    });
  }

  async getBySector(sector) {
    return this.getAll({
      filters: { sector },
      orderBy: 'year',
      orderDirection: 'desc'
    });
  }
}

class TeamService extends BaseService {
  constructor() {
    super('team_members');
  }

  async getByCategory(category) {
    return this.getAll({
      filters: { category },
      orderBy: 'display_order',
      orderDirection: 'asc'
    });
  }

  async getLeadership() {
    return this.getByCategory('leadership');
  }

  async getTechnical() {
    return this.getByCategory('technical');
  }
}

class BoardService extends BaseService {
  constructor() {
    super('board_members');
  }

  async getChairman() {
    const result = await this.getAll({
      filters: { is_chairman: true }
    });
    return result.data?.[0] || null;
  }
}

class ClientsService extends BaseService {
  constructor() {
    super('clients');
  }

  async getByCategory(category) {
    return this.getAll({
      filters: { category },
      orderBy: 'name',
      orderDirection: 'asc'
    });
  }
}

class TestimonialsService extends BaseService {
  constructor() {
    super('testimonials');
  }

  async getPublished() {
    return this.getAll({
      filters: { published: true },
      orderBy: 'created_at',
      orderDirection: 'desc'
    });
  }
}

class ServicesService extends BaseService {
  constructor() {
    super('services');
  }

  async getByCategory(category) {
    return this.getAll({
      filters: { category },
      orderBy: 'display_order',
      orderDirection: 'asc'
    });
  }
}

class BlogService extends BaseService {
  constructor() {
    super('blog_posts');
  }

  async getPublished() {
    return this.getAll({
      filters: { published: true },
      orderBy: 'date',
      orderDirection: 'desc'
    });
  }

  async getFeatured() {
    return this.getAll({
      filters: { featured: true, published: true },
      orderBy: 'date',
      orderDirection: 'desc',
      limit: 3
    });
  }

  async getBySlug(slug) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async getByCategory(category) {
    return this.getAll({
      filters: { category, published: true },
      orderBy: 'date',
      orderDirection: 'desc'
    });
  }
}

class CertificationsService extends BaseService {
  constructor() {
    super('certifications');
  }

  async getByCategory(category) {
    return this.getAll({
      filters: { category },
      orderBy: 'title',
      orderDirection: 'asc'
    });
  }
}

class SettingsService extends BaseService {
  constructor() {
    super('settings');
  }

  async getBranding() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('value')
      .eq('key', 'branding')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.value || null;
  }

  async getContact() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('value')
      .eq('key', 'contact')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.value || null;
  }

  async getSEO() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('value')
      .eq('key', 'seo')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.value || null;
  }

  async getTheme() {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('value')
      .eq('key', 'theme')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.value || 'classic-green';
  }

  async updateSetting(key, value) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Export service instances
module.exports = {
  BaseService,
  slidesService: new SlidesService(),
  projectsService: new ProjectsService(),
  teamService: new TeamService(),
  boardService: new BoardService(),
  clientsService: new ClientsService(),
  testimonialsService: new TestimonialsService(),
  servicesService: new ServicesService(),
  blogService: new BlogService(),
  certificationsService: new CertificationsService(),
  settingsService: new SettingsService()
};

