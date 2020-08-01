import React from 'react';

import './ProductElement.css';

class ProductElement extends React.Component {
  deleteProduct = () => {
    const { product, deleteProduct } = this.props;

    deleteProduct(product.id);
  };

  render() {
    const { product: { name, description, price } } = this.props;

    return (
      <li className="product">
        <div className="product-name">{name}</div>
        <div className="product-description">{description}</div>
        <div className="product-price">{price}</div>
        <div><button onClick={this.deleteProduct}>Delete</button></div>
      </li>
    );
  }
}

export default ProductElement;
