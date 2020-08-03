import React from 'react';

import { ProductList, ProductForm } from '../index';
import './App.css';

class App extends React.Component {
  state = {
    products: [],
    total: 0,
    selected: 0,
  };

  componentDidMount() {
    const { productService } = this.props;

    productService
      .getProducts()
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  }

  addProduct = data => {
    const { productService } = this.props;

    productService
      .addProduct(this.state.products, data)
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
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
        selected: productService.calculateSelectedPrice(products),
      }));
  };

  deleteSelectedProducts = () => {
    const { productService } = this.props;

    productService
      .deleteSelectedProducts(this.state.products)
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  };

  /**
   * @param {string} id
   */
  updateProduct = (product) => {
    const { productService } = this.props;
    const { products } = this.state;

    productService
      .updateProduct(products, product)
      .then(products => this.setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  };

  render() {
    const { products, total, selected } = this.state;

    return (
      <main>
        <ProductList
          products={products}
          deleteProduct={this.deleteProduct}
          updateProduct={this.updateProduct}/>
        <button
          className="product-form-button"
          onClick={this.deleteSelectedProducts}>
          Delete Selected
        </button>
        <p className="total-price">
          Total price: {total}, selected price: {selected}
        </p>
        <ProductForm addProduct={this.addProduct} />
      </main>
    );
  }
}

export default App;
