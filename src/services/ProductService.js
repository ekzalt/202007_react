import { v4 as uuidv4 } from 'uuid';

import { Product, Category } from '../models';

const mockProducts = [
  new Product({
    id: uuidv4(),
    name: 'CocaCola',
    category: Category.Drinks,
    description: '2 liters',
    price: 50,
  }),
  new Product({
    id: uuidv4(),
    name: 'Tomatoes',
    category: Category.Vegetables,
    description: 'Cherry',
    price: 40,
  }),
  new Product({
    id: uuidv4(),
    name: 'Beef',
    category: Category.MeatAndMilk,
    description: '1 kilogram for barbecue',
    price: 140,
  }),
];

export default class ProductService {
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
    return products.filter((product) => product.id !== id);
  }

  /**
   * @param {Product[]} products
   * @returns {Promise<Product[]>}
   */
  static async deleteSelectedProducts(products) {
    return products.filter((product) => !product.selected);
  }

  /**
   * @param {Product[]} products
   * @param {Product} product
   * @returns {Promise<Product[]>}
   */
  static async updateProduct(products, productData) {
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
