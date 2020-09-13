import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Product } from '../../models';
import { productsActions } from '../../store/actions';
import { Category } from '../../models';
import './ProductForm.css';

const ProductForm = () => {
  /** @type {Product} */
  const defaultState = {
    name: '',
    category: '',
    description: '',
    price: 0,
  };
  const [state, setState] = useState(defaultState);
  const dispatch = useDispatch();

  const addHandler = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.preventDefault();

      if (state.name && state.description && state.price > 0) {
        dispatch(productsActions.addProduct(state));
        setState(defaultState);
      }
    },
    [state, setState, defaultState, dispatch],
  );

  const onChange = useCallback(
    /**
     * @param {Event} e
     */
    (e) => setState({
      ...state,
      [e.target.name]: e.target.name === 'price'
        ? (parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 0)
        : e.target.value,
    }),
    [state, setState],
  );

  const { name, category, description, price } = state;

  return (
    <form className="product-form" onSubmit={addHandler}>
      <input
        className="product-form-input"
        name="name"
        placeholder="Parmesan"
        value={name}
        onChange={onChange} />
      <select
        className="product-form-select"
        name="category"
        value={category}
        onChange={onChange}>
        <option key="none" value=""></option>
        {Object.values(Category).map(value => <option key={value} value={value}>{value}</option>)}
      </select>
      <input
        className="product-form-input"
        name="description"
        placeholder="Hard cheese"
        value={description}
        onChange={onChange} />
      <input
        className="product-form-input"
        name="price"
        value={price}
        type="number"
        onChange={onChange} />
      <button className="product-form-button" type="submit">Add</button>
    </form>
  );
};

export default ProductForm;
