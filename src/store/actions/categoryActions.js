import { CategoryActionType, MainActionType } from '../constants';
import { Category } from '../../models';
import { CategoryService } from '../../services';
import { tokenExpired, authService } from './authActions';

export const categoryService = new CategoryService();

// events

/**
 * @param {Category[]} categories
 */
export const categoriesReceived = (categories) => ({
  type: CategoryActionType.CATEGORIES_RECEIVED,
  payload: categories,
});

/**
 * @param {Error} error
 */
export const categoriesNotReceived = (error) => ({
  type: CategoryActionType.CATEGORIES_NOT_RECEIVED,
  payload: error,
});

export const categoriesLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

/**
 * @param {Category} category
 */
export const categoryReceived = (category) => ({
  type: CategoryActionType.CATEGORY_RECEIVED,
  payload: category,
});

/**
 * @param {Error} error
 */
export const categoryNotReceived = (error) => ({
  type: CategoryActionType.CATEGORY_NOT_RECEIVED,
  payload: error,
});

export const categoryLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

// actions

//

// thunk actions

/**
 * @param {string} token
 */
export const getCategories = (token) => (dispatch, getState) => {
  dispatch(categoriesLoading());

  return categoryService
    .getCategories()
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};

/**
 * @param {string} token
 * @param {string} id
 */
export const getCategoryById = (token, id) => (dispatch, getState) => {
  dispatch(categoryLoading());

  return categoryService
    .getCategoryById(token, id)
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(categoryNotReceived(error));
        return;
      }

      dispatch(categoryReceived(data));
    });
};

/**
 * @param {string} token
 * @param {string} name
 */
export const addCategory = (token, name) => (dispatch, getState) => {
  dispatch(categoryLoading());

  return categoryService
    .addCategory(token, name)
    .then(() => categoryService.getCategories(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};

/**
 * @param {string} token
 * @param {string} id
 */
export const deleteCategory = (token, id) => (dispatch, getState) => {
  dispatch(categoryLoading());

  return categoryService
    .deleteCategory(token, id)
    .then(() => categoryService.getCategories(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};

/**
 * @param {string} token
 * @param {Category} category
 */
export const replaceCategory = (token, category) => (dispatch, getState) => {
  dispatch(categoryLoading());

  return categoryService
    .replaceCategory(token, category)
    .then(() => categoryService.getCategories(token))
    .then(({ data, error }) => {
      if (error) {
        if (error.message === 'Token expired') {
          authService.removeToken();
          dispatch(tokenExpired());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};
