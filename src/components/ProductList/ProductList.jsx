import React from 'react';
import PropTypes from 'prop-types';

import { ProductElement } from '../index';
import './ProductList.css';

class ProductList extends React.Component {
  static propTypes = {
    products: PropTypes.array,
    deleteProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
  };

  static defaultProps = {
    products: [],
  };

  render() {
    const { products, deleteProduct, updateProduct } = this.props;

    return (
      <ul className="product-list">
        <li className="product">
          <div className="product-name">Name</div>
          <div className="product-description">Category</div>
          <div className="product-description">Description</div>
          <div className="product-price" style={{ width: '31%' }}>Price</div>
        </li>
        {products.map(product =>
          <ProductElement
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct} />)}
      </ul>
    );
  }
}

export default ProductList;
