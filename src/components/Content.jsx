import React, { Component } from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import firebase from '../config/firebase'
import Footer from '../components/Footer'

export default class Content extends Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        console.log('Hello', user)
      } else {
        window.location = '/'
      }
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <Navbar/>
        <Sidebar/>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Home</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      Home
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
                <h3 className="card-title">Title</h3>
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
                Start creating your amazing application!
              </div>
              {/* /.card-body */}
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Title</h3>
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
                Start creating your amazing application!
              </div>
              {/* /.card-body */}
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Title</h3>
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
                Start creating your amazing application!
              </div>
              {/* /.card-body */}
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Title</h3>
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
                Start creating your amazing application!
              </div>
              {/* /.card-body */}
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Title</h3>
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
                Start creating your amazing application!
              </div>
              {/* /.card-body */}
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Title</h3>
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
                Start creating your amazing application!
              </div>
              {/* /.card-body */}
            </div>
              </div>
            </div>
            {/* /.card */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      <Footer />
      </div>
    );
  }
}
