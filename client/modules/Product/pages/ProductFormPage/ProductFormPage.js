/**
 * Created by alex on 23.09.16.
 */
import React, { Component } from 'react'

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest, updateProductRequest }from '../../ProductActions';
import { getProduct } from '../../ProductReducer';
import  styles from './ProductFormPage.css'

class ProductFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = props.product || {}
  }

  onChange = (e)=> {
    this.setState({ [e.target.name]: e.target.value });
  };

  addProduct = ()=> {

    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);

    for (let i = 0, file; file = this.refs.photos.files[i]; i++) {
      form.append('product[photos]', file, file.name);
    }

    this.props.dispatch(!this.props.product ? addProductRequest(form) : updateProductRequest(this.props.product.cuid, form))
  };

  isEdit = ()=> {
    return !!this.props.product
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} disabled={this.isEdit()} name="code"/>
          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <input ref="photos" type="file" onChange={this.onFileLoad} multiple="multiple"/>
          <div className={styles.photos}>
            {
              this.state.photos.map(photo =>(
                <div key={photo.fileName} className={styles.picture}>
                  <img src={`/uploads/products/art_${this.props.product.code}/${photo.fileName}`}/>
                </div>
              ))
            }
          </div>
          <div className={styles['post-submit-button']} onClick={this.addProduct}>
            <FormattedMessage id={this.isEdit() ? 'edit' : 'submit'}/>
          </div>
        </div>
      </div>
    )
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(store, props) {
  return {
    product: getProduct(store, props.params.cuid),
  };
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
