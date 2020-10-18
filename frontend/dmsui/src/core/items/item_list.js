import React, { Component } from 'react';
import { Card, Table, Row, Col, Button, Container, InputGroup, FormControl, Nav } from 'react-bootstrap';
import CommonUtil from '../../common/common_util';
import { Link as MaterialLink } from '@material-ui/core/Link';
import { faHome, faSync, faSave, faSearch,faPhoneAlt,faSms } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { withRouter, Link } from 'react-router-dom';
import SimpleTable from '../../common/simple_table'
import * as API_END_POINTS from '../../api/api_end_points' 
import * as ROUTER_LINKS from '../../api/ui_routes' 
import ApiHelper from '../../common/api_helper'
import RefDataHub from '../../common/ref_data_hub'
import RestRequest from '../../common/rest_request'
import BasicPage from './basic_page'
import LoginPage from '../login_page'
import { useHistory } from "react-router-dom";
const apiEndPoints=API_END_POINTS.INVENTORY_ITEMS_END_POINT;
const headCells = [           
  {
    id: 'id', numeric: false, disablePadding: true, label: 'Id', order:'desc' ,decorator:
      function (row, currentValue) {
        var obj_result = {}
        obj_result['id'] = currentValue
        return (<Link to={{
          pathname: ROUTER_LINKS.EDIT_ITEM,
          objectRef: obj_result
        }}>
          {currentValue}
        </Link>)
      }

  },
  { id: 'itemId', numeric: false, disablePadding: false, label: 'Asset ID'},
  { id: 'purchaseOrder', numeric: false, disablePadding: false, label: 'PO' },
  { id: 'invoiceNumber', numeric: false, disablePadding: false, label: 'Invoice' },
  { id: 'itemType', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'itemMaker', numeric: false, disablePadding: false, label: 'Maker' },
  { id: 'itemModel', numeric: false, disablePadding: false, label: 'Model' },
  { id: 'itemLocation', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'serialNumber', numeric: false, disablePadding: false, label: 'Serial #' },
  { id: 'scrapMachineNumber', numeric: false, disablePadding: false, label: 'Scrap' },
  { id: 'assignedTo', numeric: false, disablePadding: false, label: 'Assigned To' },
  { id: 'assignedToEmail', numeric: false, disablePadding: false, label: 'Assigned Email' },
  { id: 'ltrVPNUser', numeric: false, disablePadding: false, label: 'LTR VPN User' },
  { id: 'assignedEngineer', numeric: false, disablePadding: false, label: 'Assigned Engineer' },
  { id: 'warrantyStatus', numeric: false, disablePadding: false, label: 'Warranty Status' },
  { id: 'itemChecked', numeric: false, disablePadding: false, label: 'Asset Checked?' },
  { id: 'isTranferred', numeric: false, disablePadding: false, label: 'Transferred?' },
  { id: 'previousItemLocation', numeric: false, disablePadding: false, label: 'Prev Location' },
  { id: 'availibility', numeric: false, disablePadding: false, label: 'Availability' },
  { id: 'createdBy', numeric: false, disablePadding: false, label: 'Created By' },
  { id: 'itemCategory', numeric: false, disablePadding: false, label: 'Item Category' },
  { id: 'path', numeric: false, disablePadding: false, label: 'Path' },
  { id: 'notes', numeric: false, disablePadding: false, label: 'Notes' },
//   { id: 'Dummy1', numeric: false, disablePadding: false, label: 'whatsapp/SMS', decorator:
//   function (row, currentValue) {
//     var obj_result = {}
//     obj_result['id'] = row['id']
//     return (
//       <FontAwesomeIcon icon={faPhoneAlt} size="1x" color='green' speed="6x" />
//     )
//   }
// },

]
class ItemList extends BasicPage {
  constructor(props) {
    super(props);

    this.state = {
      resultCount: null,
      unauthorised:true
    };
    // localStorage.setItem("Authenticated",false)
  }

  fetchAllItems(){
    RefDataHub.fetchAllInventoryItems().then(
      received=>{
        if(received.status=='Unauthorised'){
          console.log("Unauthorised")
          this.state.unauthorised=true
        }
        console.log(received)
        var items=received.responseData.results
        this.setState({
          results: items,
          resultCount:items.length
        })
        
      }
    )
      console.log('data received ')
  }
  componentDidMount() {
   this.fetchAllItems();
  }

  render() {
    const { resultCount, results } = this.state;
    var mixedRows = []
    for (var index = 0; index < resultCount; index++) {
      var result = results[index]
      var row = {}
      headCells.forEach(function (item, index) {
        row[item.id] = result[item.id]
      });
      mixedRows.push(result);
    }
    // if(this.state.unauthorised){
    //     return <LoginPage/>
    // }
    
    return (
      
      <div>
       
        <card>
          <h6 align="left">Total Records: {this.state.resultCount}</h6>
          <SimpleTable mixedRows={mixedRows} headCells={headCells} tableTitle="Asset Inventory" />

        </card>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.fetchAllItems()}>
            Refresh {' '}
            <FontAwesomeIcon icon={faSync} size="1x" color='white' speed="6x" />
          </Button>
          <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.props.history.push(ROUTER_LINKS.ADD_ITEM)}>
            Add New >> 
          </Button>

        </div>
      </div>

    );
  }
}

export default withRouter(ItemList);

