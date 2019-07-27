import React, { Component } from 'react';
import SignUpForm from './src/components/SignUpComponent.js';
import './src/components/SignUpForm.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component{
   render(){
      return(
         <div>
            <h1>ToDo List Manager</h1>
            <SignUpForm></SignUpForm>
         </div>
      );
   }
}

export default App;