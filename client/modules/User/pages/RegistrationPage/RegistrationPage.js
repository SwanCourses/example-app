/**
 * Created by alex on 13.10.16.
 */
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Import Style
import styles from './RegistrationPage.css';
import { addUserRequest }from '../../UserActions'

export class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addUser = ()=> {
    let user = { email: this.state.email, password: this.state.password };
    this.props.dispatch(addUserRequest(user))
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="registrationForm"/></h2>
          <input placeholder={this.props.intl.messages.userLogin} value={this.state.email} onChange={this.onChange}
                 className={styles['form-field']} name="email"/>
          <input placeholder={this.props.intl.messages.userPassword} value={this.state.password}
                 onChange={this.onChange}
                 className={styles['form-field']} name="password" type="password"/>
          <a className={styles['post-submit-button']} href="#" onClick={this.addUser}><FormattedMessage
            id="submit"/></a>
        </div>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(RegistrationPage));
/**
 * Created by alex on 21.09.16.
 */
