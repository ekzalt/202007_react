import HttpService from './HttpService';

export default class AuthService {
  constructor() {
    this.http = HttpService;
    this.url = 'http://localhost:8080';
  }

  /**
   * @param {{ email:string, password:string }} creds
   * @returns {Promise<{ data:string, error:Error }>}
   */
  async login(creds) {
    const headers = { 'Content-Type': 'application/json' };
    let res;

    try {
      res = await this.http.post(`${this.url}/login`, creds, { headers });
    } catch (error) {
      console.error(error);
    }

    console.log('AuthService.login', res);

    return res && res.data.accessToken
      ? { data: res.data.accessToken, error: null }
      : { data: null, error: new Error('Incorrect email or password') };
  }

  /**
   * @param {string} token
   * @returns {Promise<{ data:string, error:Error }>}
   */
  async logout(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;

    try {
      res = await this.http.get(`${this.url}/logout`, { headers });
    } catch (error) {
      console.error(error);
    }

    console.log('AuthService.logout', res);

    return res && res.status === 200
      ? { data: 'success', error: null }
      : { data: null, error: new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @returns {Promise<{ data:{ id:string, email:string, password:string }, error:Error }>}
   */
  async getMyProfile(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    let res;
    let err;

    try {
      res = await this.http.get(`${this.url}/profile`, { headers });
    } catch (error) {
      err = error;
      console.error(error);
    }

    console.log('AuthService.getMyProfile', res);

    return res && res.data.id
      ? { data: res.data, error: null }
      : { data: null, error: err && err.response.status === 401 ? new Error('Token expired') : new Error('Something went wrong') };
  }

  /**
   * @param {string} token
   * @returns {Promise<boolean>}
   */
  async isTokenActive(token) {
    if (!token) {
      return false;
    }

    const result = await this.getMyProfile(token);
    console.log('AuthService.isTokenActive', result);

    if (result.data) {
      return Boolean(result.data);
    }

    return result.error.message !== 'Token expired';
  }

  /**
   * @param {string} token
   */
  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
