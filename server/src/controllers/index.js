/**
 * Controllers Index
 * Export all controller instances
 */

const BaseController = require('./baseController');
const {
  slidesService,
  projectsService,
  teamService,
  boardService,
  clientsService,
  testimonialsService,
  servicesService,
  blogService,
  certificationsService,
  settingsService
} = require('../services');

// Slides Controller
class SlidesController extends BaseController {
  constructor() {
    super(slidesService, 'Slide');
  }

  getActive = async (req, res, next) => {
    try {
      const result = await this.service.getActive();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Projects Controller
class ProjectsController extends BaseController {
  constructor() {
    super(projectsService, 'Project');
  }

  getFeatured = async (req, res, next) => {
    try {
      const result = await this.service.getFeatured();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getByStatus = async (req, res, next) => {
    try {
      const { status } = req.params;
      const result = await this.service.getByStatus(status);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getBySector = async (req, res, next) => {
    try {
      const { sector } = req.params;
      const result = await this.service.getBySector(sector);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Team Controller
class TeamController extends BaseController {
  constructor() {
    super(teamService, 'Team Member');
  }

  getByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const result = await this.service.getByCategory(category);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getLeadership = async (req, res, next) => {
    try {
      const result = await this.service.getLeadership();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getTechnical = async (req, res, next) => {
    try {
      const result = await this.service.getTechnical();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Board Controller
class BoardController extends BaseController {
  constructor() {
    super(boardService, 'Board Member');
  }

  getChairman = async (req, res, next) => {
    try {
      const data = await this.service.getChairman();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}

// Clients Controller
class ClientsController extends BaseController {
  constructor() {
    super(clientsService, 'Client');
  }

  getByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const result = await this.service.getByCategory(category);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Testimonials Controller
class TestimonialsController extends BaseController {
  constructor() {
    super(testimonialsService, 'Testimonial');
  }

  getPublished = async (req, res, next) => {
    try {
      const result = await this.service.getPublished();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Services Controller
class ServicesController extends BaseController {
  constructor() {
    super(servicesService, 'Service');
  }

  getByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const result = await this.service.getByCategory(category);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Blog Controller
class BlogController extends BaseController {
  constructor() {
    super(blogService, 'Blog Post');
  }

  getPublished = async (req, res, next) => {
    try {
      const result = await this.service.getPublished();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getFeatured = async (req, res, next) => {
    try {
      const result = await this.service.getFeatured();
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  getBySlug = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await this.service.getBySlug(slug);
      
      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Blog post not found'
        });
      }
      
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const result = await this.service.getByCategory(category);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Certifications Controller
class CertificationsController extends BaseController {
  constructor() {
    super(certificationsService, 'Certification');
  }

  getByCategory = async (req, res, next) => {
    try {
      const { category } = req.params;
      const result = await this.service.getByCategory(category);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
}

// Settings Controller
class SettingsController {
  getBranding = async (req, res, next) => {
    try {
      const data = await settingsService.getBranding();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateBranding = async (req, res, next) => {
    try {
      const data = await settingsService.updateSetting('branding', req.body);
      res.json({ success: true, message: 'Branding updated successfully', data });
    } catch (error) {
      next(error);
    }
  };

  getContact = async (req, res, next) => {
    try {
      const data = await settingsService.getContact();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateContact = async (req, res, next) => {
    try {
      const data = await settingsService.updateSetting('contact', req.body);
      res.json({ success: true, message: 'Contact info updated successfully', data });
    } catch (error) {
      next(error);
    }
  };

  getSEO = async (req, res, next) => {
    try {
      const data = await settingsService.getSEO();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateSEO = async (req, res, next) => {
    try {
      const data = await settingsService.updateSetting('seo', req.body);
      res.json({ success: true, message: 'SEO settings updated successfully', data });
    } catch (error) {
      next(error);
    }
  };

  getTheme = async (req, res, next) => {
    try {
      const data = await settingsService.getTheme();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateTheme = async (req, res, next) => {
    try {
      const { theme } = req.body;
      const data = await settingsService.updateSetting('theme', theme);
      res.json({ success: true, message: 'Theme updated successfully', data });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const [branding, contact, seo, theme] = await Promise.all([
        settingsService.getBranding(),
        settingsService.getContact(),
        settingsService.getSEO(),
        settingsService.getTheme()
      ]);
      
      res.json({
        success: true,
        data: { branding, contact, seo, theme }
      });
    } catch (error) {
      next(error);
    }
  };
}

// Export controller instances
module.exports = {
  slidesController: new SlidesController(),
  projectsController: new ProjectsController(),
  teamController: new TeamController(),
  boardController: new BoardController(),
  clientsController: new ClientsController(),
  testimonialsController: new TestimonialsController(),
  servicesController: new ServicesController(),
  blogController: new BlogController(),
  certificationsController: new CertificationsController(),
  settingsController: new SettingsController()
};

