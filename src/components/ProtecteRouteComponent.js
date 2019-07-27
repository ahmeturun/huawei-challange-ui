import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentication from './../common/authentication.js';

export default class ProtectedRoute extends React.Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            Authentication.checkUser() ?
              <Component {...props} /> :
              <Redirect to='/signin' />
          )} 
        />
      )
    }
}