import React, { Component } from "react";
import firebase, { auth } from "../config/firebase";
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  logOutUser = () => {
    if (window.confirm("Are you sure you want to Sign Out?")){
      firebase
      .auth()
      .signOut()
      .then((window.location = "/"));
    }
  };

  render() {
    return (
      <div className="wrapper">
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-primary navbar-dark">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link onClick={this.logOutUser} className="nav-link">
                Sign Out <i className="far fa-sign-out-alt" />
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
      </div>
    );
  }
}
