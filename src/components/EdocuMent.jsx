import React, { Component, Fragment } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import firebase, { auth } from "../config/firebase";
import Moment from "react-moment";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactDatatable from "@ashvin27/react-datatable";
import FileUploader from 'react-firebase-file-uploader'

export default class Edocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      no: 1,
      document_id: "",
      user: "",
      code: "",
      document: "",
      category: "",
      date: "",
      name: "",
      section: "",
      hideAlert: true,
      fileUrl: "",
      fileName: '',
      avatar: '',
      isUploading: false,
    };
    this.columns = [
      { key: "code", text: "Code" },
      {
        key: "document",
        text: "Document",
        cell: (document) => {
          return (
            <Fragment>
              <a href={document.fileUrl} target="_blank">
                {document.document}
              </a>
            </Fragment>
          );
        },
      },
      { key: "category", text: "Category" },
      {
        key: "date",
        text: "Create",
        cell: (document) => {
          return (
            <Fragment>
              <Moment format="DD MMMM YY">{document.date}</Moment>
            </Fragment>
          );
        },
      },
      { key: "name", text: "Name" },
      { key: "section", text: "Section" },
      {
        key: "actions",
        text: "Actions",
        cell: (document) => {
          return (
            <Fragment>
              <button
                className="btn btn-info btn-sm mr-1"
                data-toggle="modal"
                data-target="#viewModal"
                onClick={() =>
                  this.handleUpdate(
                    document.document_id,
                    document.code,
                    document.document,
                    document.category,
                    document.date,
                    document.name,
                    document.section,
                    document.fileUrl,
                  )
                }
              >
                <i className="fa fa-eye"></i>
              </button>
              <button
                className="btn btn-primary btn-sm mr-1"
                data-toggle="modal"
                data-target="#updateModal"
                onClick={() =>
                  this.handleUpdate(
                    document.document_id,
                    document.code,
                    document.document,
                    document.category,
                    document.date,
                    document.name,
                    document.section
                  )
                }
              >
                <i className="fa fa-pen"></i>
              </button>
              <button
                className="btn btn-danger btn-sm mr-1"
                onClick={() => this.handleDelete(document.document_id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          );
        },
      },
    ];
    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: true,
      show_pagination: true,
      pagination: "advance",
      button: {
        excel: false,
        print: false,
      },
    };
  }

  handleChangeUsername = event =>
    this.setState({ fileName: event.target.value })

  handleUploadStart = () => this.setState({ isUploading: true });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false })
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ fileUrl: url }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      (!this.state.code,
      !this.state.document,
      !this.state.category,
      !this.state.section)
    ) {
      Swal.fire({
        icon: "info",
        title: "Oops!",
        text: "Please Check your input data!",
      });
      return;
    }

    if (this.state.document_id !== "") {
      return this.updateDocument();
    }

    const documentRef = firebase.database().ref("documents");

    const document = {
      code: this.state.code,
      document: this.state.document,
      category: this.state.category,
      date: firebase.database.ServerValue.TIMESTAMP,
      name: this.state.user.email,
      section: this.state.section,
      fileUrl: this.state.fileUrl,
    };

    documentRef.push(document);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Successfully for created",
      timer: 2000,
    });

    this.setState({
      document_id: "",
      code: "",
      document: "",
      category: "",
      date: "",
      name: "",
      section: "",
      fileUrl: '',
    });
  };

  handleUpdate = (
    document_id = null,
    code = null,
    document = null,
    category = null,
    date = null,
    name = null,
    section = null,
    fileUrl = null,
  ) => {
    this.setState({
      document_id,
      code,
      document,
      category,
      date,
      name,
      section,
      fileUrl,
    });
  };

  updateDocument() {
    var obj = {
      code: this.state.code,
      document: this.state.document,
      category: this.state.category,
      date: this.state.date,
      name: this.state.name,
      section: this.state.section,
    };
    const docRef = firebase.database().ref("/documents");
    docRef.child(this.state.document_id).update(obj);

    this.setState({
      document_id: "",
      code: "",
      document: "",
      category: "",
      date: "",
      name: "",
      section: "",
    });
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Successfully for updated",
      timer: 2000,
    });
  }

  handleDelete(document_id) {
    let docRef = firebase.database().ref("documents");
    docRef.child(document_id).remove();
    Swal.fire({
      icon: "error",
      title: "Success",
      text: "Successfully for deleted",
      timer: 2000,
    });
  }

  componentDidMount() {
    this.currentUser();
    this.userLogin();
    this.fetchDocument();
  }

  fetchDocument() {
    const fetchDocument = firebase.database().ref("documents");
    fetchDocument.on("value", (snapshot) => {
      let documents = snapshot.val();
      let newState = [];
      for (let document in documents) {
        newState.push({
          document_id: document,
          no: documents[document].no,
          code: documents[document].code,
          document: documents[document].document,
          category: documents[document].category,
          date: documents[document].date,
          name: documents[document].name,
          section: documents[document].section,
          fileUrl: documents[document].fileUrl,
        });
      }
      this.setState({
        documents: newState,
      });
    });
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
        this.setState({ user });
      } else {
        window.location = "/";
      }
    });
  }

  resetItem = () => {
    this.setState({
      code: "",
      document: "",
      category: "",
      section: "",
      fileUrl: '',
    });
  };

  render() {
    const { code, document, category, section, date, name, fileUrl } = this.state;
    return (
      <div className="Edocument wrapper">
        <Navbar />
        <Sidebar />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>DOCUMENTS</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link> / Document
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            {/* Default box */}
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-5">
                <div className="card-header">
                    <h3 className="card-title"></h3>
                    <div className="card-tools">
                      <button
                        className="btn btn-success btn-sm"
                        data-toggle="modal"
                        data-target="#createModal"
                      >
                        <i className="fa fa-plus"></i> Create
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <ReactDatatable
                        config={this.config}
                        records={this.state.documents}
                        columns={this.columns}
                      />
                    </div>
                    <div class="modal fade" id="createModal">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title">Create New Document</h4>
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
                                      className="form-control"
                                      name="code"
                                      value={code}
                                      onChange={this.handleChange}
                                      placeholder="Enter Code"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Document :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="document"
                                      value={document}
                                      onChange={this.handleChange}
                                      placeholder="Enter Document"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Category :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="category"
                                      value={category}
                                      onChange={this.handleChange}
                                      placeholder="Enter Category"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Section :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="section"
                                      value={section}
                                      onChange={this.handleChange}
                                      placeholder="Enter Section"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">File :</label>
                                    <input 
                                      type="text"
                                      className='form-control'
                                      name='fileUrl'
                                      value={fileUrl}
                                      onChange={this.handleChange}
                                    /><br/>
                                    <FileUploader
                                      accept='image/*'
                                      name='avatar'
                                      randomizeFilename
                                      storageRef={firebase.storage().ref("images")}
                                      onUploadSuccess={this.handleUploadSuccess}
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
                    <div class="modal fade" id="updateModal">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title">Update Documtne</h4>
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
                                      className="form-control"
                                      name="code"
                                      value={code}
                                      onChange={this.handleChange}
                                      placeholder="Enter Code"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Document :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="document"
                                      value={document}
                                      onChange={this.handleChange}
                                      placeholder="Enter Document"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Category :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="category"
                                      value={category}
                                      onChange={this.handleChange}
                                      placeholder="Enter Category"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="">Section :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="section"
                                      value={section}
                                      onChange={this.handleChange}
                                      placeholder="Enter Section"
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
                    <div class="modal fade" id="viewModal">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title">View Document</h4>
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
                                  <table className="table table-bordered table-striped">
                                    <tr>
                                      <th>Code :</th>
                                      <td>{code}</td>
                                    </tr>
                                    <tr>
                                      <th>Document :</th>
                                      <td>{document}</td>
                                    </tr>
                                    <tr>
                                      <th>Image :</th>
                                      <td>
                                        <img src={fileUrl} height='150px' width='140' alt=""/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Category :</th>
                                      <td>{category}</td>
                                    </tr>
                                    <tr>
                                      <th>Create At :</th>
                                      <td>
                                        <Moment format="DD MMMM YY">
                                          {date}
                                        </Moment>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Name :</th>
                                      <td>{name}</td>
                                    </tr>
                                    <tr>
                                      <th>Section :</th>
                                      <td>{section}</td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="modal-footer">
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
                </div>
                {/* /.card */}
              </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
        <Footer />
      </div>
    );
  }
}
