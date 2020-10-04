import { Toy } from '../models';
import HttpService from './HttpService';

export default class ToyService {
  constructor() {
    this.http = HttpService;
    this.url = 'http://localhost:8080/toys';
  }

  /**
   * @param {string} token
   * @returns {Promise<{ data:Toy[], error:Error }>}
   */
  async getToys(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(this.url, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('ToyService.getToys', res);

    return res && res.data.toys
      ? { data: res.data.toys, error: null }
      : { data: [], error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {string} id
   * @returns {Promise<{ data:Toy, error:Error }>}
   */
  async getToyById(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(`${this.url}/${id}`, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('ToyService.getToyById', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {Toy} toy
   * @returns {Promise<{ data:Toy, error:Error }>}
   */
  async addToy(token, toy) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const body = {
      id: toy.id,
      name: toy.name,
      quantity: 0,
      price: toy.price,
      totalCost: toy.totalCost,
      description: toy.description,
      categoryId: toy.category.id,
    };
    let res;
    let err;

    try {
      res = await this.http.post(this.url, body, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('ToyService.addToy', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {string} id
   * @returns {Promise<{ data:Toy, error:Error }>}
   */
  async deleteToy(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.delete(`${this.url}/${id}`, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('ToyService.deleteToy', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {Toy} toy
   * @returns {Promise<{ data:Toy, error:Error }>}
   */
  async replaceToy(token, toy) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const body = {
      id: toy.id,
      name: toy.name,
      price: toy.price,
      totalCost: toy.totalCost,
      description: toy.description,
      categoryId: toy.category.id,
    };
    let res;
    let err;

    try {
      res = await this.http.put(`${this.url}/${toy.id}`, body, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('ToyService.replaceToy', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {Toy} toy
   * @returns {Promise<{ data:Toy, error:Error }>}
   */
  async updateToy(token, toy) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const body = {
      id: toy.id,
      name: toy.name,
      price: toy.price,
      totalCost: toy.totalCost,
      description: toy.description,
      categoryId: toy.category.id,
    };
    let res;
    let err;

    try {
      res = await this.http.patch(`${this.url}/${toy.id}`, body, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('ToyService.updateToy', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }
}
