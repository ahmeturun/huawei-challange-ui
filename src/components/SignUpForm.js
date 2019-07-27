import React, { Component } from 'react';

import {Button, Modal, Form, FormGroup , FormControl, ControlLabel} from 'react-bootstrap';
import {FieldGroup} from 'react-bootstrap';

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
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
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
  
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, username, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  }
  
  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  logInClick = (evt) => {
    evt.preventDefault();
    console.log("assss");
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
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
  
  render() {
    const errors = validate(this.state.email, this.state.username, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      
      return hasError ? shouldShow : false;
    };
    
    return (
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
        
        <Button bsStyle="primary" disabled={isDisabled}>Sign up</Button>
        <br />
        <span><i className="inputItem">Already have an account?</i></span>
        <Button variant="primary" onClick={this.handleShow}>Log in</Button>
        <Modal bsSize="small" show={this.state.show} style={{opacity:1}} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}>
                <ControlLabel>User Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="user name"
                  onChange={this.handleChange}/>
                <FormControl.Feedback />
                <br />
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="password"
                  onChange={this.handleChange}/>
                <FormControl.Feedback />
              </FormGroup>
              <div className="loginSubmit">
                <Button type="submit" bsStyle="primary" block>Log in</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </form>
    )
  }
}
  