import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App.js';
import SignUp from './src/components/SignUpComponent.js/index.js';
// import SomePage from './components/SomePage';
// import SomeOtherPage from './components/SomeOtherPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={SignUp} />
    {/* <Route path="/some/where" component={SomePage} />
    <Route path="/some/otherpage" component={SomeOtherPage} /> */}
  </Route>
);