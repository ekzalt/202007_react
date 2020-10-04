import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import toyReducer from './toyReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  main: mainReducer,
  auth: authReducer,
  category: categoryReducer,
  toy: toyReducer,
  transaction: transactionReducer,
});

export default rootReducer;
