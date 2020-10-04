import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { Toy, Transaction, TransactionType } from "../../../models";

/**
 * @param {{ toys:Toy[], addTransaction:(tx:Transaction)=>void }} props
 */
const TransactionAddForm = (props) => {
  const { toys, addTransaction } = props;
  const defaultState = {
    toys: [
      {
        id: "",
        name: "",
        quantity: 0,
        formId: uuidv4(),
      },
    ],
    type: TransactionType.incoming,
  };
  const [state, setState] = useState(defaultState);

  const handleSubmit = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      const txType = state.type;
      const txToys = state.toys
        .filter(t => t.id && t.quantity)
        .map(t => ({ id: t.id, quantity: t.quantity }));

      console.log('handleSubmit', { txType, txToys });

      if (txType && txToys.length) {
        addTransaction({ toys: txToys, type: txType });
        setState(defaultState);
      }
    },
    [state, setState, defaultState, addTransaction]
  );

  const handleAddToy = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      setState({
        ...state,
        toys: [
          ...state.toys,
          {
            id: "",
            name: "",
            quantity: 0,
            formId: uuidv4(),
          },
        ],
      });
    },
    [state, setState]
  );

  const handleDeleteToy = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      setState({
        ...state,
        toys: state.toys.filter((t) => t.formId !== e.target.name),
      });
    },
    [state, setState]
  );

  const handleNameChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      const newStateToys = state.toys.map((t) => {
        if (e.target.name === `name${t.formId}`) {
          const toy = toys.find((toy) => toy.name === e.target.value);

          return {
            ...t,
            name: e.target.value,
            id: toy ? toy.id : "",
          };
        }

        return t;
      });

      setState({
        ...state,
        toys: newStateToys,
      });
    },
    [state, setState, toys]
  );

  const handleQuantityChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      const newStateToys = state.toys.map((t) => {
        if (e.target.name === `quantity${t.formId}`) {
          return {
            ...t,
            quantity:
              parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
          };
        }

        return t;
      });

      setState({
        ...state,
        toys: newStateToys,
      });
    },
    [state, setState]
  );

  const handleTypeChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) =>
      setState({
        ...state,
        type: e.target.value,
      }),
    [state, setState]
  );

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div>
        <button onClick={handleAddToy}>+</button>
      </div>
      {state.toys.map((t) => (
        <div key={t.formId}>
          <label>
            toy name:{" "}
            <select
              name={`name${t.formId}`}
              value={t.name}
              onChange={handleNameChange}
            >
              <option key="none" value=""></option>
              {toys.map((toy) => (
                <option key={toy.name} value={toy.name}>
                  {toy.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            {" "}
            toy quantity:{" "}
            <input
              type="number"
              name={`quantity${t.formId}`}
              value={t.quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <button name={t.formId} onClick={handleDeleteToy}>
            -
          </button>
        </div>
      ))}
      <div>
        <label>
          transaction type:{" "}
          <select name="type" value={state.type} onChange={handleTypeChange}>
            {Object.values(TransactionType).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default TransactionAddForm;
