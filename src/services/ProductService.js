import { v4 as uuidv4 } from 'uuid';

import { Product, mockProducts } from '../models';

export default class ProductService {
  /**
   * @returns {Product[]}
   */
  static getProducts() {
    return [...mockProducts];
  }

  /**
   * @param {Product[]} products
   * @param {Product} productData
   * @returns {Product[]}
   */
  static addProduct(products, productData) {
    const product = new Product({
      id: uuidv4(),
      ...productData,
    });

    return [...products, product];
  }

  /**
   * @param {Product[]} products
   * @param {string} id
   * @returns {Product[]}
   */
  static deleteProduct(products, id) {
    return products.filter((product) => product.id !== id);
  }

  /**
   * @param {Product[]} products
   * @returns {Product[]}
   */
  static deleteSelectedProducts(products) {
    return products.filter((product) => !product.selected);
  }

  /**
   * @param {Product[]} products
   * @param {Product} productData
   * @returns {Product[]}
   */
  static updateProduct(products, productData) {
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
