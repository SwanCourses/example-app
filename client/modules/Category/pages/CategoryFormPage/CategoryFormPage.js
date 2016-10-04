import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Import Style
import styles from './CategoryFormPage.css';
import { addCategoryRequest }from '../../CategoryActions';

export class CategoryFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addCategory = ()=> {
    let category = {name: this.state.name};
    this.props.dispatch(addCategoryRequest(category));
  };


  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewCategory"/></h2>
          <input placeholder={this.props.intl.messages.categoryName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <a className={styles['post-submit-button']} href="#" onClick={this.addCategory}><FormattedMessage id="submit"/></a>
        </div>
      </div>
    );
  }
}

CategoryFormPage.propTypes = {
  intl: intlShape.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(CategoryFormPage));
/**
 * Created by alex on 21.09.16.
 */
