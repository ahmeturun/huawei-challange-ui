import React from 'react';
import ReactDOM from 'react-dom';
import AllRoutes from './src/components/AllRoutesComponent.js';

import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <AllRoutes></AllRoutes>
  )

ReactDOM.render(routing, document.getElementById('app'));