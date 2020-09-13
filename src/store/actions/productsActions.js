import { ProductActionType } from '../constants';
import { Product } from '../../models';
import { ProductService } from '../../services';

const productService = new ProductService();

// events

/**
 * @param {Product[]} products
 */
export const productsReceived = (products = []) => ({
  type: ProductActionType.PRODUCTS_RECEIVED,
  payload: products,
});

export const productsNotReceived = () => ({
  type: ProductActionType.PRODUCTS_NOT_RECEIVED,
  payload: [],
});

export const productsLoading = () => ({
  type: ProductActionType.PRODUCTS_LOADING,
  payload: {},
});

// actions

/**
 * @param {Product} product
 */
export const modifyProduct = (product) => ({
  type: ProductActionType.MODIFY_PRODUCT,
  payload: product,
});

// thunk actions

export const getProducts = () => (dispatch, getState) => {
  dispatch(productsLoading());

  return productService
    .getProducts()
    .then((list) => {
      const products = list.map(p => new Product(p));
      dispatch(productsReceived(products));
    })
    .catch((error) => {
      console.error(error);
      dispatch(productsNotReceived());
    });
};

/**
 * @param {Product} product
 */
export const addProduct = (product) => (dispatch, getState) => {
  dispatch(productsLoading());

  return productService
    .addProduct(product)
    .then(() => dispatch(getProducts()))
    .catch((error) => {
      console.error(error);
      dispatch(productsNotReceived());
    });
};

/**
 * @param {Product} product
 */
export const deleteProduct = (product) => (dispatch, getState) => {
  dispatch(productsLoading());

  return productService
    .deleteProduct(product)
    .then(() => dispatch(getProducts()))
    .catch((error) => {
      console.error(error);
      dispatch(productsNotReceived());
    });
};

/**
 * @param {Product[]} products
 */
export const deleteSelectedProducts = (products) => (dispatch, getState) => {
  dispatch(productsLoading());

  const promises = products
    .filter(p => p.selected)
    .map(p => productService.deleteProduct(p));

  return Promise
    .all(promises)
    .then(() => dispatch(getProducts()))
    .catch((error) => {
      console.error(error);
      dispatch(productsNotReceived());
    });
};

/**
 * @param {Product} product
 */
export const updateProduct = (product) => (dispatch, getState) => {
  dispatch(productsLoading());

  return productService
    .updateProduct(product)
    .then(() => dispatch(getProducts()))
    .catch((error) => {
      console.error(error);
      dispatch(productsNotReceived());
    });
};
