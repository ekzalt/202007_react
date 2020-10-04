import { ToyActionType, MainActionType } from '../constants';
import { Toy, TransactionType } from '../../models';
import { ToyService } from '../../services';
import { tokenExpired, authService } from './authActions';
import {
  transactionService,
  transactionsNotReceived,
  transactionsReceived,
} from './transactionActions';
export const toyService = new ToyService();

// events

/**
 * @param {Toy[]} toys
 */
export const toysReceived = (toys) => ({
  type: ToyActionType.TOYS_RECEIVED,
  payload: toys,
});

/**
 * @param {Error} error
 */
export const toysNotReceived = (error) => ({
  type: ToyActionType.TOYS_NOT_RECEIVED,
  payload: error,
});

export const toysLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

/**
 * @param {Toy} toy
 */
export const toyReceived = (toy) => ({
  type: ToyActionType.TOY_RECEIVED,
  payload: toy,
});

/**
 * @param {Error} error
 */
export const toyNotReceived = (error) => ({
  type: ToyActionType.TOY_NOT_RECEIVED,
  payload: error,
});

export const toyLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

// actions

//

// thunk actions

/**
 * @param {string} token
 */
export const getToys = (token) => (dispatch, getState) => {
  dispatch(toysLoading());

  return toyService
    .getToys(token)
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(toysNotReceived(error));
        return;
      }

      dispatch(toysReceived(data));
    });
};

/**
 * @param {string} token
 * @param {string} id
 */
export const getToyById = (token, id) => (dispatch, getState) => {
  dispatch(toyLoading());

  return toyService
    .getToyById(token, id)
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(toyNotReceived(error));
        return;
      }

      dispatch(toyReceived(data));
    });
};

/**
 * @param {string} token
 * @param {Toy} toy
 */
export const addToy = (token, toy) => (dispatch, getState) => {
  dispatch(toyLoading());

  return toyService
    .addToy(token, toy)
    .then(() => toyService.getToys(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(toysNotReceived(error));
        return;
      }

      dispatch(toysReceived(data));
    });
};

/**
 * @param {string} token
 * @param {Toy} toy
 */
export const addToyWithTransaction = (token, toy) => (dispatch, getState) => {
  if (toy.quantity <= 0) {
    return Promise.resolve();
  }

  dispatch(toyLoading());

  return toyService
    .addToy(token, toy)
    .then(({ data, error }) => {
      if (!data) {
        return Promise.resolve({ data, error });
      }

      return transactionService.addTransaction(token, {
        toys: [{ id: data.id, quantity: toy.quantity }],
        type: TransactionType.incoming,
      });
    })
    .then(() => Promise.all([
      toyService.getToys(token),
      transactionService.getTransactions(token),
    ]))
    .then(results => {
      const [toysResult, txResult] = results;

      if ((toysResult.error && toysResult.error.message === 'Token expired') || (txResult.error && txResult.error.message === 'Token expired')) {
        authService.removeToken();
        dispatch(tokenExpired());
      }

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
 * @param {string} id
 */
export const deleteToy = (token, id) => (dispatch, getState) => {
  dispatch(toyLoading());

  return toyService
    .deleteToy(token, id)
    .then(() => toyService.getToys(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(toysNotReceived(error));
        return;
      }

      dispatch(toysReceived(data));
    });
};

/**
 * @param {string} token
 * @param {Toy} toy
 */
export const replaceToy = (token, toy) => (dispatch, getState) => {
  dispatch(toyLoading());

  return toyService
    .replaceToy(token, toy)
    .then(() => toyService.getToys(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(toysNotReceived(error));
        return;
      }

      dispatch(toysReceived(data));
    });
};

/**
 * @param {string} token
 * @param {Toy} toy
 */
export const updateToy = (token, toy) => (dispatch, getState) => {
  dispatch(toyLoading());

  return toyService
    .updateToy(token, toy)
    .then(() => toyService.getToys(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(toysNotReceived(error));
        return;
      }

      dispatch(toysReceived(data));
    });
};
