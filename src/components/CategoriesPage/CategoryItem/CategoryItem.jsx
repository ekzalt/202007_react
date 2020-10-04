import React, { useState, useCallback } from "react";

import { Category } from "../../../models";

/**
 * @param {{ category:Category, replaceCategory:(category:Category)=>void, deleteCategory:(category:Category)=>void }} props
 */
const CategoryItem = (props) => {
  const { category, replaceCategory, deleteCategory } = props;
  const [state, setState] = useState({ ...category, edited: false });

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

  const handleSave = useCallback(
    /**
     * @param {Event} e
     */
    (e) => replaceCategory(state),
    [state, replaceCategory]
  );

  const handleEdit = useCallback(
    /**
     * @param {Event} e
     */
    (e) =>
      setState({
        ...category,
        edited: !state.edited,
      }),
    [state, setState, category]
  );

  const handleDelete = useCallback(
    /**
     * @param {Event} e
     */
    (e) => deleteCategory(state),
    [state, deleteCategory]
  );

  return (
    <div>
      {state.edited ? (
        <input
          name="name"
          placeholder="Animal"
          value={state.name}
          onChange={handleChange}
        />
      ) : (
        <span>{state.name}</span>
      )}
      <button onClick={handleSave} disabled={!state.edited}>
        Save
      </button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CategoryItem;
