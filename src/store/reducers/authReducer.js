import { AuthActionType } from '../constants';

/**
 * @typedef IAuthState
 * @property {boolean} logged
 * @property {string} token
 * @property {Error=} error
 */

/** @type {IAuthState} */
const initialState = {
  logged: true,
  token: '',
  error: null,
};

/**
 * @param {IAuthState} state
 * @param {{ type:string, payload:* }} action
 */
const authReducer = (state = initialState, action) => {
  console.log('authReducer state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    // events
    case AuthActionType.TOKEN_EXPIRED:
      return {
        ...state,
        logged: false,
        token: '',
        error: new Error('Token expired'),
      };
    case AuthActionType.TOKEN_RECEIVED:
      return {
        ...state,
        logged: true,
        token: payload,
        error: null,
      };
    case AuthActionType.TOKEN_NOT_RECEIVED:
      return {
        ...state,
        logged: false,
        token: '',
        error: payload
      };
    default:
      return state;
  }
};

export default authReducer;
