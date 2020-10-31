import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DocumentNodes from './document_nodes';
import { Button, Form, Card, FormGroup, FormControl, ListGroup, ListGroupItem, FormLabel, Container, Col, Row } from "react-bootstrap";
import RefDataHub from '../common/ref_data_hub'
import * as ROUTER_LINKS from '../api/ui_routes'
import { Link } from 'react-router-dom';
import SimpleTable from '../common/simple_table'

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const headCells = [           
  {
    id: 'id', numeric: false, disablePadding: true, label: 'Id', order:'desc' ,decorator:
      function (row, currentValue) {
        var obj_result = {}
        obj_result['id'] = currentValue
        return (<Link to={{
          pathname: ROUTER_LINKS.DOCUMENTS_EDIT,
          objectRef: obj_result
        }}>
          {currentValue}
        </Link>)
      }

  },
  { id: 'documentName', numeric: false, disablePadding: false, label: 'Name'},
  { id: 'documentSize', numeric: false, disablePadding: false, label: 'size' },
 
  {
    id: 'uploadedFile', numeric: false, disablePadding: true, label: 'View', order:'desc' ,decorator:
      function (row, currentValue) {
        return (<a href={currentValue} target="_blank">View</a>
        )
      }

  },
  // {
  //   id: 'id', numeric: false, disablePadding: true, label: 'Id', order:'desc' ,decorator:
  //     function (row, currentValue) {
  //       var obj_result = {}
  //       obj_result['id'] = currentValue
  //       return (<Link onClick={(event) =>this.deleteDoc(event)}>
  //         Delete
  //       </Link>)
  //     }

  // },
  { id: 'notes', numeric: false, disablePadding: false, label: 'Notes' },
]
class Documents extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state={}
  }
  fetchAllItems() {
    RefDataHub.fectAllDocuments().then(
      received => {
        if (received.status == 'Unauthorised') {
          console.log("Unauthorised")
          this.state.unauthorised = true
        }
        console.log("received")
        console.log(received)
        var items = received.responseData.results
        this.setState({
          results: items,
          resultCount: items.length
        })

      }
    )
    console.log('data received ')
  }
  componentDidMount() {
    this.fetchAllItems();
  }
  
   deleteDoc = (event, name) => {
     alert('hi')
  }
  
  render() {
    var mixedRows = []
    const { resultCount, results } = this.state;
    for (var index = 0; index < resultCount; index++) {
      var result = results[index]
      var row = {}
      headCells.forEach(function (item, index) {
        row[item.id] = result[item.id]
      });
      mixedRows.push(result);
    }
    // var headCells={}
    return (
      
      <Card noborder style={{flex:1, flexDirection:'row',borderWidth:0}}>
        <Card style={{borderWidth:0}}><DocumentNodes /></Card>

        <Card>
        <SimpleTable mixedRows={mixedRows} headCells={headCells} tableTitle="Document List" />
        </Card>
        <Card style={{borderWidth:0}}>
          <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.props.history.push(ROUTER_LINKS.DOCUMENTS_EDIT)}>
            Add New >>
          </Button>
        </Card>
      </Card>)
  }
}


export default withRouter(({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Documents location={location} classes={classes} history={history} />
  )
});