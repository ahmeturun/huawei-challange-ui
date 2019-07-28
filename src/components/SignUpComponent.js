import React from 'react';

import { Button, Modal, FormGroup , FormControl, ControlLabel, Panel } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent.js';

import Authentication from './../common/authentication.js';

import { Redirect } from 'react-router-dom';

import './SignUpForm.css';

function validate(email, username, password) {
    // true means invalid, so our conditions got reversed
    return {
      email: email.length === 0, //true if email is empty
      username: username.length === 0, //true if username is empty
      password: password.length === 0, //true if password is empty
    };
}
  
export default class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      
      touched: {
        email: false,
        username: false,
        password: false,
      },
      show: false,
      value: '',
      toListView: false,
      loginName: '',
      loginPass: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // check if user is already logged in
    if(sessionStorage.getItem('sessionId')){
      this.setState(() => ({
        toListView: true
      }))
    }
  }
  
  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  }
  
  handleUsernameChange = (evt) => {
    this.setState({ username: evt.target.value });
  }
  
  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  }
  
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  
  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  hadleLogin = (e) => {
    const { loginName, loginPass } = this.state;

    fetch(`http://localhost:8090/Login?name=${loginName}&password=${loginPass}`,{
      method: 'POST'
    })
      .then((response) => {
        if (response.ok) {
          response.text().then((res) => {
            Authentication.setUser(res, this.state.loginName);
            this.setState(() => ({
              toListView: true
            }))
          });
        }
        else {
          response.text().then((res) => {
            alert(JSON.parse(res).error);
          });
        }
      });
  }

  handleLoginNameChange = (e) => {
    this.setState({loginName: e.target.value});
  }

  handleLoginPassChange = (e) => {
    this.setState({loginPass: e.target.value});
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }

    const { email, username, password } = this.state;

    fetch(`http://localhost:8090/Register?name=${username}&password=${password}`,{
      method: 'POST'
    })
      .then((response) => {
        if (response.ok) {
          response.text().then((res) => {
            Authentication.setUser(res, this.state.username);
            this.setState(() => ({
              toListView: true
            }))
          });
        }
        else {
          response.text().then((res) => {
            alert(JSON.parse(res).error);
          });
        }
      });
  }
  
  render() {
    const errors = validate(this.state.email, this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };

    if (this.state.toListView === true) {
      return <Redirect to='/lists' />
    }
    
    return (
      <div className="formContainer">
        <NavbarComponent></NavbarComponent>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Signin</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
          <form className="signUpForm" onSubmit={this.handleSubmit}>
            <input
              className={shouldMarkError('email') ? "error" : ""}
              type="text"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              onBlur={this.handleBlur('email')}
            />
            <span className={shouldMarkError('email') ? "error" : "hidden"}
            >invalid email</span>
            
              <input
              className={shouldMarkError('username') ? "error" : ""}
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleBlur('username')}
            />
            <span className={shouldMarkError('username') ? "error" : "hidden"}
            >invalid username</span>
            
            
            <input
              className={shouldMarkError('password') ? "error" : ""}
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onBlur={this.handleBlur('password')}
            />
            <span className={shouldMarkError('password') ? "error" : "hidden"}
            >invalid password</span>
            
            <Button bsStyle="primary" type="submit" disabled={isDisabled}>Sign up</Button>
            <br /><br />
            <span><i className="inputItem">Already have an account?</i></span>
            <Button onClick={this.handleShow}>
              Log in
            </Button>
            <Modal bsSize="small" show={this.state.show} style={{opacity:1}} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}>
                    <ControlLabel>User Name</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.loginName}
                      placeholder="user name"
                      onChange={this.handleLoginNameChange}/>
                    <FormControl.Feedback />
                    <br />
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      type="password"
                      value={this.state.loginPass}
                      placeholder="password"
                      onChange={this.handleLoginPassChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <div className="loginSubmit">
                    <Button type="submit" bsStyle="primary" block onClick={this.hadleLogin}>Log in</Button>
                  </div>
              </Modal.Body>
            </Modal>
          </form>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
  