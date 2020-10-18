import React, { Component } from 'react';
import { Button, Form, Navbar, FormGroup, Nav, FormControl, NavDropdown, ListGroup, ListGroupItem, FormLabel, Container, Col, Row } from "react-bootstrap";
// import Sidebar from 'react-bootstrap-sidebar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAtom, faSpinner, } from "@fortawesome/free-solid-svg-icons";
import * as ROUTE_LINKS from '../api/ui_routes'
import { useHistory } from 'react-router';
import { withRouter } from "react-router";
class TopNavigation extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    console.log(this.props)
    localStorage.clear();
    // const history=useHistory()
    this.props.history.push(ROUTE_LINKS.LOGIN)

  }
  render() {
    var autneticated = (localStorage.getItem("AuthorizationToken") || '') != ''

    return (
      //#1b97b8
      
      <Navbar className="ml-auto" bg="dark" variant="dark" expand="lg" style={{alignSelf:'left'}}>
        <FontAwesomeIcon icon={faAtom} spin  size="2x" color='white' speed="6x" title="helo">
        </FontAwesomeIcon>
        <Navbar.Brand style={{alignSelf:'left'}} href={ROUTE_LINKS.LOGIN}>&nbsp;&nbsp;Delivering what you need</Navbar.Brand>

        {autneticated &&
          <Navbar.Toggle aria-controls="basic-navbar-nav" />}

        {autneticated &&
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto" style={{ fontSize: 30, padding: 10 }}>
              <Nav.Link href={ROUTE_LINKS.WELCOME} >HOME</Nav.Link>
              <NavDropdown title="Assets" id="basic-nav-dropdown">
                <NavDropdown.Item href={ROUTE_LINKS.ADD_ITEM}>Add</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={ROUTE_LINKS.ALL_INVENTORY_ITEMS_LINK}>Asset List</NavDropdown.Item>

              </NavDropdown>
              <Nav.Link href={ROUTE_LINKS.REPORT} style={{ fontSize: 30 }}>Report</Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href={ROUTE_LINKS.ALL_INVENTORY_ITEM_TYPES_LINK}>Asset Types</NavDropdown.Item>
                <NavDropdown.Item href={ROUTE_LINKS.ADD_ITEM_TYPE}>Add New Type..</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={ROUTE_LINKS.ALL_INVENTORY_ITEM_MAKERS_LINK}>Makers</NavDropdown.Item>
                <NavDropdown.Item href={ROUTE_LINKS.ADD_ITEM_MAKER}>Add New Maker..</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={ROUTE_LINKS.ALL_INVENTORY_LOCATIONS_LINK}>Locations</NavDropdown.Item>
                <NavDropdown.Item href={ROUTE_LINKS.ADD_LOCATION}>Add New Location..</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={this.handleLogout} style={{ fontSize: 30 }}>Logout</Nav.Link>

            </Nav>



          </Navbar.Collapse>
        }
      </Navbar>

    );
  }
}


export default withRouter(({ location }) => {
  const history = useHistory();
  return (
    <TopNavigation location={location} history={history} />
  )
});