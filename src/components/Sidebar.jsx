import React, { Component } from "react";
import { auth } from '../config/firebase'
import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state={
      user:''
    }
  }
  componentWillMount(){
    auth.onAuthStateChanged((user)=>{
      if (user) {
        this.setState({ user })
      }
    })
  }
  render() {
    return (
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img
              src="assets/dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="assets/dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <Link className="d-block">
                  {this.state.user.email}
                </Link>
              </div>
            </div>
            {/* SidebarSearch Form */}
            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library */}
                <li className="nav-item">
                  <Link to='/home' className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/edocument' className="nav-link">
                    <i className="nav-icon fas fa-file-alt" />
                    <p>
                      E-document
                      <span className="right badge badge-danger">New</span>
                    </p>
                  </Link>
                </li>

              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
