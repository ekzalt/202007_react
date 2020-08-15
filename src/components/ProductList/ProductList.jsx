import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Product } from '../../models';
import { mapStateToProps, mapDispatchToProps } from '../App/App';
import { ProductElement } from '../index';
import './ProductList.css';

class ProductList extends React.PureComponent {

  static propTypes = {
    products: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.instanceOf(Product)),
    }),
  };

  static defaultProps = {
    products: { list: [] },
  };

  render() {
    const { list } = this.props.products;

    return (
      <ul className="product-list">
        <li className="product">
          <div className="product-name">Name</div>
          <div className="product-description">Category</div>
          <div className="product-description">Description</div>
          <div className="product-price" style={{ width: '31%' }}>Price</div>
        </li>
        {list.map((product) => <ProductElement key={product.id} product={product} />)}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
