import { Transaction } from '../models';
import HttpService from './HttpService';

export default class TransactionService {
  constructor() {
    this.http = HttpService;
    this.url = 'http://localhost:8080/transactions';
  }

  /**
   * @param {string} token
   * @returns {Promise<{ data:Transaction[], error:Error }>}
   */
  async getTransactions(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(this.url, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('TransactionService.getTransactions', res);

    return res && res.data.transactions
      ? { data: res.data.transactions, error: null }
      : { data: [], error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {string} id
   * @returns {Promise<{ data:Transaction, error:Error }>}
   */
  async getTransactionById(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(`${this.url}/${id}`, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('TransactionService.getTransactionById', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @param {Transaction} tx
   * @returns {Promise<{ data:Transaction, error:Error }>}
   */
  async addTransaction(token, tx) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const body = {
      toys: tx.toys.map(t => ({ id: t.id, quantity: t.quantity })),
      type: tx.type,
    };
    let res;
    let err;

    try {
      res = await this.http.post(this.url, body, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('TransactionService.addTransaction', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }
}
