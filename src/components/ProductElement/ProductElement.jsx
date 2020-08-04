import React from 'react';
import PropTypes from 'prop-types';

import { Product, Category } from '../../models';
import './ProductElement.css';

class ProductElement extends React.Component {
  static propTypes = {
    product: PropTypes.instanceOf(Product).isRequired,
    deleteProduct: PropTypes.func.isRequired,
  };

  state = {
    id: '',
    name: '',
    category: '',
    description: '',
    price: 0,
    selected: false,
    edited: false,
  };

  setDefaultState = () => {
    this.setState({
      id: '',
      name: '',
      category: '',
      description: '',
      price: 0,
      selected: false,
      edited: false,
    });
  };

  /**
   * @param {Event} e
   */
  deleteProduct = (e) => {
    e.stopPropagation();
    const { product, deleteProduct } = this.props;

    deleteProduct(product.id);
  };

  selectProduct = () => {
    const { product, updateProduct } = this.props;

    updateProduct({
      ...product,
      selected: !product.selected,
    });
    this.setDefaultState();
  };

  /**
   * @param {Event} e
   */
  editProduct = (e) => {
    e.stopPropagation();
    const { product } = this.props;

    if (!this.state.id) {
      this.setState({
        ...product,
        edited: true,
      });
    } else {
      this.setDefaultState();
    }
  };

  /**
   * @param {Event} e
   */
  saveProduct = (e) => {
    e.stopPropagation();
    const { updateProduct } = this.props;

    if (!this.state.id) {
      return;
    }

    updateProduct({
      ...this.state,
      edited: false,
    });
    this.setDefaultState();
  };

  /**
   * @param {Event} e
   */
  onInputClick = (e) => {
    e.stopPropagation();
  };

  /**
   * @param {Event} e
   */
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.name === 'price'
        ? parseInt(e.target.value, 10)
        : e.target.value,
    });
  };

  render() {
    const product = this.state.id
      ? this.state
      : this.props.product;
    const { name, category, description, price, selected, edited } = product;

    return (
      <li
        className={selected ? 'product product-selected' : 'product'}
        onClick={this.selectProduct}>
        {selected && edited
          ? <input name="name" value={name} onClick={this.onInputClick} onChange={this.onChange} />
          : <div className="product-name">{name}</div>
        }
        {selected && edited
          ? <select
              name="category"
              value={category}
              onClick={this.onInputClick}
              onChange={this.onChange}>
              {Object.values(Category).map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          : <div className="product-description">{category}</div>
        }
        {selected && edited
          ? <input name="description" value={description} onClick={this.onInputClick} onChange={this.onChange} />
          : <div className="product-description">{description}</div>
        }
        {selected && edited
          ? <input name="price" value={price} type="number" onClick={this.onInputClick} onChange={this.onChange} />
          : <div className="product-price">{price}</div>
        }
        <div>
          <button disabled={!selected} onClick={this.editProduct}>Edit</button>
          <button disabled={!selected} onClick={this.saveProduct}>Save</button>
          <button onClick={this.deleteProduct}>Delete</button>
        </div>
      </li>
    );
  }
}

export default ProductElement;
