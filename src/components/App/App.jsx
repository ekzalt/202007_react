import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ProductList, ProductForm } from '../index';
import './App.css';

/**
 * @param {{ productService }} props
 */
const App = ({ productService }) => {
  const [state, setState] = useState({
    products: [],
    total: 0,
    selected: 0,
  });

  // useEffect instead of componentDidMount and componentDidUpdate
  useEffect(
    () => {
      productService.getProducts()
        .then((products) => setState({
          products,
          total: productService.calculateTotalPrice(products),
          selected: productService.calculateSelectedPrice(products),
        }));
    },
    [productService],
  );

  /*
  const addProduct = (product) => {
    productService.addProduct(state.products, product)
      .then((products) => setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  };
  */

  const addProduct = useCallback(
    (product) => {
      productService.addProduct(state.products, product)
        .then((products) => setState({
          products,
          total: productService.calculateTotalPrice(products),
          selected: productService.calculateSelectedPrice(products),
        }));
    },
    [productService, state],
  );

  /*
  const deleteProduct = (id) => {
    productService.deleteProduct(state.products, id)
      .then((products) => setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  };
  */

  const deleteProduct = useCallback(
    (id) => {
      productService.deleteProduct(state.products, id)
        .then((products) => setState({
          products,
          total: productService.calculateTotalPrice(products),
          selected: productService.calculateSelectedPrice(products),
        }));
    },
    [productService, state],
  );

  /*
  const deleteSelectedProducts = () => {
    if (!state.products.some(({ selected }) => selected)) {
      return;
    }

    productService.deleteSelectedProducts(state.products)
      .then((products) => setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  };
  */

  const deleteSelectedProducts = useCallback(
    () => {
      if (!state.products.some(({ selected }) => selected)) {
        return;
      }

      productService.deleteSelectedProducts(state.products)
        .then((products) => setState({
          products,
          total: productService.calculateTotalPrice(products),
          selected: productService.calculateSelectedPrice(products),
        }));
    },
    [productService, state],
  );

  /*
  const updateProduct = (product) => {
    productService.updateProduct(state.products, product)
      .then((products) => setState({
        products,
        total: productService.calculateTotalPrice(products),
        selected: productService.calculateSelectedPrice(products),
      }));
  };
  */

  const updateProduct = useCallback(
    (product) => {
      productService.updateProduct(state.products, product)
        .then((products) => setState({
          products,
          total: productService.calculateTotalPrice(products),
          selected: productService.calculateSelectedPrice(products),
        }));
    },
    [productService, state],
  );

  return (
    <main>
      <ProductList
        products={state.products}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct} />
      <button
        className="product-form-button"
        onClick={deleteSelectedProducts}>
        Delete Selected
        </button>
      <p className="total-price">
        Total price: {state.total}, selected price: {state.selected}
      </p>
      <ProductForm addProduct={addProduct} />
    </main>
  );
};

App.propTypes = {
  productService: PropTypes.instanceOf(Function).isRequired,
};

export default App;
