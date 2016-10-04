/**
 * Created by alex on 03.10.16.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './CategoriesBar.css';

function CategoriesBar(props) {
  return (
    <div>
      <h3 className={styles.header}><FormattedMessage id="categoriesBarHeader"/></h3>
      <ul className={styles['categories-list']}>{
        props.categories.map(category => (
          <li key={category.cuid} onClick={props.onSelect.bind(null, category.cuid)}>{category.name}</li>
        ))
      }
      </ul>
    </div>

  )
}

CategoriesBar.defaultProps = {
  categories: []
};

export default CategoriesBar;
