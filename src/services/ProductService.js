import { Product } from '../models';
import HttpService from './HttpService';

export default class ProductService {
  constructor() {
    this.http = HttpService;
    this.url = 'http://localhost:8080/products';
  }

  /**
   * @returns {Promise<Product[]>}
   */
  async getProducts() {
    const res = await this.http.get(this.url);
    console.log('ProductService.getProducts', res);

    return res.data.products;
  }

  /**
   * @param {Product} product
   * @returns {Promise<Product>}
   */
  async addProduct(product) {
    const res = await this.http.post(this.url, product);
    console.log('ProductService.addProduct', res);

    return res.data;
  }

  /**
   * @param {Product} product
   * @returns {Promise<Product>}
   */
  async deleteProduct(product) {
    const res = await this.http.delete(`${this.url}/${product.id}`);
    console.log('ProductService.deleteProduct', res);

    return res.data;
  }

  /**
   * @param {Product} product
   * @returns {Promise<Product>}
   */
  async updateProduct(product) {
    const data = {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
    };
    const res = await this.http.patch(`${this.url}/${product.id}`, data);
    console.log('ProductService.updateProduct', res);

    return res.data;
  }

  /**
   * @param {Product[]} products
   * @param {Product} productData
   * @returns {Product[]}
   */
  static modifyProduct(products, productData) {
    const product = new Product(productData);

    return products.map((item) => (item.id === product.id ? product : item));
  }

  /**
   * @param {Product[]} products
   * @returns {number>}
   */
  static calculateTotalPrice(products) {
    return products.reduce((total, { price }) => total + price, 0);
  }

  /**
   * @param {Product[]} products
   * @returns {number>}
   */
  static calculateSelectedPrice(products) {
    return products
      .filter(({ selected }) => selected)
      .reduce((total, { price }) => total + price, 0);
  }
}
