import React from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Toy, Transaction } from '../../../models';

/**
 * @typedef IMainState
 * @property {boolean} loading
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

const TransactionPage = () => {
  /** @type {IMainState} */
  const mainState = useSelector((state) => state.main, shallowEqual);
  /** @type {IToyState} */
  const toyState = useSelector((state) => state.toy, shallowEqual);
  /** @type {ITransactionState} */
  const transactionState = useSelector((state) => state.transaction, shallowEqual);
  const { txId } = useParams();
  const tx = transactionState.list.find((t) => t.id === txId);

  let content = "";

  if (mainState.loading) {
    content =  <p>Loading...</p>;
  } else {
    if (tx) {
      content = (
      <div>
        <h3>Toys in warehouse</h3>
        <pre>{JSON.stringify(toyState.list, null, 2)}</pre>
        <h3>Transaction details</h3>
        <pre>{JSON.stringify(tx, null, 2)}</pre>
      </div>
      ); // TODO: add TxElement
    } else {
      content = <p>Not Found</p>;
    }
  }

  return (
    <div>
      <h2>Transaction</h2>
      <div>{content}</div>
    </div>
  );
};

export default TransactionPage;
