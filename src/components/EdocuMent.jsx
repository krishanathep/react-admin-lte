import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import firebase, { auth } from "../config/firebase";
import Moment from "react-moment";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default class Edocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      user: "",
      code: "",
      document: "",
      category: "",
      date: "",
      name: "",
      section: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

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
    };

    documentRef.push(document);
    console.log(document);

    this.setState({
      document_id: "",
      code: "",
      document: "",
      category: "",
      date: "",
      name: "",
      section: "",
    });
  };

  handleUpdate = (
    document_id = null,
    code = null,
    document = null,
    category = null,
    date = null,
    name = null,
    section = null
  ) => {
    this.setState({
      document_id,
      code,
      document,
      category,
      date,
      name,
      section,
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
  }

  handleDelete(document_id) {
    if (window.confirm("Are you sure you want to delete this Document?")) {
      let docRef = firebase.database().ref("documents");
      docRef.child(document_id).remove();
    }
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

  render() {
    var no = 1;
    const { code, document, category, section, date, name } = this.state;
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
                  <h1></h1>
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
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Document</h3>
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
                    <div className="table-responsive">
                      <table class="table table-hover table-bordered">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Code</th>
                            <th>Document</th>
                            <th>Category</th>
                            <th>Create At</th>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.documents.map((doc) => (
                            <tr>
                              <td>{no++}</td>
                              <td>{doc.code}</td>
                              <td>
                                <a
                                  target="_blank"
                                  href="http://www.med.msu.ac.th/web/wp-content/uploads/2015/12/KPI1.pdf"
                                >
                                  {doc.document}
                                </a>
                              </td>
                              <td>{doc.category}</td>
                              <td>
                                <Moment format="DD/MM/YYYY">{doc.date}</Moment>
                              </td>
                              <td>{doc.name}</td>
                              <td>{doc.section}</td>
                              <td>
                                <button
                                  className="btn btn-info btn-sm mr-1"
                                  data-toggle="modal"
                                  data-target="#viewModal"
                                  onClick={() =>
                                    this.handleUpdate(
                                      doc.document_id,
                                      doc.code,
                                      doc.document,
                                      doc.category,
                                      doc.date,
                                      doc.name,
                                      doc.section
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
                                      doc.document_id,
                                      doc.code,
                                      doc.document,
                                      doc.category,
                                      doc.date,
                                      doc.name,
                                      doc.section
                                    )
                                  }
                                >
                                  <i className="fa fa-pen"></i>
                                </button>
                                <button
                                  className="btn btn-danger btn-sm mr-1"
                                  onClick={() =>
                                    this.handleDelete(doc.document_id)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                                      <td>
                                        <a
                                          target="_blank"
                                          href="http://www.med.msu.ac.th/web/wp-content/uploads/2015/12/KPI1.pdf"
                                        >
                                          {document}
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Category :</th>
                                      <td>{category}</td>
                                    </tr>
                                    <tr>
                                      <th>Create At :</th>
                                      <td>
                                        <Moment format="DD/MM/YYYY">
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
