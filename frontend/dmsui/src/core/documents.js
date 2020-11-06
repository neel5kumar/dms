import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Button, Card } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import * as API_END_POINTS from '../api/api_end_points';
import * as ROUTER_LINKS from '../api/ui_routes';
import RefDataHub from '../common/ref_data_hub';
import SimpleTable from '../common/simple_table';
import DocumentNodes from './document_nodes';

const docEndPoints = API_END_POINTS.DOCUMENTS_ENDPOINT;
const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});



const headCells = [
  {
    id: 'id', numeric: false, disablePadding: true, label: 'Id', order: 'desc', decorator:
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
  { id: 'documentName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'documentSize', numeric: false, disablePadding: false, label: 'size' },

  {
    id: 'uploadedFile', numeric: false, disablePadding: true, label: 'View', order: 'desc', decorator:
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
    this.state = {}
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
  }
  onKeyDownHandler = e => {
    // alert(e.keyCode)
    if (e.keyCode === 13) {
      this.searchDocument();
      e.preventDefault();
        e.stopPropagation();
    }
  };

  searchDocument = async (event) => {
    if (this.state.searchMetaText && this.state.searchMetaText.trim() != "") {
      var searchMetaText = this.state.searchMetaText.trim();
      // alert(searchMetaText)
      var url = docEndPoints.getAllUrl() + "&searchMetaText=" + searchMetaText
      // alert(url)
      var requestOptions = {
        method: 'GET'
      };
      await RefDataHub.fetchUsing(url,requestOptions).then(
        received => {
          // alert(received)
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


    }
    else {
      this.fetchAllItems()
    }

    // 
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

      <Card noborder style={{ flex: 1, flexDirection: 'row', borderWidth: 0 }}>
        <Card style={{ borderWidth: 0 }}><DocumentNodes /></Card>

        <Card>
          <Card style={{ borderWidth: 0 }}>
            <div>
              <input id="searchMetaText" onChange={(event) => this.state.searchMetaText = event.target.value} onKeyDown={this.onKeyDownHandler}>

              </input>
              <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.searchDocument()}>
                Search
          </Button>
              <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.props.history.push(ROUTER_LINKS.DOCUMENTS_EDIT)}>
                Add New >>
          </Button>

            </div>

          </Card>
          <SimpleTable mixedRows={mixedRows} headCells={headCells} tableTitle="Document List" />

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