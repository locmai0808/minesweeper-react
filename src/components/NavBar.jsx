import React, {Component} from 'react';
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';

export class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <img
            alt=""
            src="../logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {' MineSweeper'}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <NavbarBrand>Loc Mai</NavbarBrand>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
