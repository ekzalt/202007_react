import React from 'react';

import { Product } from '../../models';
import { ProductList, ProductForm } from '../index';
import './App.css';

class App extends React.Component {
  state = {
    /** @type {Product[]} */
    products: [],
    total: 0,
  };

  componentDidMount() {
    const { productService } = this.props;

    productService
      .getProducts()
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
      }));
  }

  /**
   * @param {Product} data
   */
  addProduct = data => {
    const { productService } = this.props;

    productService
      .addProduct(this.state.products, data)
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
      }));
  };

  /**
   * @param {string} id
   */
  deleteProduct = id => {
    const { productService } = this.props;

    productService
      .deleteProduct(this.state.products, id)
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
      }));
  };

  render() {
    const { products, total } = this.state;

    return (
      <main>
        <ProductList products={products} deleteProduct={this.deleteProduct} />
        <p className="total-price">Total price: {total}</p>
        <ProductForm addProduct={this.addProduct} />
      </main>
    );
  }
}

export default App;
