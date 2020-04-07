import React from 'react';
import { Route , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = props => {
  const { layout: Layout, component: Component,  ...rest } = props;
  console.log('props', props)
  return (
    <Route
      {...rest}
      render={({ location ,...matchProps}) =>
        props.isAuth ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

const mapStateToProps = state => ({
  isAuth: state.loginStatus
});

export default connect(mapStateToProps, null)(PrivateRoute);