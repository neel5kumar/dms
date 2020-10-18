import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { faHome, faAtom, faSave, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Card, FormGroup, FormControl, ListGroup, ListGroupItem, FormLabel, Container, Col, Row } from "react-bootstrap";
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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'NEW', loginMsg: "" };
    // console.log(this.props.location.objectRef);
    if (this.props.location.objectRef) {
      this.state = { mode: 'EDIT', loginMsg: "" }
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleClear=this.handleClear.bind(this)

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

  handleClear(){
    console.log( this)
    // ReactDOM
    ReactDOM.findDOMNode(this.messageForm).reset();
    // this.refs.username.value=""
    // this.refs.password.value=""
    this.setState({
      'username':"",
      'password':""
    })
  }

  tryLoginIn = async (event) => {
    console.log('trying to login ---> ')
    console.log(this.state)
    var user=this.state.username
    var password=this.state.password
    var authResult={}
    ApiHelper.tryLoggingIn(user,password)
    .then(received=>{
      if(received.status==ResponseStatus.UnAuthorised){
        this.setState({loginMsg:"Login Failed"})
      }
      else{
        console.log(received)
        authResult=received
        localStorage.setItem('AuthorizationToken','Token '+authResult.token)
        console.log("localStorage")
        console.log(authResult)
        this.props.history.push("/welcome-dashboard")
      }

     
    });
   
    // localStorage.setItem("Authenticated",authResult=="Authorised")
  }
  handleChange(event){
    console.log(event.target)
    this.setState({
      [event.target.name]:event.target.value
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



  render() {
    // let { id2 } = use();
    const classes = this.props.classes;
    var id = ""
    return (
      <div align="left">
        <div>
          <h2 className="card-header">Login to IT Solutions </h2>
          <br />
        </div>
        <form   id='loginForm' 
        ref={ form => this.messageForm = form }
        className={classes.root} noValidate autoComplete="off">
          <div >
            <TextField
              label="Login"
              ref='username'
              name='username'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />


          </div>
          <div>
            <TextField
              label="Password"
              ref="password"
              type="password"
              name='password'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
          </div>



          <div>
            <Button style={{ textAlign: 'center' }} variant="success" onClick={this.tryLoginIn}>
              Login {' '}
            </Button>

            <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.handleClear()}>
              Clear {' '}
            </Button>
            <text style={{color:'red'}}> {this.state.loginMsg}</text>
            {/* <input type="reset" defaultValue="Reset" />   */}


          </div>

        </form>
      </div>

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
    <LoginPage location={location} classes={classes} history={history} />
  )
});
