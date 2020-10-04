import { ToyActionType } from '../constants';
import { Toy } from '../../models';

/**
 * @typedef IToyState
 * @property {Toy[]} list
 * @property {Error=} error
 */

/** @type {IToyState} */
const initialState = {
  list: [],
  error: null,
};

/**
 * @param {IToyState} state
 * @param {{ type:string, payload:* }} action
 */
const toyReducer = (state = initialState, action) => {
  console.log('toyReducer state', state, 'action', action);
  const { type, payload } = action;

  switch (type) {
    // events
    case ToyActionType.TOYS_RECEIVED:
      return {
        ...state,
        list: payload,
        error: null,
      };
    case ToyActionType.TOYS_NOT_RECEIVED:
    case ToyActionType.TOY_NOT_RECEIVED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default toyReducer;
