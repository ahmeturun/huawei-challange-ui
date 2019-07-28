import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import Authentication from './../common/authentication.js';

export default class NavbarComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            redirectToLogin: false
        };
    }

    handleSelect = async (selectedKey) => {
        switch (selectedKey) {
            case 1:
                await Authentication.logout().then(() => {
                    this.setState(() => ({
                        redirectToLogin: true
                      }));
                });
            default:
        }
    }
    render() {
        if(!Authentication.checkUser() || this.state.redirectToLogin === true){
            return <Redirect to='/signin' />
        }
        return Authentication.checkUser() ? (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="#">ToDo List App</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav onSelect={this.handleSelect} pullRight>
                    <NavItem eventKey={1} className="logoutBtn">Logout</NavItem>
                </Nav>
            </Navbar>
        )
        : null
    }
}