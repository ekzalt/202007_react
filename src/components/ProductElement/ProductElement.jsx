import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { productsActions } from '../../store/actions';
import { Product, Category } from '../../models';
import './ProductElement.css';

/**
 * @param {{ product:Product }} props
 */
const ProductElement = ({ product }) => {
  /** @type {Product} */
  const defaultState = {
    id: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    selected: false,
    edited: false,
  };
  const [state, setState] = useState(defaultState);
  const dispatch = useDispatch();

  const selectHandler = useCallback(
    () => {
      dispatch(productsActions.updateProduct({
        ...product,
        selected: !product.selected,
      }));
      setState(defaultState);
    },
    [dispatch, product, setState, defaultState],
  );

  const deleteHandler = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.stopPropagation();
      dispatch(productsActions.deleteProduct(product));
    },
    [dispatch, product],
  );

  const editHandler = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.stopPropagation();
      !state.id
        ? setState({ ...product, edited: true })
        : setState(defaultState);
    },
    [product, state, setState, defaultState],
  );

  const saveHandler = useCallback(
    /**
     * @param {Event} e
     */
    (e) => {
      e.stopPropagation();

      if (!state.id) {
        return;
      }

      dispatch(productsActions.updateProduct({
        ...state,
        edited: false,
      }));
      setState(defaultState);
    },
    [dispatch, state, setState, defaultState],
  );

  const onInputClick = useCallback(
    /**
     * @param {Event} e
     */
    (e) => e.stopPropagation(),
    [],
  );

  const onChange = useCallback(
    /**
     * @param {Event} e
     */
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

  const resolvedProduct = state.id ? state : product;
  const { name, category, description, price, selected, edited } = resolvedProduct;

  return (
    <li
      className={selected ? 'product product-selected' : 'product'}
      onClick={selectHandler}>
      {selected && edited
        ? <input name="name" value={name} onClick={onInputClick} onChange={onChange} />
        : <div className="product-name">{name}</div>
      }
      {selected && edited
        ? <select
          name="category"
          value={category}
          onClick={onInputClick}
          onChange={onChange}>
          {Object.values(Category).map(value => <option key={value} value={value}>{value}</option>)}
        </select>
        : <div className="product-description">{category}</div>
      }
      {selected && edited
        ? <input name="description" value={description} onClick={onInputClick} onChange={onChange} />
        : <div className="product-description">{description}</div>
      }
      {selected && edited
        ? <input name="price" value={price} type="number" onClick={onInputClick} onChange={onChange} />
        : <div className="product-price">{price}</div>
      }
      <div>
        <button disabled={!selected} onClick={editHandler}>Edit</button>
        <button disabled={!selected} onClick={saveHandler}>Save</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </li>
  );
};

ProductElement.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductElement;
