/**
 * Created by alex on 13.10.16.
 */
import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Import Style
import styles from './SignInPage.css';
import { signInRequest }from '../../UserActions'

export class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signIn = ()=> {
    let user = { email: this.state.email, password: this.state.password };
    this.props.dispatch(signInRequest(user))
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="loginForm"/></h2>
          <input placeholder={this.props.intl.messages.userLogin} value={this.state.email} onChange={this.onChange}
                 className={styles['form-field']} name="email"/>
          <input placeholder={this.props.intl.messages.userPassword} value={this.state.password}
                 onChange={this.onChange}
                 className={styles['form-field']} name="password" type="password"/>
          <a className={styles['post-submit-button']} href="#" onClick={this.signIn}><FormattedMessage
            id="submit"/></a>
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(SignInPage));
