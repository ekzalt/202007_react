/* eslint-disable import/prefer-default-export */

export const MainActionType = Object.freeze({
  // events
  LOADING: 'LOADING',
});

export const AuthActionType = Object.freeze({
  // events
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_RECEIVED: 'TOKEN_RECEIVED',
  TOKEN_NOT_RECEIVED: 'TOKEN_NOT_RECEIVED',
});

export const CategoryActionType = Object.freeze({
  // events
  CATEGORIES_RECEIVED: 'CATEGORIES_RECEIVED',
  CATEGORIES_NOT_RECEIVED: 'CATEGORIES_NOT_RECEIVED',
  CATEGORY_RECEIVED: 'CATEGORY_RECEIVED',
  CATEGORY_NOT_RECEIVED: 'CATEGORY_NOT_RECEIVED',
});

export const ToyActionType = Object.freeze({
  // events
  TOYS_RECEIVED: 'TOYS_RECEIVED',
  TOYS_NOT_RECEIVED: 'TOYS_NOT_RECEIVED',
  TOY_RECEIVED: 'TOY_RECEIVED',
  TOY_NOT_RECEIVED: 'TOY_NOT_RECEIVED',
});

export const TransactionActionType = Object.freeze({
  // events
  TRANSACTIONS_RECEIVED: 'TRANSACTIONS_RECEIVED',
  TRANSACTIONS_NOT_RECEIVED: 'TRANSACTIONS_NOT_RECEIVED',
  TRANSACTION_RECEIVED: 'TRANSACTION_RECEIVED',
  TRANSACTION_NOT_RECEIVED: 'TRANSACTION_NOT_RECEIVED',
});
