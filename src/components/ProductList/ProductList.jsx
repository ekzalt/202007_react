import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { Product } from '../../models';
import { ProductElement } from '../index';
import './ProductList.css';

const ProductList = () => {
  /** @type {Product[]} */
  const list = useSelector((state) => state.products.list, shallowEqual);

  return (
    <ul className="product-list">
      <li className="product">
        <div className="product-name">Name</div>
        <div className="product-description">Category</div>
        <div className="product-description">Description</div>
        <div className="product-price" style={{ width: '31%' }}>Price</div>
      </li>
      {list.map(product => <ProductElement key={product.id} product={product} />)}
    </ul>
  );
};

export default ProductList;
