import React, { useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Toy, Transaction, TransactionType } from "../../models";
import { transactionActions } from "../../store/actions";
import { TransactionAddForm } from "../index";
import classes from "./TransactionsPage.module.css";

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

const TransactionsPage = () => {
  const dispatch = useDispatch();
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

  const addTransaction = useCallback(
    /**
     * @param {{ toys:{ id:string, quantity:number }[], type:string }} txRequest
     */
    (txRequest) => {
      if (auth.token) {
        dispatch(transactionActions.addTransaction(auth.token, txRequest));
      }
    },
    [dispatch, auth]
  );

  return (
    <div>
      <h2>Transactions</h2>
      <p>{mainState.loading ? "Loading..." : ""}</p>
      <h3>Create transaction form</h3>
      <TransactionAddForm
        toys={toyState.list}
        addTransaction={addTransaction}
      />
      <h3>Transaction list</h3>
      <table className={classes.TxTable}>
        <thead>
          <tr style={{ backgroundColor: "lightgray" }}>
            <th>type</th>
            <th>id</th>
            <th>date</th>
            <th>owner</th>
            <th>amount</th>
            <th>cost</th>
            <th>details</th>
          </tr>
        </thead>
        <tbody>
          {transactionState.list.map((tx) => (
            <tr
              key={tx.id}
              style={{
                backgroundColor:
                  tx.type === TransactionType.incoming ? "lightgreen" : "red",
              }}
            >
              <td>{tx.type === TransactionType.incoming ? "->" : "<-"}</td>
              <td>{tx.id}</td>
              <td>{tx.date}</td>
              <td>{tx.userId}</td>
              <td>{tx.toys.length}</td>
              <td>
                {tx.toys.map((t) => t.totalCost).reduce((a, b) => a + b, 0)}
              </td>
              <td>
                <Link to={`transactions/${tx.id}`}>details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
