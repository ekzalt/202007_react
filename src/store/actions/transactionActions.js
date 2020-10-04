import { TransactionActionType, MainActionType } from '../constants';
import { Transaction } from '../../models';
import { TransactionService } from '../../services';
import { tokenExpired, authService } from './authActions';

export const transactionService = new TransactionService();

// events

/**
 * @param {Transaction[]} transactions
 */
export const transactionsReceived = (transactions) => ({
  type: TransactionActionType.TRANSACTIONS_RECEIVED,
  payload: transactions,
});

/**
 * @param {Error} error
 */
export const transactionsNotReceived = (error) => ({
  type: TransactionActionType.TRANSACTIONS_NOT_RECEIVED,
  payload: error,
});

export const transactionsLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

/**
 * @param {Transaction} transaction
 */
export const transactionReceived = (transaction) => ({
  type: TransactionActionType.TRANSACTION_RECEIVED,
  payload: transaction,
});

/**
 * @param {Error} error
 */
export const transactionNotReceived = (error) => ({
  type: TransactionActionType.TRANSACTION_NOT_RECEIVED,
  payload: error,
});

export const transactionLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

// actions

//

// thunk actions

/**
 * @param {string} token
 */
export const getTransactions = (token) => (dispatch, getState) => {
  dispatch(transactionsLoading());

  return transactionService
    .getTransactions(token)
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(transactionsNotReceived(error));
        return;
      }

      dispatch(transactionsReceived(data));
    });
};

/**
 * @param {string} token
 * @param {string} id
 */
export const getTransactionById = (token, id) => (dispatch, getState) => {
  dispatch(transactionLoading());

  return transactionService
    .getTransactionById(token, id)
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(transactionNotReceived(error));
        return;
      }

      dispatch(transactionReceived(data));
    });
};

/**
 * @param {string} token
 * @param {Transaction} tx
 */
export const addTransaction = (token, tx) => (dispatch, getState) => {
  dispatch(transactionLoading());

  return transactionService
    .addTransaction(token, tx)
    .then(() => transactionService.getTransactions(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(transactionsNotReceived(error));
        return;
      }

      dispatch(transactionsReceived(data));
    });
};
