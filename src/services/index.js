import { v4 as uuidv4 } from 'uuid';

import { Product } from '../models';

const mockProducts = [
  new Product({
    id: uuidv4(),
    name: 'Milk',
    description: 'Lactose-free',
    price: 10,
  }),
  new Product({
    id: uuidv4(),
    name: 'Eggs',
    description: 'White',
    price: 15,
  }),
  new Product({
    id: uuidv4(),
    name: 'Beef',
    description: 'Barbecue',
    price: 140,
  }),
];

export class ProductService {
  /**
   * @returns {Promise<Product[]>}
   */
  static async getProducts() {
    return [...mockProducts];
  }

  /**
   * @param {Product[]} products
   * @param {Product} productData
   * @returns {Promise<Product[]>}
   */
  static async addProduct(products, productData) {
    const product = new Product({
      id: uuidv4(),
      ...productData,
    });

    return [...products, product];
  }

  /**
   * @param {Product[]} products
   * @param {string} id
   * @returns {Promise<Product[]>}
   */
  static async deleteProduct(products, id) {
    return products.filter(product => product.id !== id);
  }

  /**
   * @param {Product[]} products
   * @returns {number>}
   */
  static calculateTotalPrice(products) {
    return products.reduce((total, { price }) => total + price, 0);
  }
}
