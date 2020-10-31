import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  faHome, faAtom, faSave, faClock,
  faCalendarAlt, faAddressCard, faFilePdf, faUserTie, faWarehouse,
  faChartBar, faClone, faDatabase
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button, Form, Card, Navbar, Nav,
  FormGroup, FormControl, ListGroup, ListGroupItem, FormLabel, Container, Col, Row
} from "react-bootstrap";
import ReactDOM from 'react-dom';
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import * as API_END_POINTS from '../api/api_end_points'
import ApiHelper from '../common/api_helper'
import RestRequest from '../common/rest_request'
import * as ResponseStatus from '../common/response_status'
import * as ROUTE_LINKS from '../api/ui_routes'
const apiEndPoints = API_END_POINTS.INVENTORY_ITEM_MAKERS_END_POINT;

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'NEW', loginMsg: "" };
    // console.log(this.props.location.objectRef);
    if (this.props.location.objectRef) {
      this.state = { mode: 'EDIT', loginMsg: "" }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)

  }


  isNewItem() {
    return this.state.mode == "NEW"
  }
  getObjectRefId() {
    return this.props.location.objectRef.id;
  }
  componentDidMount() {

    if (this.isNewItem()) {
      return;
    }
    var id = this.getObjectRefId();
    var url = apiEndPoints.getOneUrl(id);
    this.fetchAndPopulateOne(url)
  }

  deleteEntry = async (event) => {
    this.setState({ savingMsg: "Deleting...." });
    const response = await ApiHelper.deleteOneEntry(apiEndPoints, this.getObjectRefId())
    console.log("resopnse---->")
    this.setState({ savingMsg: "Deleted" });
    event.preventDefault();
  }

  fetchAndPopulateOne(url) {
    ApiHelper.submit(RestRequest.restRequest("GET", url, apiEndPoints.getHeaders()))
      .then(response => response.json())
      .then(json => {
        Object.keys(json).forEach(key => {
          console.log(key, json[key])
        })
        return json;
      })
      .then(response => {
        Object.keys(response).forEach(key => {
          this.setState({ [key]: response[key] })
        })
      });
  }



  // handleChange = (event) => {
  //   let key = event.target.name
  //   var obj = {}
  //   obj[key] = event.target.value
  //   this.setState({ [event.target.id]: event.target.value });
  //   // this.tryLoginIn = this.tryLoginIn.bind(this);
  // }

  handleClear() {
    console.log(this)
    // ReactDOM
    ReactDOM.findDOMNode(this.messageForm).reset();
    // this.refs.username.value=""
    // this.refs.password.value=""
    this.setState({
      'username': "",
      'password': ""
    })
  }

  tryLoginIn = async (event) => {
    console.log('trying to login ---> ')
    console.log(this.state)
    var user = this.state.username
    var password = this.state.password
    var authResult = {}
    ApiHelper.tryLoggingIn(user, password)
      .then(received => {
        if (received.status == ResponseStatus.UnAuthorised) {
          this.setState({ loginMsg: "Login Failed" })
        }
        else {
          console.log(received)
          authResult = received
          localStorage.setItem('AuthorizationToken', 'Token ' + authResult.token)
          console.log("localStorage")
          console.log(authResult)
          this.props.history.push("/welcome-dashboard")
        }


      });

    // localStorage.setItem("Authenticated",authResult=="Authorised")
  }
  handleChange(event) {
    console.log(event.target)
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  savingMessage() {
    if (this.isNewItem()) {
      return "Saving.."
    }
    else {
      return "Saving.."
    }

  }

  renderIconSpin(icon, text, iconColor, size,margin2, padding2) {
    console.log("margin2"+margin2)
    return (
      <div style={{ margin: margin2, padding: padding2, }}>
        <div style={{textAlign:'center' }}>
          <FontAwesomeIcon icon={icon} spin size={size} color={iconColor} speed="6x" title="helo"  >
          </FontAwesomeIcon>
        </div>
        <div style={{  }}>
          <text >
            {text}
          </text>
        </div>
      </div>
    );
  }

  renderIcon(icon, text, iconColor, size,margin2, padding2) {
    console.log("margin2"+margin2)
    return (
      <div style={{ margin: margin2, padding: padding2 }}>
        <div style={{textAlign:'center' }}>
          <FontAwesomeIcon icon={icon}  size={size} color={iconColor} speed="6x" title="helo">
          </FontAwesomeIcon>
        </div>
        <div style={{ alignSelf: 'center' }}>
          <text>
            {text}
          </text>
        </div>
      </div>
    );
  }


  render() {
    // let { id2 } = use();
    const classes = this.props.classes;
    var id = ""
    return (
      <div align="left" style={{height:'100%',verticalAlign:'top',alignItems:'flex-start',}}>

        <div style={{ flex: 1, flexDirection: 'row',verticalAlign:'top',justifyContent:'flex-start'}}>
          <Card style={{ flex: 1, flexDirection: 'row' ,backgroundColor:'red'}}>
            <Card style={{flex:1,alignItems:'flex-start'}}>
            <Card style={{ flex: 1, flexDirection: 'row' ,borderWidth:0 }}>
           
              <Nav.Item>

                <Nav.Link style={{ fontSize: 20 }} href="/home">Employee</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">Manage, Timesheet,..</Nav.Link>
              </Nav.Item>
              
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
            
              <Nav.Item>
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Document</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">View, Add, Edit..</Nav.Link>
              </Nav.Item>
              
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
              <Nav.Item>
             
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Invoice</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">View, Add, Edit..</Nav.Link>
              </Nav.Item>
              
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'column',borderWidth:0 }}>
            {this.renderIcon(faAddressCard, "Assets", 'black','4x',10,10)}
            <Nav.Item>
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Document</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">View, Add, Edit..</Nav.Link>
              </Nav.Item>

            {this.renderIcon(faUserTie, "Clients", 'black','2x',10,10)}
            {this.renderIcon(faChartBar, "Analytics", 'black','2x',10,10)}
              {/* <Nav.Item>
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Customer</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">Manage, Billing..</Nav.Link>
              </Nav.Item> */}
              
            </Card>
            </Card>
            <Card  style={{ width:'70%',alignItems:'center',}}>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
            {this.renderIcon(faAddressCard, "Employee", '#33A2FF','4x',20,10)}
            {this.renderIcon(faClone, "Documents", '#33A2FF','4x',20,10)}
            {this.renderIcon(faCalendarAlt, "TimeSheet", '#33A2FF','4x',20,10)}
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
            {this.renderIconSpin(faAtom, "Delierying Solutions", '#33A2FF','5x',10,10)}
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
            {this.renderIcon(faWarehouse, "Assets", 'black','4x',10,10)}
            {this.renderIcon(faUserTie, "Clients", 'black','4x',10,10)}
            {this.renderIcon(faChartBar, "Analytics", 'black','4x',10,10)}
            </Card>
            </Card>
            
            <Card style={{justifyContent:'flex-start'}}>
            <Card style={{ flex: 1, flexDirection: 'row' ,borderWidth:0 }}>
           
              <Nav.Item>

                <Nav.Link style={{ fontSize: 20 }} href="/home">Employee</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">Manage, Timesheet,..</Nav.Link>
              </Nav.Item>
              
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
            
              <Nav.Item>
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Document</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">View, Add, Edit..</Nav.Link>
              </Nav.Item>
              
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
              <Nav.Item>
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Assets</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">Manage, View, Edit..</Nav.Link>
              </Nav.Item>
              
            </Card>
            <Card  style={{ flex: 1, flexDirection: 'row',borderWidth:0 }}>
              <Nav.Item>
               
                <Nav.Link style={{ fontSize: 20 }} href="/home">Billings</Nav.Link>
                <Nav.Link style={{ fontSize: 12 }} href="/home">Notification, Management</Nav.Link>
              </Nav.Item>
              
            </Card>
            </Card>

          </Card>


        
        </div>
        
      </div >

    );
  }

}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const useStyles2 = makeStyles((theme) => ({
  root2: {
    margin: theme.spacing(1),
    width: '25ch',
  },
}));


export default withRouter(({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <WelcomePage location={location} classes={classes} history={history} />
  )
});
