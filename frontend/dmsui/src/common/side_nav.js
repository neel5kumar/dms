import React, { Component } from 'react';
import { Button, Form, Navbar, FormGroup, Nav, FormControl, NavDropdown, ListGroup, ListGroupItem, FormLabel, Container, Col, Row } from "react-bootstrap";
// import Sidebar from 'react-bootstrap-sidebar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAtom, faSpinner, faSmile} from "@fortawesome/free-solid-svg-icons";
import { requirePropFactory } from '@material-ui/core';
export default class SideNavigation extends Component {

  render() {
    return (
      //#1b97b8
      <div>
         <img style={{ width: 70, height: 70}} src={require('../resources/img/sujata.jpg')}></img>
         {/* <img style={{ width: 70, height: 70}} src="http://localhost:8000/media/profile_logo/sujata.jpeg"></img> */}
        
      
      <Navbar bg="light" >
          
      <Nav  defaultActiveKey="/home" className="flex-column">
        <Nav.Link className="mr-auto" href="/home">Contact us</Nav.Link>
        {/* <Nav.Link eventKey="disabled" disabled>
          Disabled
  </Nav.Link> */}
      </Nav>
      </Navbar>
      </div>

    );
  }
}