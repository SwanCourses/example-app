/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './modules/App/App';
import Product from './modules/Product/Product';

import { isAdmin } from './util/apiCaller';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
 https://github.com/reactjs/react-router/issues/2182 and
 https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Product/pages/ProductFormPage/ProductFormPage');
  require('./modules/Product/pages/ProductDetailPage/ProductDetailPage');
  require('./modules/User/pages/RegistrationPage/RegistrationPage');
  require('./modules/Product/pages/ProductListPage/ProductListPage');
  require('./modules/User/pages/SignInPage/SignInPage');
}

function requireAdmin(nextState, replace) {
  if (!isAdmin())
    replace('/sign_in')
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/products"/>
    <Route
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/registration"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/RegistrationPage/RegistrationPage').default);
        });
      }}
    />
    <Route
      path="/sign_in"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/SignInPage/SignInPage').default);
        });
      }}
    />
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
    <Route
      path="/categories/new"
      onEnter={requireAdmin}
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Category/pages/CategoryFormPage/CategoryFormPage').default);
        });
      }}
    />
    <Route path="/products" component={Product}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Product/pages/ProductListPage/ProductListPage').default);
          });
        }}
      />
      <Route
        path="new"
        onEnter={requireAdmin}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Product/pages/ProductFormPage/ProductFormPage').default);
          });
        }}
      />
      <Route
        path=":cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Product/pages/ProductDetailPage/ProductDetailPage').default);
          });
        }}
      />
      <Route
        path=":cuid/edit"
        onEnter={requireAdmin}
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Product/pages/ProductFormPage/ProductFormPage').default);
          });
        }}
      />
    </Route>
  </Route>
);
