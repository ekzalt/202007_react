import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { Toy, Transaction } from "../../models";
import { mainActions } from "../../store/actions";

/**
 * @typedef IMainState
 * @property {boolean} loading
 */

/**
 * @typedef IAuthState
 * @property {boolean} logged
 * @property {string} token
 * @property {Error=} error
 */

/**
 * @typedef IToyState
 * @property {Toy[]} list
 * @property {Error=} error
 */

/**
 * @typedef ITransactionState
 * @property {Transaction[]} list
 * @property {Error=} error
 */

const DashboardPage = () => {
  /** @type {IMainState} */
  const mainState = useSelector((state) => state.main, shallowEqual);
  /** @type {IAuthState} */
  const auth = useSelector((state) => state.auth, shallowEqual);
  /** @type {IToyState} */
  const toyState = useSelector((state) => state.toy, shallowEqual);
  /** @type {ITransactionState} */
  const transactionState = useSelector(
    (state) => state.transaction,
    shallowEqual
  );
  const dispatch = useDispatch();

  // useEffect instead of componentDidMount and componentDidUpdate
  useEffect(() => {
    // if it was just auto redirect from login page - data was not requested
    if (!mainState.loading && auth.token && !toyState.list.length && !transactionState.list.length) {
      dispatch(mainActions.getData(auth.token));
    }
  }, [dispatch, auth, mainState, toyState, transactionState]);

  // TODO: add cool DashboardTable

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{mainState.loading ? "Loading..." : ""}</p>
      <h3>Toys with Categories</h3>
      <pre>{JSON.stringify(toyState.list, null, 2)}</pre>
      <h3>Transactions with Toys</h3>
      <pre>{JSON.stringify(transactionState.list, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
