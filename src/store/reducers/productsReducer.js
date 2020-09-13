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
  list: [],
  total: 0,
  selected: 0,
  loading: false,
};

/**
 * @param {IProductsState} state
 * @param {{ type:string, payload:Product }} action
 */
const productsReducer = (state = initialProductsState, action) => {
  console.log('productsReducer state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    // actions
    case ProductActionType.MODIFY_PRODUCT:
      {
        const list = ProductService.modifyProduct(state.list, payload);

        return {
          ...state,
          list,
          total: ProductService.calculateTotalPrice(list),
          selected: ProductService.calculateSelectedPrice(list),
        };
      }
    // events
    case ProductActionType.PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ProductActionType.PRODUCTS_RECEIVED:
      return {
        ...state,
        list: payload,
        total: ProductService.calculateTotalPrice(payload),
        selected: ProductService.calculateSelectedPrice(payload),
        loading: false,
      };
    case ProductActionType.PRODUCTS_NOT_RECEIVED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default productsReducer;
