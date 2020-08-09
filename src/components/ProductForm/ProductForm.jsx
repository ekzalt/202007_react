import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Category } from '../../models';
import './ProductForm.css';

/**
 * @param {{ addProduct:Function }} props
 */
const ProductForm = ({ addProduct }) => {
  const defaultState = {
    name: '',
    category: '',
    description: '',
    price: 0,
  };
  const [state, setState] = useState(defaultState);

  /*
  const addHandler = (e) => {
    e.preventDefault();

    if (state.name && state.description && state.price > 0) {
      addProduct(state);
      setState(defaultState);
    }
  };
  */

  const addHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (state.name && state.description && state.price > 0) {
        addProduct(state);
        setState(defaultState);
      }
    },
    [state, addProduct, defaultState],
  );

  /*
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.name === 'price'
        ? parseInt(e.target.value, 10)
        : e.target.value,
    });
  };
  */

  const onChange = useCallback(
    (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.name === 'price'
          ? parseInt(e.target.value, 10)
          : e.target.value,
      });
    },
    [state],
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

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default ProductForm;
