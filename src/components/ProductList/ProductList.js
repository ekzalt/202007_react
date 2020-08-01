import React from 'react';

import { ProductElement } from '../index';
import './ProductList.css';

class ProductList extends React.Component {
  render() {
    const { products = [], deleteProduct } = this.props;

    return (
      <ul className="product-list">
        <li className="product">
          <div className="product-name">Name</div>
          <div className="product-description">Description</div>
          <div className="product-price" style={{ width: '30%' }}>Price</div>
        </li>
        {products.map(product =>
          <ProductElement
            key={product.id}
            product={product}
            deleteProduct={deleteProduct} />)}
      </ul>
    );
  }
}

export default ProductList;
