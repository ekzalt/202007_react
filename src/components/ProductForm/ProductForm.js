import React from 'react';

import { Product } from '../../models';
import './ProductForm.css';

class ProductForm extends React.Component {
  /** @type {Product} */
  state = {
    name: '',
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
      description: '',
      price: 0,
    });
  };

  render() {
    const { name, description, price } = this.state;

    return (
      <form className="product-form" onSubmit={this.addProduct}>
        <input
          className="product-form-input"
          name="name"
          placeholder="Parmesan"
          value={name}
          onChange={this.onChange} />
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
        <button className="product-form-add" type="submit">Add</button>
      </form>
    );
  }
}

export default ProductForm;
