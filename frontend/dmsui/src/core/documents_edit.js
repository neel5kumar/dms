import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import * as API_END_POINTS from '../api/api_end_points';
import * as ROUTER_LINKS from '../api/ui_routes';
import RefDataHub from '../common/ref_data_hub';
import DocumentNodes from './document_nodes';

const docEndPoints = API_END_POINTS.DOCUMENTS_ENDPOINT;
const docMetaEndPoints = API_END_POINTS.DOCUMENT_META_ENDPOINT;

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

class DocumentsEdit extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {}
    if (this.props.location.objectRef) {
      this.state.id=this.props.location.objectRef.id
    }
    this.handleMetaChange=this.handleMetaChange.bind(this)
  }
  handleUpload = event => {
    var file = event.target.files[0];
    this.setState({
      uploadedFile: file,
      documentName: file.name,
      documentSize: file.size
    });
  };
 

  handleMetaChange = (event, state) => {
    this.setState({ [state]: event.target.value });
    
    console.log(event.target.value)
    console.log(state)
  };

  objectRefId(){
    return this.state.id
  }

  fetchAllItems() {
    var documentId=this.objectRefId();
    if (documentId) {
      // alert('Found:' + this.state.id)
      RefDataHub.fetchDocument(documentId).then(
        received => {
          if (received.status == 'Unauthorised') {
            console.log("Unauthorised")
            this.state.unauthorised = true
          }
          var response=received.responseData
          console.log(response)
          // var items = received
          Object.keys(response).forEach(key => {
            
            this.setState({ [key]: response[key] })
            console.log("key"+ key + " value "+this.state[key])
          })
        });
    }

    console.log('data received ')
  }
  isEdit(){
    return this.objectRefId()!=undefined
  }
  deleteDoc = async (event) => {
    var documentId = this.state.id;
    if(this.isEdit()){
      // alert('delete')
      var url2=docEndPoints.deleteOneUrl(documentId);
      var requestOptions = {
        method: 'DELETE',
      };
      const response2 = await fetch(url2, requestOptions);
      return
    }
  }
  saveDocument = async (event) => {
    var formData = new FormData()
    console.log(this.state)
    Object.keys(this.state).map(i => {
      console.log("i-" + i)
      console.log(this.state[i])
      // console.log(item[i])
      formData.append(i, this.state[i])
    })

    if(this.isEdit()){
      // alert('edit')
      const data = await this.putRequest(formData, docEndPoints)
      this.postDocMeta()
      return
    }
    else{
      const data = await this.postRequest(formData, docEndPoints)
      this.setState({
        message: 'Saved Doc',
        id: data.id,
      });
      this.postDocMeta()
    }
    

    //Job.objects.get(pk=25).task_set.all().delete()


   

  

  }

  async postDocMeta() {
    var documentId = this.state.id;
    console.log("documentId-->" + documentId)
    if(documentId){
      // alert('deleting')
      // const requestOptions = {
      //   method: 'DELETE',
      // };
    
      var requestOptions = {
        method: 'GET',
        // body: formData2
      };
      var url=docMetaEndPoints.getOneUrl(documentId)+"&documentId="+documentId
      // alert(url)
      const response = await fetch(url, requestOptions);

      
      var url2=docMetaEndPoints.deleteDummyUrl(documentId)+"&documentId="+documentId
      requestOptions = {
        method: 'DELETE',
        // body: formData2
      };
      const response2 = await fetch(url2, requestOptions);


      var formData2 = new FormData()
      alert(this.state.documentMetaAuto)
      formData2.append("documentMetaValue",this.state.documentMetaValue)
      formData2.append("document",documentId)
      formData2.append("documentMetaAuto",this.state.documentMetaAuto)
      
      requestOptions = {
        method: 'POST',
        body: formData2
      };
      url=docMetaEndPoints.postOneUrl();
      const response3 = await fetch(url, requestOptions);

      // const response = await fetch(docMetaEndPoints.deleteOneUrl(documentId), requestOptions);
      return
    }
   
  }
  async postRequest(formData, endPoints) {
    const requestOptions = {
      method: 'POST',
      body: formData
    };
    const response = await fetch(endPoints.postOneUrl(), requestOptions);
    const data = await response.json();
    console.log(data)
    return data

  }

  async putRequest(formData, endPoints) {
    var documentId = this.state.id;
    const requestOptions = {
      method: 'PUT',
      body: formData
    };
    const response = await fetch(endPoints.putOneUrl(documentId), requestOptions);
    const data = await response.json();
    console.log(data)
    return data

  }
  componentDidMount() {
    this.fetchAllItems();
  }
  render() {
    // alert(this.props.location.objectRef.id)
    var disabledSave = this.state.documentName == undefined;
    var documentId=this.state.id;
    var docmumentDetail = ""
    if (this.state.documentSize) {
      docmumentDetail = "Size:" + (this.state.documentSize) / 1000 + " KB"
    }
    // alert(this.state.documentName)
    return (
      <Card noborder style={{ flex: 1, flexDirection: 'row', borderWidth: 0 }}>
        <Card style={{ borderWidth: 0 }}><DocumentNodes /></Card>
        <Card style={{ borderWidth: 0, flexDirection: 'column' }}>
          <Card.Title>Add a new Doc</Card.Title>

          <Card>
            <div style={{ margin: 30 }}>

              <label class="btn btn-default btn-file"> <TextField
                name="upload-photo" id="file_loader_dummy"
                type="file" id="uploadedFile"
                 onChange={this.handleUpload} >
              </TextField></label>
            </div>
            <div>

              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Meta Data</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" id="documentMetaValue" aria-label="With textarea" 
                value={this.state.documentMetaValue}
                onChange={(event) => this.handleMetaChange(event, "documentMetaValue")}
                />
              </InputGroup>
              <InputGroup class="input-group input-group-lg">
                <InputGroup.Prepend>
                  <InputGroup.Text >Auto Data</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" rows="10" style={{hight:10}}id="documentMetaAuto" aria-label="With textarea" 
                value={this.state.documentMetaAuto}
                onChange={(event) => this.handleMetaChange(event, "documentMetaAuto")}
                />
              </InputGroup>
              {/* <textarea style={{height:400}}  value={this.state.documentMetaAuto}>

              </textarea> */}
            </div>
          <div>
          {documentId!=undefined && <a href={this.state.uploadedFile} target="_blank">View</a>}
          </div>

            <div>

              <Button style={{ textAlign: 'center' }} disabled={disabledSave} variant="success" onClick={this.saveDocument}>

                Save Doc {' '}
                <FontAwesomeIcon icon={faSave} size="1x" color='white' speed="6x" />
              </Button>
              <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={this.deleteDoc}>
                Delete {' '}
                <FontAwesomeIcon icon={faTrash} size="1x" color='white' speed="6x" />
              </Button>
              {' '}
              <Button style={{ textAlign: 'center', margin: 10 }} variant="dark" onClick={(event) => this.props.history.push(ROUTER_LINKS.DOCUMENTS)}>
                Show All {' '}
                <FontAwesomeIcon icon={faSave} size="1x" color='white' speed="6x" />
              </Button>
              {' '}
            </div>
            <div>
              {this.state.message} : {this.state.id}
              <br/>
              {this.state.message2} : {this.state.metaId}
            </div>

            <Card style={{ flex: 1, alignItems: 'flex-Start' }}><label> {' '} {docmumentDetail}</label></Card>

          </Card>

          {' '}
          <Card style={{ borderWidth: 0, flexDirection: 'row', margin: 10, padding: 10 }}>
            <TextField disabled
              label="Document Name"
              id="documentName"
              value={this.state.documentName}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
            {' '}
            <TextField disabled
              label="Document size"
              id="documentSize"
              value={this.state.documentSize}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
            {/* <Label value="Size:"/> */}
          </Card>
        </Card>
      </Card>

    );
  }
}


export default withRouter(({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <DocumentsEdit location={location} classes={classes} history={history} />
  )
});