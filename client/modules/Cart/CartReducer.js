/**
 * Created by alex on 09.10.16.
 */
import { ADD_TO_CART, REPLACE_CART, CACHE_KEY, REMOVE_FROM_CART } from './CartActions';
import { getProduct } from '../Product/ProductReducer';

// Initial State
const initialState = {};

const CartReducer = (state = initialState, action) => {
  let newCart;
  switch (action.type) {

    case ADD_TO_CART:
      newCart = state;
      if (state[action.productCuid]) {
        let product = state[action.productCuid];
        newCart = {
          ...state,
          [action.productCuid]: { ...product, count: product.count + 1 }
        };
      } else {
        newCart = {
          ...state,
          [action.productCuid]: { count: 1 }
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REMOVE_FROM_CART:
      newCart = state;
      if (state[action.productCuid]) {
        let product = state[action.productCuid];
        delete state[action.productCuid];
        if (product.count < 2) {
          newCart = { ...state }
        } else {
          newCart = {
            ...state,
            [action.productCuid]: { ...product, count: product.count - 1 }
          }
        }
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REPLACE_CART:
      return action.cart || state;

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getCart = state => state.cart;

export const getProductsCount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    return sum + parseFloat(state.cart[key].count);
  }, 0);
};

export const getOrdersAmount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    let product = getProduct(state, key);
    if (!product) return sum;
    return sum + parseFloat(state.cart[key].count) * product.price;
  }, 0);
};

// Export Reducer
export default CartReducer;
