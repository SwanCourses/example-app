/**
 * Created by alex on 09.10.16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getCart, getOrdersAmount } from '../../CartReducer';
import { getCategory } from '../../../Category/CategoryReducer';
import { removeFromCart } from '../../CartActions';
import { getProduct } from '../../../Product/ProductReducer'

class CartWidget extends Component {

  removeProductFromCart = (cuid)=> {
    this.props.dispatch(removeFromCart(cuid));
  }

  render() {
    return (
      <div>
        {
          this.props.products.map(product => (
            <div>
              <div>{`${product.code}${this.props.cart[product.cuid].count} x ${product.price} = ${this.props.cart[product.cuid].count * product.price}`}
                <span
                  onClick={this.removeProductFromCart.bind(null, product.cuid)}>Удалить</span></div>
            </div>
          ))
        }
        <div>Сумма заказа: {this.props.ordersAmount}</div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  let cart = getCart(state);
  let ordersAmount = getOrdersAmount(state);
  let products = Object.keys(cart).map(productCuid => {
    let product = getProduct(state, productCuid);
    return {...product, category: getCategory(state, product.category)};
  });
  return {
    cart,
    products,
    ordersAmount
  };
}

export default connect(mapStateToProps)(CartWidget);
