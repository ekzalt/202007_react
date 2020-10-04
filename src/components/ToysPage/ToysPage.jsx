import React, { useState, useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { Category, Toy } from "../../models";
import { toyActions } from "../../store/actions";
import { ToyCard } from "../index";

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
 * @typedef ICategoryState
 * @property {Category[]} list
 * @property {Error=} error
 */

/**
 * @typedef IToyState
 * @property {Toy[]} list
 * @property {Error=} error
 */

const ToysPage = () => {
  const defaultState = {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
  };
  const [state, setState] = useState(defaultState);
  const dispatch = useDispatch();

  /** @type {IMainState} */
  const mainState = useSelector((state) => state.main, shallowEqual);
  /** @type {IAuthState} */
  const auth = useSelector((state) => state.auth, shallowEqual);
  /** @type {ICategoryState} */
  const categoryState = useSelector((state) => state.category, shallowEqual);
  /** @type {IToyState} */
  const toyState = useSelector((state) => state.toy, shallowEqual);

  const addToy = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.preventDefault();

      if (
        auth.token &&
        state.name &&
        state.description &&
        state.price &&
        categoryState.list.some((c) => c.name === state.category)
      ) {
        /** @type {Toy} */
        const toy = {
          name: state.name,
          description: state.description,
          price: state.price,
          quantity: state.quantity,
          totalCost: state.price * state.quantity,
          category: categoryState.list.find((c) => c.name === state.category),
        };

        dispatch(
          state.quantity
            ? toyActions.addToyWithTransaction(auth.token, toy)
            : toyActions.addToy(auth.token, toy)
        );
        setState(defaultState);
      }
    },
    [state, setState, defaultState, dispatch, auth, categoryState]
  );

  const deleteToy = useCallback(
    /**
     * @param {Toy} toy
     */
    (toy) => {
      if (auth.token) {
        dispatch(toyActions.deleteToy(auth.token, toy.id));
      }
    },
    [dispatch, auth]
  );

  const handleChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) =>
      setState({
        ...state,
        [e.target.name]:
          e.target.name === "price" || e.target.name === "quantity"
            ? parseInt(e.target.value) < 0
              ? 0
              : parseInt(e.target.value)
            : e.target.value,
      }),
    [state, setState]
  );

  return (
    <div>
      <h2>Toys</h2>
      <p>{mainState.loading ? "Loading..." : ""}</p>
      <h3>Add toy form</h3>
      <form method="POST" onSubmit={addToy}>
        <div>
          <label>
            name:{" "}
            <input
              name="name"
              placeholder="Toy name"
              value={state.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            description:{" "}
            <input
              name="description"
              placeholder="Toy description"
              value={state.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            price:{" "}
            <input
              type="number"
              name="price"
              placeholder="Toy price"
              value={state.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            quantity:{" "}
            <input
              type="number"
              name="quantity"
              placeholder="Toy quantity"
              value={state.quantity}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            category:{" "}
            <select
              name="category"
              value={state.category}
              onChange={handleChange}
            >
              <option key="none" value=""></option>
              {categoryState.list.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
      <h3>Toy list</h3>
      <ul>
        {toyState.list.map((t) => (
          <li key={t.id}>
            <ToyCard toy={t} deleteToy={deleteToy} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToysPage;
