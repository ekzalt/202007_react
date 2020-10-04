import { TransactionActionType } from '../constants';
import { Transaction } from '../../models';

/**
 * @typedef ITransactionState
 * @property {Transaction[]} list
 * @property {Error=} error
 */

/** @type {ITransactionState} */
const initialState = {
  list: [],
  error: null,
};

/**
 * @param {ITransactionState} state
 * @param {{ type:string, payload:* }} action
 */
const transactionReducer = (state = initialState, action) => {
  console.log('transactionReducer state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    // events
    case TransactionActionType.TRANSACTIONS_RECEIVED:
      return {
        ...state,
        list: payload,
        error: null,
      };
    case TransactionActionType.TRANSACTIONS_NOT_RECEIVED:
    case TransactionActionType.TRANSACTION_NOT_RECEIVED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
