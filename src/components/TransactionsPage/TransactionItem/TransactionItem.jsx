import React from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Transaction } from '../../../models';

/**
 * @param {{ tx:Transaction }} props
 */
const TransactionItem = (props) => {
  const { tx } = props;

  return (
    <div>
      <p></p>
    </div>
  );
};

export default TransactionItem;
