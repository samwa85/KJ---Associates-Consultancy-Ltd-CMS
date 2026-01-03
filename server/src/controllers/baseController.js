/**
 * Base Controller
 * Provides common CRUD controller methods
 */

class BaseController {
  constructor(service, resourceName) {
    this.service = service;
    this.resourceName = resourceName;
  }

  /**
   * Get all records
   */
  getAll = async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 50,
        orderBy,
        orderDirection,
        search,
        ...filters
      } = req.query;

      const result = await this.service.getAll({
        page: parseInt(page),
        limit: parseInt(limit),
        orderBy,
        orderDirection,
        search,
        filters
      });

      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get single record by ID
   */
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.getById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `${this.resourceName} not found`
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create new record
   */
  create = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      
      res.status(201).json({
        success: true,
        message: `${this.resourceName} created successfully`,
        data
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update record by ID
   */
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Check if exists
      const existing = await this.service.getById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `${this.resourceName} not found`
        });
      }

      const data = await this.service.update(id, req.body);
      
      res.json({
        success: true,
        message: `${this.resourceName} updated successfully`,
        data
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete record by ID
   */
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Check if exists
      const existing = await this.service.getById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `${this.resourceName} not found`
        });
      }

      await this.service.delete(id);
      
      res.json({
        success: true,
        message: `${this.resourceName} deleted successfully`
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete multiple records
   */
  deleteMany = async (req, res, next) => {
    try {
      const { ids } = req.body;
      
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Please provide an array of IDs to delete'
        });
      }

      await this.service.deleteMany(ids);
      
      res.json({
        success: true,
        message: `${ids.length} ${this.resourceName}(s) deleted successfully`
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = BaseController;

