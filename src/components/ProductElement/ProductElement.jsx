import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Product, Category } from '../../models';
import './ProductElement.css';

/**
 * @param {{ product:Product, deleteProduct:Function, updateProduct:Function }} props
 */
const ProductElement = ({ product, deleteProduct, updateProduct }) => {
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

  /*
  const selectHandler = () => {
    updateProduct({ ...product, selected: !product.selected });
    setState(defaultState);
  };
  */

  const selectHandler = useCallback(
    () => {
      updateProduct({ ...product, selected: !product.selected });
      setState(defaultState);
    },
    [updateProduct, product, defaultState],
  );

  /*
  const deleteHandler = (e) => {
    e.stopPropagation();
    deleteProduct(product.id);
  };
  */

  const deleteHandler = useCallback(
    (e) => {
      e.stopPropagation();
      deleteProduct(product.id);
    },
    [deleteProduct, product],
  );

  /*
  const editHandler = (e) => {
    e.stopPropagation();
    !state.id ? setState({ ...product, edited: true }) : setState(defaultState);
  };
  */

  const editHandler = useCallback(
    (e) => {
      e.stopPropagation();
      !state.id ? setState({ ...product, edited: true }) : setState(defaultState);
    },
    [product, state, defaultState],
  );

  /*
  const saveHandler = (e) => {
    e.stopPropagation();

    if (!state.id) {
      return;
    }

    updateProduct({ ...state, edited: false });
    setState(defaultState);
  };
  */

  const saveHandler = useCallback(
    (e) => {
      e.stopPropagation();

      if (!state.id) {
        return;
      }

      updateProduct({ ...state, edited: false });
      setState(defaultState);
    },
    [updateProduct, state, defaultState],
  );

  /*
  const onInputClick = (e) => e.stopPropagation();
  */

  const onInputClick = useCallback(
    (e) => e.stopPropagation(),
    [],
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
  deleteProduct: PropTypes.func.isRequired,
};

export default ProductElement;
