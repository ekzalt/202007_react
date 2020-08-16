import { mockProducts } from '../../models';
import { ProductService } from '../../services';
import { ProductActionType } from '../constants';

/**
 * @typedef IProductsState
 * @property {Product[]} list
 * @property {number} total
 * @property {number} selected
 */

/** @type {IProductsState} */
const initialProductsState = {
  list: mockProducts,
  total: ProductService.calculateTotalPrice(mockProducts),
  selected: ProductService.calculateSelectedPrice(mockProducts),
};

/**
 * @param {IProductsState} state
 * @param {{ type:string, payload:Product }} action
 */
const productsReducer = (state = initialProductsState, action) => {
  console.log('productsReducer: state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    case ProductActionType.ADD_PRODUCT:
      {
        const list = ProductService.addProduct(state.list, payload);

        return {
          ...state,
          list,
          total: ProductService.calculateTotalPrice(list),
          selected: ProductService.calculateSelectedPrice(list),
        };
      }
    case ProductActionType.DELETE_PRODUCT:
      {
        const list = ProductService.deleteProduct(state.list, payload.id);

        return {
          ...state,
          list,
          total: ProductService.calculateTotalPrice(list),
          selected: ProductService.calculateSelectedPrice(list),
        };
      }
    case ProductActionType.DELETE_SELECTED_PRODUCTS:
      {
        const list = ProductService.deleteSelectedProducts(state.list);

        return {
          ...state,
          list,
          total: ProductService.calculateTotalPrice(list),
          selected: ProductService.calculateSelectedPrice(list),
        };
      }
    case ProductActionType.UPDATE_PRODUCT:
      {
        const list = ProductService.updateProduct(state.list, payload);

        return {
          ...state,
          list,
          total: ProductService.calculateTotalPrice(list),
          selected: ProductService.calculateSelectedPrice(list),
        };
      }
    default:
      return state;
  }
};

export default productsReducer;
