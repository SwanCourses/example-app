import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { fetchProducts } from './ProductActions';

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.dispatch(fetchProducts());
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return this.props.children;
  }
}
// Actions required to provide data for this component to render in sever side.
Product.need = [() => {
  return fetchProducts();
}];

Product.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect(mapStateToProps)(Product);
