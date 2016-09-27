/**
 * Created by alex on 15.09.16.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './ProductListItem.css';

function ProductListItem(props) {
  return (
    <div className={styles.container}>
      <Link to={`/products/${props.cuid}`}>
        <div className={styles.picture}><img src={`/uploads/products/art_${props.code}/${props.photos[0] ? props.photos[0].fileName : ''}`}/></div>
        <div className={styles.info}>{props.name} | {props.price}грн</div>
      </Link>
    </div>
  );
}

ProductListItem.propTypes = {};

export default ProductListItem;
