import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { faHome, faAtom, faSave, faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Card, FormGroup, FormControl, ListGroup, ListGroupItem, FormLabel, Container, Col, Row } from "react-bootstrap";

import { useLocation } from "react-router-dom";
import { withRouter } from "react-router";

import * as API_END_POINTS from '../api/api_end_points'
import ApiHelper from '../common/api_helper'
import RefDataHub from '../common/ref_data_hub'
import RestRequest from '../common/rest_request'
import { useHistory } from "react-router-dom";
import * as ROUTE_LINKS from '../api/ui_routes'
import * as ResponseStatus from '../common/response_status'
import ReponseHandler from '../common/response_handler'
import { Link } from 'react-router-dom';

const apiEndPoints = API_END_POINTS.DOCUMENTS_ENDPOINT;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'NEW', savingMsg: "", itemLocations: [], itemMakers: [], itemTypes: [], itemMakers: [], savingLink: "",id:"" };
    if (this.props.location.objectRef) {
      this.state = { mode: 'EDIT', savingMsg: "", itemLocations: [], itemMakers: [], itemTypes: [], itemMakers: [],id:this.props.location.objectRef.id }
    }

  }


  isNewItem() {
    return this.state.mode == "NEW"
  }
  getObjectRefId() {
    return this.state.id;
  }

  fetchAndPopulate(fetchPromise, jsonKey, stateKey) {
    fetchPromise.then(items => {
      var locationNames = []
      items.forEach(item => {
        locationNames.push(item[jsonKey])
      });
      this.setState({ [stateKey]: locationNames })
    })
  }
  fetchAndPopulateState(fetchPromise, stateKey) {
    fetchPromise.then(items => {
      this.setState({ [stateKey]: items })
    })
  }
  componentDidMount() {
    // this.fetchAndPopulateState(RefDataHub.fetchAllLocationNames(), 'itemLocations')
    // this.fetchAndPopulateState(RefDataHub.fetchAllMakerNames(), 'itemMakers')
    // this.fetchAndPopulateState(RefDataHub.fetchAllItemTypeNames(), 'itemTypes')

    if (this.isNewItem()) {
      this.loadRef();
      return;
    }
    this.loadExising();
  }
  loadRef(){

  }
  loadExising(){
    this.loadRef();
    var id = this.getObjectRefId();
    var url = apiEndPoints.getOneUrl(id);
    this.fetchAndPopulateOne(url)
  }




  fetchAndPopulateOne(url) {
    RefDataHub.fetchDocument(this.getObjectRefId())
      .then(received => {
        console.log(received)
        var response = received.responseData;
        Object.keys(response).forEach(key => {
          this.setState({ [key]: response[key] })
        })
      });
  }

  resetMsg() {
    this.state.savingMsg = ""
    this.state.savingLink = ""
  }
  handleChange = (event) => {
    this.resetMsg();
    let key = event.target.name
    var obj = {}
    obj[key] = event.target.value
    this.setState({ [event.target.id]: event.target.value });
  }


  handleSelectChange = (event, state) => {
    this.resetMsg();
    this.setState({ [state]: event.target.value });
  };

  handleInventoryItemChange = async (event) => {

    let item = this.state
    var body = JSON.stringify(item)
    this.setState({ savingMsg: "Saving...." });
    // const response = await ApiHelper.submit(RestRequest.restRequest(method, url, apiEndPoints.getHeaders(), body))
    // console.log("resopnse---->")
    if (this.isNewItem()) {
      RefDataHub.postOneInventoryItem(body)
        .then(received => {
          console.log("received post")
          console.log(received);
          if (ReponseHandler.isSuccessful(received)) {
            this.setState({ savingMsg: "Saved new item" });
          }
          else {
            this.setState({ savingMsg: "Saving failed...." });
          }
        });


    }


    else {
      RefDataHub.putOneInventoryItem(this.getObjectRefId(), body)
        .then(received => {
          console.log("received")
          console.log(received)
          if (ReponseHandler.isSuccessful(received)) {

            var obj_result = {}
            obj_result['id'] = this.getObjectRefId();
            console.log(obj_result)
            var link = (<Link
              //   to={{
              //   pathname: "/item-edit",
              //   item: obj_result,
              // }}
              onClick={() => {
                // alert('hi'+this.getObjectRefId());
                this.loadExising();
                // this.props.history.push(ROUTE_LINKS.EDIT_ITEM,{objectRef:obj_result})
              }
              }
            >
          {' '}click here to refresh: {this.state['itemId']}
            </Link>)

            this.setState({ savingMsg: "Updated " });
            this.setState({ savingLink: link });

          }
          else {
            this.setState({ savingMsg: "Updating failed...." });
          }
        });


    }

    // console.log(response)
    // Object.keys(response).forEach(key => {
    //   console.log(key, response[key])
    // })
    // this.fetchAndPopulateOne(url)

    // this.setState({savingMsg:"Saved "+response.json().itemId});
    event.preventDefault();

  }
  savingMessage() {
    if (this.isNewItem()) {
      return "Saving.."
    }
    else {
      return "Saving.."
    }

  }


  getHeaderLabel() {
    if (this.isNewItem()) {
      return "Add Document  " + this.state.savingMsg;
    }
    else {
      var itemId = this.state.itemId;

      if (!itemId) {
        itemId = "";
      }

      return "Edit Document :" + itemId + "  " + this.state.savingMsg;
    }

  }


  prepOptions(items) {
    var options = [<option value="Unassigned">Unassigned</option>]
    items.forEach(entry => {
      options.push(<option value={entry}>{entry}</option>)
    });
    return options;
  }
  deleteEntry = async (event) => {
    this.setState({ savingMsg: "Deleting...." });
    const response = await ApiHelper.deleteOneEntry(apiEndPoints, this.getObjectRefId())
    console.log("resopnse---->")
    this.setState({ savingMsg: "Deleted" });
    event.preventDefault();
  }

  getObjectRefId() {
    return this.state.id;
  }
  render() {

    // let { id2 } = use();
    // console.log("Location loaded" + this.state.itemLocations.length)
    var savingMsg = this.state.savingMsg;
    var savingColor = 'red'
    if (savingMsg.toLowerCase().indexOf("failed") === -1) {
      savingColor = 'blue'
    }
    const classes = this.props.classes;
    var id = this.state.id
    return (
      <div align="left">
        <div>
          <h2 className="card-header">{this.getHeaderLabel()} </h2>
          <br />
        </div>
        <div>
        {id!="" && <Button style={{ textAlign: 'center' }} variant="success" onClick={this.deleteEntry}>

Delete Doc 
<FontAwesomeIcon icon={faTrash} size="1x" color='white' speed="6x" />
</Button>

    }
    {' '}
            <Button style={{ textAlign: 'center' }} variant="success" onClick={this.handleInventoryItemChange}>

              Save Item {' '}
              <FontAwesomeIcon icon={faSave} size="1x" color='white' speed="6x" />
            </Button>
            <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.props.history.push(ROUTE_LINKS.DOCUMENTS)}>
              Show All {' '}
              <FontAwesomeIcon icon={faSave} size="1x" color='white' speed="6x" />
            </Button>

            <label style={{ color: savingColor, fontSize: 18 }}>{savingMsg}</label>
            {this.state.savingLink}
        </div>
        <form className={classes.root} noValidate autoComplete="off">
          <div >
            <TextField disabled id="id" label="Id" value={this.state.id} defaultValue="-" />
            <TextField required
              label="Name"

              id="documentName"
              value={this.state.documentName}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />

          </div>


          <div>
            <TextField
              label="PO"
              value={this.state.purchaseOrder}
              id="purchaseOrder"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
            <TextField
              label="Invoice"
              id="invoiceNumber"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.invoiceNumber}
            />
            <label style={{ margin: 10, fontSize: 14 }}>Asset Location</label>
            <select
              style={{ margin: 10, width: 150, fontSize: 14 }}
              value={this.state.itemLocation}
              id="itemLocation"
              onChange={(event) => this.handleSelectChange(event, "itemLocation")}>
              {this.prepOptions(this.state.itemLocations)}
            </select>
          </div>
          <div>
            <br />
            <br />
            <h6>Asset Specification</h6>
            <label style={{ margin: 10, fontSize: 13 }}>Type*</label>
            <select
              style={{ margin: 10, width: 150, fontSize: 14 }}
              value={this.state.itemType}
              id="itemType"
              onChange={(event) => this.handleSelectChange(event, "itemType")}
            >
              {this.prepOptions(this.state.itemTypes)}
            </select>
            <label style={{ margin: 10, fontSize: 13, width: 100 }}>Maker*</label>
            <select
              style={{ margin: 10, width: 150, fontSize: 14 }}
              value={this.state.itemMaker}
              id="itemMaker"
              onChange={(event) => this.handleSelectChange(event, "itemMaker")}
            >

              {this.prepOptions(this.state.itemMakers)}
            </select>

            {/* <TextField
              label="Asset Maker"
              id="itemMaker"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.itemMaker}
            /> */}
            <TextField required
              label="Asset Model"
              id="itemModel"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.itemModel}
            />
            <div>
              <TextField
                label="Serial #"
                id="serialNumber"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.serialNumber}
                style={{ width: 200 }}
              />
              <label style={{ margin: 10, fontSize: 14 }}> Warranty Status</label>
              <select
                style={{ margin: 10, width: 150, fontSize: 14 }}
                value={this.state.warrantyStatus}
                id="warrantyStatus"
                onChange={(event) => this.handleSelectChange(event, "warrantyStatus")}>
                <option value="">Select One</option>
                <option value="In warranty">In warranty</option>
                <option value="Out of warranty">Out of warranty</option>
              </select>
            </div>

            <div>
              <br />
              <br />
              <h6>Other Details</h6>
              <TextField
                label="Scrap"
                id="scrapMachineNumber"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.scrapMachineNumber}
              />
              <TextField
                label="In Cabat"
                id="inCabat"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.inCabat}
              />
              <TextField
                label="PS Number"
                id="psNumber"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.psNumber}
              />
            </div>
            <div>
              <TextField
                label="Assigned To"
                id="assignedTo"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.assignedTo}
              />


              <TextField
                label="Assigned To Email"
                id="assignedToEmail"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.assignedToEmail}
              />
            </div>
            <div>

              <TextField
                label="LTR VPN User"
                id="ltrVPNUser"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.ltrVPNUser}
              />
              <TextField
                label="Assigned Engineer"
                id="assignedEngineer"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.assignedEngineer}
              />
              {/* <TextField
              label="Warranty Status"
              id="warrantyStatus"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.warrantyStatus}
            /> */}
            </div>
            <div>

              <br />
              <br />
              <h6>Inventory Status</h6>
              <label style={{ margin: 10, fontSize: 14, width: 115 }}> Asset Checked</label>
              <select
                style={{ margin: 10, width: 150, fontSize: 14 }}
                value={this.state.itemChecked}
                id="itemChecked"
                onChange={(event) => this.handleSelectChange(event, "itemChecked")}>
                <option value="">Select One</option>
                <option value="Checked">Checked</option>
                <option value="Unchecked">Unchecked</option>
              </select>

              <label style={{ margin: 10, fontSize: 14 }}> Transferred(Y/N)</label>
              <select
                style={{ margin: 10, width: 150, fontSize: 14 }}
                value={this.state.isTranferred}
                id="isTranferred"
                onChange={(event) => this.handleSelectChange(event, "isTranferred")}>
                <option value="">Select One</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>

            {/* <TextField
              label="Transferred(Y/N)"
              id="isTranferred"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.isTranferred}
            /> */}
            {/* <TextField
              label="Previous Location"
              id="previousItemLocation"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.previousLocation}
            /> */}
            <label style={{ margin: 10, fontSize: 14 }}> Previous Location</label>
            <select
              style={{ margin: 10, width: 150, fontSize: 14 }}
              value={this.state.previousItemLocation}
              id="previousItemLocation"
              onChange={(event) => this.handleSelectChange(event, "previousItemLocation")}>
              {this.prepOptions(this.state.itemLocations)}
            </select>
            {/* <TextField
              label="Availability"
              id="availibility"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              value={this.state.availibility}
            /> */}

            <label style={{ margin: 10, fontSize: 14, width: 110 }}> Availability</label>
            <select
              style={{ margin: 10, width: 150, fontSize: 14 }}
              value={this.state.availibility}
              id="availibility"
              onChange={(event) => this.handleSelectChange(event, "availibility")}>
              <option value="">Select One</option>
              <option value="In-Stock">In-Stock</option>
              <option value="Assigned">Assigned</option>
            </select>

            <div>
              <br />
              <h6>Miscellaneous</h6>
              <TextField
                label="Created By"
                id="createdBy"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.createdBy}
              />
              <TextField
                label="Item Category"
                id="itemCategory"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.itemCategory}
              />
              <TextField
                label="Path"
                id="path"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
                value={this.state.path}
              />
            </div>
          </div>

          <div>
            <TextField
              label="Note"
              id="notes"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              row={3}
              variant="outlined"
              onChange={this.handleChange}
              value={this.state.notes}
            />


          </div>
          
          <div>

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
// export default () => {
//   const classes = useStyles();
//   return withRouter(({location})=>{
//     // withRouter(<InventoryInput classes={classes} />)
//     (<InventoryInput location={location}  classes={classes} />)
//   });

export default withRouter(({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Item location={location} classes={classes} history={history} />
  )
});
