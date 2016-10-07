/**
 * Created by alex on 23.09.16.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, REPLACE_PRODUCT } from './ProductActions';

// Initial State
const initialState = { data: [], searchQuery: '' };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCTS:
      return {
        ...state,
        data: action.products,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case REPLACE_PRODUCT:
      return {
        ...state,
        data: state.data.map(obj => action.product.cuid === obj.cuid ? action.product : obj)
      };
    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, name = '') => {
  name = name.trim()
  return name === '' ? state.products.data : state.products.data.filter(product =>  `${product.name} ${product.price}`.indexOf(name) > -1)
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
