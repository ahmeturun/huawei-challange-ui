import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import ProtectedRoute from './ProtecteRouteComponent.js';
import SignUpComponent from './SignUpComponent.js';
import ListViewerComponent from './ListViewerComponent.js';

export default class AllRoutes extends React.Component {
    render() {
      return (
        <Router>
            <div>
                <Route exact path="/signin" component={SignUpComponent} />
                <ProtectedRoute path="/lists" component={ListViewerComponent} />
                <ProtectedRoute path="/*" component={SignUpComponent} />
            </div>
        </Router>
      )
    }
}