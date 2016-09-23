/**
 * Created by alex on 23.09.16.
 */

import callApi, { callApiForm } from '../../util/apiCaller';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addProductRequest(form) {
  return (dispatch) => {
    return callApiForm('products', 'post', form).then(res => dispatch(addProduct(res.product)));
  };
}
