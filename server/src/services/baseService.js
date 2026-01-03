/**
 * Base Service Class
 * Provides common CRUD operations for Supabase tables
 */

const { supabase } = require('../config/supabase');

class BaseService {
  constructor(tableName) {
    this.tableName = tableName;
    this.supabase = supabase;
  }

  /**
   * Get all records with optional filtering, pagination, and sorting
   */
  async getAll(options = {}) {
    const {
      select = '*',
      filters = {},
      orderBy = 'created_at',
      orderDirection = 'desc',
      page = 1,
      limit = 50,
      search = null,
      searchFields = []
    } = options;

    let query = this.supabase
      .from(this.tableName)
      .select(select, { count: 'exact' });

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else if (typeof value === 'object' && value.operator) {
          // Handle special operators like gte, lte, etc.
          switch (value.operator) {
            case 'gte':
              query = query.gte(key, value.value);
              break;
            case 'lte':
              query = query.lte(key, value.value);
              break;
            case 'gt':
              query = query.gt(key, value.value);
              break;
            case 'lt':
              query = query.lt(key, value.value);
              break;
            case 'like':
              query = query.ilike(key, `%${value.value}%`);
              break;
            case 'neq':
              query = query.neq(key, value.value);
              break;
          }
        } else {
          query = query.eq(key, value);
        }
      }
    });

    // Apply search across multiple fields
    if (search && searchFields.length > 0) {
      const searchConditions = searchFields
        .map(field => `${field}.ilike.%${search}%`)
        .join(',');
      query = query.or(searchConditions);
    }

    // Apply ordering
    query = query.order(orderBy, { ascending: orderDirection === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Get a single record by ID
   */
  async getById(id, select = '*') {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(select)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  }

  /**
   * Create a new record
   */
  async create(data) {
    const { data: created, error } = await this.supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return created;
  }

  /**
   * Create multiple records
   */
  async createMany(records) {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  }

  /**
   * Update a record by ID
   */
  async update(id, data) {
    const { data: updated, error } = await this.supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  }

  /**
   * Delete a record by ID
   */
  async delete(id) {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }

  /**
   * Delete multiple records by IDs
   */
  async deleteMany(ids) {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .in('id', ids);

    if (error) throw error;
    return { success: true, count: ids.length };
  }

  /**
   * Upsert a record (insert or update)
   */
  async upsert(data, conflictColumn = 'id') {
    const { data: upserted, error } = await this.supabase
      .from(this.tableName)
      .upsert(data, { onConflict: conflictColumn })
      .select()
      .single();

    if (error) throw error;
    return upserted;
  }

  /**
   * Count records with optional filters
   */
  async count(filters = {}) {
    let query = this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true });

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });

    const { count, error } = await query;
    if (error) throw error;
    return count;
  }

  /**
   * Check if a record exists
   */
  async exists(filters) {
    const count = await this.count(filters);
    return count > 0;
  }
}

module.exports = BaseService;

