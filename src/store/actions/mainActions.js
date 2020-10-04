import { MainActionType } from '../constants';
import {
  authService,
  tokenExpired,
  tokenReceived,
} from './authActions';
import {
  categoryService,
  categoriesNotReceived,
  categoriesReceived,
} from './categoryActions';
import {
  toyService,
  toysNotReceived,
  toysReceived,
} from './toyActions';
import {
  transactionService,
  transactionsNotReceived,
  transactionsReceived,
} from './transactionActions';

// events

export const dataLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

// actions

//

// thunk actions

export const init = () => (dispatch, getState) => {
  const token = authService.getToken();

  if (!token) {
    dispatch(tokenExpired());
    return Promise.resolve();
  }

  return authService
    .isTokenActive(token)
    .then((active) => {
      if (!active) {
        authService.removeToken();
        dispatch(tokenExpired());

        return [];
      }

      dispatch(tokenReceived(token));
      dispatch(dataLoading());

      return Promise.all([
        categoryService.getCategories(token),
        toyService.getToys(token),
        transactionService.getTransactions(token),
      ]);
    })
    .then((results) => {
      if (results.length !== 3) {
        const error = new Error('Token expired');

        dispatch(categoriesNotReceived(error));
        dispatch(toysNotReceived(error));
        dispatch(transactionsNotReceived(error));

        return;
      }

      const [categoriesResult, toysResult, txResult] = results;

      categoriesResult.error
        ? dispatch(categoriesNotReceived(categoriesResult.error))
        : dispatch(categoriesReceived(categoriesResult.data));

      toysResult.error
        ? dispatch(toysNotReceived(toysResult.error))
        : dispatch(toysReceived(toysResult.data));

      txResult.error
        ? dispatch(transactionsNotReceived(txResult.error))
        : dispatch(transactionsReceived(txResult.data));
    });
};

/**
 * @param {string} token
 */
export const getData = (token) => (dispatch, getState) => {
  if (!token) {
    dispatch(tokenExpired());
    return Promise.resolve();
  }

  dispatch(dataLoading());

  return Promise.all([
    categoryService.getCategories(token),
    toyService.getToys(token),
    transactionService.getTransactions(token),
  ])
    .then((results) => {
      const [categoriesResult, toysResult, txResult] = results;

      categoriesResult.error
        ? dispatch(categoriesNotReceived(categoriesResult.error))
        : dispatch(categoriesReceived(categoriesResult.data));

      toysResult.error
        ? dispatch(toysNotReceived(toysResult.error))
        : dispatch(toysReceived(toysResult.data));

      txResult.error
        ? dispatch(transactionsNotReceived(txResult.error))
        : dispatch(transactionsReceived(txResult.data));
    });
};
