import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import ClientAdd from './core/client/clie'
import * as ROUTE_LINKS from './api/ui_routes'


import { withRouter } from "react-router";
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAtom, faSpinner, } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Card, FormGroup, FormControl, ListGroup, ListGroupItem, FormLabel, Container, Col, Row, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavigation from './common/top_nav'
import SideNavigation from './common/side_nav'
import Item from './core/items/item'
import ItemList from './core/items/item_list'
import Documents from './core/documents'
import DocumentsEdit from './core/documents_edit'
import DocumentDetail from './core/document_detail'


import Welcome from './core/welcome'
import LoginPage from './core//login_page'

import { Sidenav, Nav, Icon } from 'rsuite';
import { useHistory } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function loginPage(){
  // const history = useHistory();
  return (
    <div className="App">
     
    <Container fluid>
      <TopNavigation />
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <SideNavigation />
          </Col>
          <Col xs={10} id="sidebar-wrapper">
         <LoginPage />
          </Col>
          </Row>
          </Container>
          </div>
  );
}
function App() {
  // localStorage.removeItem("Authenticated")
  var autneticated = localStorage.getItem("AuthorizationToken")||''
  if(autneticated==''){
    console.log(" Authenticated ......")
    return loginPage();
  }
  console.log(" Authenticated or not ......")
  return (
    <div className="App">
      <Container fluid>
        <TopNavigation />
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <SideNavigation />

          </Col>
          <Col xs={10} id="page-content-wrapper">

            <Route path={ROUTE_LINKS.ADD_ITEM} component={Item} />
            <Route path={ROUTE_LINKS.EDIT_ITEM} component={Item} />
            <Route path={ROUTE_LINKS.ALL_INVENTORY_ITEMS_LINK} component={ItemList} />


            <Route path={ROUTE_LINKS.WELCOME} component={Welcome} />
            <Route path={ROUTE_LINKS.LOGIN} component={LoginPage} />
            <Route path={ROUTE_LINKS.DOCUMENTS} component={Documents} />
            <Route path={ROUTE_LINKS.DOCUMENTS_EDIT} component={DocumentsEdit} />
            <Route path={ROUTE_LINKS.DOCUMENTS_DETAIL} component={DocumentDetail} />
            {/* <PrivateRoute path={ROUTE_LINKS.ALL_INVENTORY_ITEM_MAKERS_LINK} component={ItemMakerList} /> */}

          </Col>
        </Row>

        <Card>

        </Card>
        <Card>


        </Card>
      </Container>
    </div>
  );
}

// export default () => (

//   <div>
//     <Router>
//       <Route component={App} />
//     </Router>
//   </div>
// );

// export default withRouter(({ location, ...props }) => {
export default () => {
  const history = useHistory();

  return (
    <div>
      <Router>
        <Route component={App} />
      </Router>
    </div>
  )
};
