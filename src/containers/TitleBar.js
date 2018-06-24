import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import SearchBar from "../components/SearchBar";
import UserService from "../services/UserService";


export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Yelper Helper</NavbarBrand>
          <SearchBar/>

          <NavbarToggler onClick={this.toggle.bind(this)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
              {this.props.currentUser.username &&
              <NavItem>
                <NavLink href="/logout">Logout</NavLink>
              </NavItem>}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

