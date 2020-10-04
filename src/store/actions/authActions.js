import { AuthActionType, MainActionType } from '../constants';
import { AuthService } from '../../services';

export const authService = new AuthService();

// events

export const tokenExpired = () => ({
  type: AuthActionType.TOKEN_EXPIRED,
  payload: null,
});

/**
 * @param {string} token
 */
export const tokenReceived = (token) => ({
  type: AuthActionType.TOKEN_RECEIVED,
  payload: token,
});

/**
 * @param {Error} error
 */
export const tokenNotReceived = (error) => ({
  type: AuthActionType.TOKEN_NOT_RECEIVED,
  payload: error,
});

export const tokenLoading = () => ({
  type: MainActionType.LOADING,
  payload: null,
});

// actions

//

// thunk actions

/**
 * @param {{ email:string, password:string }} creds
 */
export const login = (creds) => (dispatch, getState) => {
  dispatch(tokenLoading());

  return authService
    .login(creds)
    .then(({ data, error }) => {
      if (error) {
        dispatch(tokenNotReceived(error));
        return;
      }

      authService.setToken(data);
      dispatch(tokenReceived(data));
    });
};

export const logout = (token = '') => (dispatch, getState) => {
  dispatch(tokenLoading());

  return authService
    .logout(token || authService.getToken())
    .then(() => {
      authService.removeToken();
      dispatch(tokenExpired());
    });
};
