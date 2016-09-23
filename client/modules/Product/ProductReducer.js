/**
 * Created by alex on 23.09.16.
 */

import { ADD_PRODUCT } from './ProductActions';

// Initial State
const initialState = { data: [] };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = state => state.products.data;

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
