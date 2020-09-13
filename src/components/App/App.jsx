import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { Product } from '../../models';
import { productsActions } from '../../store/actions';
import { ProductList, ProductForm } from '../index';
import './App.css';

/**
 * @typedef IProductsState
 * @property {Product[]} list
 * @property {number} total
 * @property {number} selected
 */

const App = () => {
  const dispatch = useDispatch();
  /** @type {IProductsState} */
  const products = useSelector((state) => state.products, shallowEqual);
  const { list, total, selected, loading } = products;

  // useEffect instead of componentDidMount and componentDidUpdate
  useEffect(
    () => {
      dispatch(productsActions.getProducts());
    },
    [dispatch],
  );

  const deleteSelectedProducts = useCallback(
    () => {
      if (!list.some((product) => product.selected)) {
        return;
      }

      dispatch(productsActions.deleteSelectedProducts(list));
    },
    [list, dispatch],
  );

  return (
    <main>
      <p className="total-price">{loading ? 'loading...' : 'loaded'}</p>
      <ProductList />
      <button
        className="product-form-button"
        onClick={deleteSelectedProducts}>
        Delete Selected
        </button>
      <p className="total-price">
        Total price: {total}, selected price: {selected}
      </p>
      <ProductForm />
    </main>
  );
};

export default App;
