import React, { useState, useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { Category, Toy } from "../../models";
import { categoryActions } from "../../store/actions";
import { CategoryItem } from "../index";

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

const CategoriesPage = () => {
  const defaultState = { name: "" };
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

  const addCategory = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.preventDefault();

      if (
        auth.token &&
        state.name &&
        !categoryState.list.some((c) => c.name === state.name)
      ) {
        dispatch(categoryActions.addCategory(auth.token, state.name));
        setState(defaultState);
      }
    },
    [state, setState, defaultState, dispatch, auth, categoryState]
  );

  const replaceCategory = useCallback(
    /**
     * @param {Category} category
     */
    (category) => {
      if (
        auth.token &&
        category.name &&
        !categoryState.list.some((c) => c.name === category.name) // new name should not fit existing
      ) {
        dispatch(categoryActions.replaceCategory(auth.token, category));
      }
    },
    [dispatch, auth, categoryState]
  );

  const deleteCategory = useCallback(
    /**
     * @param {Category} category
     */
    (category) => {
      if (auth.token) {
        const used = toyState.list
          .map((t) => t.category)
          .some((c) => c.id === category.id);

        if (!used) {
          dispatch(categoryActions.deleteCategory(auth.token, category.id));
        }
      }
    },
    [dispatch, auth, toyState]
  );

  const handleChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) =>
      setState({
        ...state,
        [e.target.name]: e.target.value,
      }),
    [state, setState]
  );

  return (
    <div>
      <h2>Categories</h2>
      <p>{mainState.loading ? "Loading..." : ""}</p>
      <h3>Add category form</h3>
      <form method="POST" onSubmit={addCategory}>
        <input
          name="name"
          placeholder="Animal"
          value={state.name}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      <h3>Category list</h3>
      <ul>
        {categoryState.list.map((c) => (
          <li key={c.id}>
            <CategoryItem
              category={c}
              replaceCategory={replaceCategory}
              deleteCategory={deleteCategory}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
