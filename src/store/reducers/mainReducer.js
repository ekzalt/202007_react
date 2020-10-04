import {
  MainActionType,
  AuthActionType,
  CategoryActionType,
  ToyActionType,
  TransactionActionType,
} from '../constants';

/**
 * @typedef IMainState
 * @property {boolean} loading
 */

/** @type {IMainState} */
const initialState = {
  loading: true,
};

/**
 * @param {IMainState} state
 * @param {{ type:string, payload:* }} action
 */
const mainReducer = (state = initialState, action) => {
  console.log('mainReducer state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    // events
    case MainActionType.LOADING:
      return {
        ...state,
        loading: true,
      };
    case AuthActionType.TOKEN_EXPIRED:
    case AuthActionType.TOKEN_RECEIVED:
    case AuthActionType.TOKEN_NOT_RECEIVED:
    case CategoryActionType.CATEGORIES_RECEIVED:
    case CategoryActionType.CATEGORIES_NOT_RECEIVED:
    case CategoryActionType.CATEGORY_RECEIVED:
    case CategoryActionType.CATEGORY_NOT_RECEIVED:
    case ToyActionType.TOYS_RECEIVED:
    case ToyActionType.TOYS_NOT_RECEIVED:
    case ToyActionType.TOY_RECEIVED:
    case ToyActionType.TOY_NOT_RECEIVED:
    case TransactionActionType.TRANSACTIONS_RECEIVED:
    case TransactionActionType.TRANSACTIONS_NOT_RECEIVED:
    case TransactionActionType.TRANSACTION_RECEIVED:
    case TransactionActionType.TRANSACTION_NOT_RECEIVED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default mainReducer;
