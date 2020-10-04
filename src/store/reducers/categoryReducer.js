import { CategoryActionType } from '../constants';
import { Category } from '../../models';

/**
 * @typedef ICategoryState
 * @property {Category[]} list
 * @property {Error=} error
 */

/** @type {ICategoryState} */
const initialState = {
  list: [],
  error: null,
};

/**
 * @param {ICategoryState} state
 * @param {{ type:string, payload:* }} action
 */
const categoryReducer = (state = initialState, action) => {
  console.log('categoryReducer state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    // events
    case CategoryActionType.CATEGORIES_RECEIVED:
      return {
        ...state,
        list: payload,
        error: null,
      };
    case CategoryActionType.CATEGORIES_NOT_RECEIVED:
    case CategoryActionType.CATEGORY_NOT_RECEIVED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
