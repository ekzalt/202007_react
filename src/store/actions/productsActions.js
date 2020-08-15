import { ProductActionType } from '../constants';

/**
 * @param {Product} product
 */
export const addProduct = (product) => ({
  type: ProductActionType.ADD_PRODUCT,
  payload: product,
});

/**
 * @param {Product} product
 */
export const deleteProduct = (product) => ({
  type: ProductActionType.DELETE_PRODUCT,
  payload: product,
});

export const deleteSelectedProducts = () => ({
  type: ProductActionType.DELETE_SELECTED_PRODUCTS,
  payload: {},
});

/**
 * @param {Product} product
 */
export const updateProduct = (product) => ({
  type: ProductActionType.UPDATE_PRODUCT,
  payload: product,
});
