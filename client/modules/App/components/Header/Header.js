import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import CartWidget from '../../../Cart/components/CartWidget/CartWidget'

import { ModalContainer, ModalDialog } from 'react-modal-dialog';
// Import Style
import styles from './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { isShowingModal: false }
  }

  handleClick = () => this.setState({ isShowingModal: true });

  handleClose = () => this.setState({ isShowingModal: false });

  render() {
    const languageNodes = this.props.intl.enabledLanguages.map(
      lang => <li key={lang} onClick={() => this.props.switchLanguage(lang)}
                  className={lang === this.props.intl.locale ? styles.selected : ''}>{lang}</li>
    );

    return (
      <div className={styles.header}>
        <Link to="/products">Products</Link>
        <div className={styles['language-switcher']}>
          <ul>
            <li><FormattedMessage id="switchLanguage"/></li>
            {languageNodes}
          </ul>
        </div>
        <div onClick={this.handleClick}><FormattedMessage id="cart"/> {this.props.cartProductsCount}</div>
        <div className={styles.content}>
          <h1 className={styles['site-title']}>
            <Link to="/"><FormattedMessage id="siteTitle"/></Link>
          </h1>
          {
            this.context.router.isActive('/', true)
              ? <a className={styles['add-post-button']} href="#" onClick={this.props.toggleAddPost}><FormattedMessage
              id="addPost"/></a>
              : null
          }
        </div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <CartWidget/>
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
