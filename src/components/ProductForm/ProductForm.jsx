import React from 'react';
import PropTypes from 'prop-types';

import { Category } from '../../models';
import './ProductForm.css';

class ProductForm extends React.Component {
  static propTypes = {
    addProduct: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    category: '',
    description: '',
    price: 0,
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

  /**
   * @param {Event} e
   */
  addProduct = (e) => {
    e.preventDefault();
    const { name, description, price } = this.state;

    if (name && description && price > 0) {
      this.props.addProduct(this.state);
    }

    this.setState({
      name: '',
      category: '',
      description: '',
      price: 0,
    });
  };

  render() {
    const { name, category, description, price } = this.state;

    return (
      <form className="product-form" onSubmit={this.addProduct}>
        <input
          className="product-form-input"
          name="name"
          placeholder="Parmesan"
          value={name}
          onChange={this.onChange} />
        <select 
          className="product-form-select"
          name="category"
          value={category}
          onChange={this.onChange}>
          <option key="none" value=""></option>
          {Object.values(Category).map(value => <option key={value} value={value}>{value}</option>)}
        </select>
        <input
          className="product-form-input"
          name="description"
          placeholder="Hard cheese"
          value={description}
          onChange={this.onChange} />
        <input
          className="product-form-input"
          name="price"
          value={price}
          type="number"
          onChange={this.onChange} />
        <button className="product-form-button" type="submit">Add</button>
      </form>
    );
  }
}

export default ProductForm;
