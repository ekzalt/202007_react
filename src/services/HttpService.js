import axios, { AxiosRequestConfig } from 'axios';

export default class HttpService {
  /**
   * @param {string} url
   * @param {AxiosRequestConfig=} config
   */
  static get(url, config) {
    return axios.get(url, config);
  }

  /**
   * @param {string} url
   * @param {Object=} data
   * @param {AxiosRequestConfig=} config
   */
  static post(url, data, config) {
    return axios.post(url, data, config);
  }

  /**
   * @param {string} url
   * @param {Object=} data
   * @param {AxiosRequestConfig=} config
   */
  static put(url, data, config) {
    return axios.put(url, data, config);
  }

  /**
   * @param {string} url
   * @param {Object=} data
   * @param {AxiosRequestConfig=} config
   */
  static patch(url, data, config) {
    return axios.patch(url, data, config);
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig=} config
   */
  static delete(url, config) {
    return axios.delete(url, config);
  }
}
