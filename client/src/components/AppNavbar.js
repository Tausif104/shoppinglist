import React, { Component, Fragment } from 'react';
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
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavBar extends Component  {
    state = {
        isOpen: false
    };
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text welcome-text">
                        <strong>{user ? `Welcome ${user.name}` : '' }</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )
        return (
          <div className="navbar-section">
              <div className="container">
                  <div className="row">
                      <div className="col-xl-12">                    
                          <Navbar color="light" light expand="md">
                              <NavbarBrand href="/">ShoppingList</NavbarBrand>
                              <NavbarToggler onClick={this.toggle} />
                              <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {isAuthenticated ? authLinks : guestLinks}
                                </Nav>
                              </Collapse>
                          </Navbar>
                      </div>
                  </div>
              </div>
          </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavBar);
