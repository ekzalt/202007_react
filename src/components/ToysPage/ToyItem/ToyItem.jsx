import React, { useState, useCallback } from "react";

import { Category, Toy } from "../../../models";

/**
 * @param {{ toy:Toy, categories:Category[], updateToy:(toy:Toy)=>void }} props
 */
const ToyItem = (props) => {
  const { toy, categories, updateToy } = props;
  const defaultState = {
    ...toy,
    categoryname: toy.category.name,
    edited: false,
  };
  const [state, setState] = useState(defaultState);

  const handleEdit = useCallback(
    /**
     * @param {Event} e
     */
    (e) =>
      setState({
        ...toy,
        categoryname: toy.category.name,
        edited: !state.edited,
      }),
    [state, setState, toy]
  );

  const handleSave = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      /** @type {Toy} */
      const toyData = {
        ...toy,
        name: state.name,
        description: state.description,
        category: categories.find((c) => c.name === state.categoryname),
        price: state.price,
        totalCost: state.price * toy.quantity,
      };

      updateToy(toyData);
      setState(defaultState);
    },
    [state, setState, defaultState, toy, categories, updateToy]
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
      <div>
        <button onClick={handleEdit}>Edit</button>
      </div>
      <form
        method="POST"
        style={{ display: state.edited ? "block" : "none" }}
        onSubmit={handleSave}
      >
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
            category:{" "}
            <select
              name="category"
              value={state.categoryname}
              onChange={handleChange}
            >
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            price:{" "}
            <input
              type="number"
              name="price"
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
              value={state.quantity}
              disabled
            />
          </label>
        </div>
        <div>
          <label>
            total cost:{" "}
            <input
              type="number"
              name="totalCost"
              value={state.totalCost}
              disabled
            />
          </label>
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
      <div style={{ display: state.edited ? "none" : "block" }}>
        <div>name: {state.name}</div>
        <div>description: {state.description}</div>
        <div>category: {state.categoryname}</div>
        <div>price: {state.price}</div>
        <div>quantity: {state.quantity}</div>
        <div>total cost: {state.totalCost}</div>
      </div>
    </div>
  );
};

export default ToyItem;
