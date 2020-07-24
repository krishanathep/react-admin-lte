import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import firebase, { auth } from "../config/firebase";
import Moment from 'react-moment'

export default class Edocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
      user:"",
      code: "",
      document: "",
      category: "",
      date: "",
      user: "",
      section: "",
    };
  }

  handleChange=(e)=> {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit=(e)=> {
    e.preventDefault();

    const documentRef = firebase.database().ref("documents");

    const document = {
      code: this.state.code,
      document: this.state.document,
      category: this.state.category,
      date: firebase.database.ServerValue.TIMESTAMP,
      name: this.state.user.email,
      section: this.state.section,
    };

    documentRef.push(document)
    console.log(document)

    this.setState({
      document_id: "",
      code: "",
      document: "",
      category: "",
      date: "",
      name: "",
      section: "",
    });
  }

  handleDelete(document_id){
      if(window.confirm('Are you sure you want to delete this Document?')){
          let docRef = firebase.database().ref('documents')
          docRef.child(document_id).remove();
      }
  }

  componentDidMount() {
      this.currentUser()
      this.userLogin()
      this.fetchDocument()
  }
  
  fetchDocument() {
      const fetchDocument = firebase.database().ref('documents')
      fetchDocument.on('value', (snapshot)=>{
          let documents = snapshot.val();
          let newState = [];
          for (let document in documents){
              newState.push({
                  document_id: document,
                  no: documents[document].no,
                  code: documents[document].code,
                  document: documents[document].document,
                  category: documents[document].category,
                  date: documents[document].date,
                  name: documents[document].name,
                  section: documents[document].section,
              })
          }
          this.setState({
              documents: newState
          })
      })
  }

  currentUser() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }
  userLogin() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Hello", user);
        this.setState({ user })
      } else {
        window.location = "/";
      }
    });
  }

  render() {
      var no = 1;
      const { code, document, category, name, section } = this.state;
    return (
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header"></section>
          {/* Main content */}
          <section className="content">
            {/* Default box */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="nav-icon fas fa-file-alt" /> E-document
                </h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    title="Collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                    title="Remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <button
                  data-toggle="modal"
                  data-target="#createModal"
                  className="btn btn-success mb-3 float-right"
                >
                  <i className="fa fa-plus"></i> CREATE
                </button>
                <table id="example2" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Code</th>
                      <th>Document</th>
                      <th>Category</th>
                      <th>Create At</th>
                      <th>Name</th>
                      <th>Section</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.documents.map((doc) => (
                      <tr>
                        <td>{no++}</td>
                        <td>{doc.code}</td>
                        <td><a target="_blank" href='http://www.med.msu.ac.th/web/wp-content/uploads/2015/12/KPI1.pdf'>{doc.document}</a></td>
                        <td>{doc.category}</td>
                        <td><Moment format='DD/MM/YYYY'>{doc.date}</Moment></td>
                        <td>{doc.name}</td>
                        <td>{doc.section}</td>
                        <td>
                          <button className="btn btn-info btn-sm mr-1">
                            <i className="fa fa-eye"></i>
                          </button>
                          <button className="btn btn-primary btn-sm mr-1">
                            <i className="fa fa-pen"></i>
                          </button>
                          <button 
                          className="btn btn-danger btn-sm mr-1"
                          onClick={()=>this.handleDelete(doc.document_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="modal fade" id="createModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h4 class="modal-title">Create Repair Job</h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div class="modal-body">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Code :</label>
                                    <input 
                                    type="text" 
                                    className='form-control' 
                                    name='code'
                                    value={code}
                                    onChange={this.handleChange}
                                
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Document :</label>
                                    <input 
                                    type="text" 
                                    className='form-control' 
                                    name='document'
                                    value={document}
                                    onChange={this.handleChange}
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Category :</label>
                                    <input 
                                    type="text" 
                                    className='form-control' 
                                    name='category'
                                    value={category}
                                    onChange={this.handleChange}
                                    
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Section :</label>
                                    <input 
                                    type="text" 
                                    className='form-control' 
                                    name='section'
                                    value={section}
                                    onChange={this.handleChange}
                                    
                                    />
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="modal-footer">
                        <button
                          onClick={this.handleSubmit}
                          className="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={this.resetItem}
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-body */}

              {/* /.card-footer*/}
            </div>
            {/* /.card */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
      </div>
    );
  }
}
