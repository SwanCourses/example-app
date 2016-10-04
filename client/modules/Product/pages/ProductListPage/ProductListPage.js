/**
 * Created by alex on 27.09.16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

import { Link } from 'react-router';
import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';

import { getCategories } from '../../../Category/CategoryReducer';
import { setSearchQuery } from '../../ProductActions';

import CategoriesBar from '../../../../components/CategoriesBar/CategoriesBar';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' }
  }

  componentDidMount() {
    this.setState({ products: this.props.products });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                 onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>

          <CategoriesBar {...this.props} onSelect={cuid=>alert(cuid)}/>
        </div>
        <Link to="/products/new">New product</Link>

        <div className={styles.products}>
          {
            this.props.products.map(product=> (
              <div key={product.cuid} className={styles.product}>
                <ProductListItem key={product.cuid} {...product}/>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
    searchQuery: state.products.searchQuery,
    products: getProducts(state, state.products.searchQuery),
  };
}

export default connect(mapStateToProps)(ProductListPage);
