import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styles from './ProductDetailPage.css';


import { isAdmin } from '../../../../util/apiCaller';
import { addToCart } from '../../../Cart/CartActions'
import { Link } from 'react-router';
// Import Selectors
import { getProduct } from '../../ProductReducer';

export class ProductDetailPage extends Component {
  salesPrice = ()=>{
    return this.props.product.price * 0.95
  }
  addProductToCart = () => {
    this.props.dispatch(addToCart(this.props.product.cuid))
  };
  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <div className={styles.photos}>{
            this.props.product && this.props.product.photos.map((photo) => {
              return (<div className={styles.picture}><img src={`/uploads/products/art_${this.props.product.code}/${photo.fileName}`}/></div>);
            })
          }
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            {isAdmin() && <Link to={`/products/${this.props.product.cuid}/edit`}><FormattedMessage id="edit"/></Link>}
            <div onClick={this.addProductToCart}>
              <FormattedMessage id="order"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
/**
 * Created by alex on 16.09.16.
 */
