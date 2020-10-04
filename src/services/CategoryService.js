import { Category } from '../models';
import HttpService from './HttpService';

export default class CategoryService {
  constructor() {
    this.http = HttpService;
    this.url = 'http://localhost:8080/categories';
  }

  /**
   * @param {string} token
   * @returns {Promise<{ data:Category[], error:Error }>}
   */
  async getCategories(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(this.url, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('CategoryService.getCategories', res);

    return res && res.data && res.data.categories
      ? { data: res.data.categories, error: null }
      : { data: [], error: err && err.response && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {string} id
   * @returns {Promise<{ data:Category, error:Error }>}
   */
  async getCategoryById(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(`${this.url}/${id}`, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('CategoryService.getCategoryById', res);

    return res && res.data && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {string} name
   * @returns {Promise<{ data:Category, error:Error }>}
   */
  async addCategory(token, name) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    let res;
    let err;

    try {
      res = await this.http.post(this.url, { name }, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('CategoryService.addCategory', res);

    return res && res.data && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {string} id
   * @returns {Promise<{ data:Category, error:Error }>}
   */
  async deleteCategory(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.delete(`${this.url}/${id}`, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('CategoryService.deleteCategory', res);

    return res && res.data && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {Category} category
   * @returns {Promise<{ data:Category, error:Error }>}
   */
  async replaceCategory(token, category) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    let res;
    let err;

    try {
      res = await this.http.put(`${this.url}/${category.id}`, category, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('CategoryService.replaceCategory', res);

    return res && res.data && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }
}
