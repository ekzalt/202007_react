import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Product } from '../../models';
import { productsActions } from '../../store/actions';
import { ProductList, ProductForm } from '../index';
import './App.css';

/**
 * @typedef IProductsState
 * @property {Product[]} list
 * @property {number} total
 * @property {number} selected
 */

class App extends React.PureComponent {

  static propTypes = {
    products: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.instanceOf(Product)),
      total: PropTypes.number,
      selected: PropTypes.number,
    }),
    productsActions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    /** @type {IProductsState} */
    products: {
      /** @type {Product[]} */
      list: [],
      total: 0,
      selected: 0,
    },
  };

  deleteSelectedProducts = () => {
    if (!this.props.products.list.find(({ selected }) => selected)) {
      return;
    }

    this.props.productsActions.deleteSelectedProducts();
  };

  render() {
    const { total, selected } = this.props.products;

    return (
      <main>
        <ProductList />
        <button
          className="product-form-button"
          onClick={this.deleteSelectedProducts}>
          Delete Selected
        </button>
        <p className="total-price">
          Total price: {total}, selected price: {selected}
        </p>
        <ProductForm />
      </main>
    );
  }
}

/**
 * @param {{ products:IProductsState }} state
 */
export const mapStateToProps = ({ products }) => ({
  products,
});

/**
 * @param {Function} dispatch
 */
export const mapDispatchToProps = (dispatch) => ({
  productsActions: bindActionCreators(productsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
