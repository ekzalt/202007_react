/* eslint-disable import/prefer-default-export */

export const loggerMdw = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());

  return result;
};
