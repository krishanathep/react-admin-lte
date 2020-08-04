import React, { Component } from "react";
import firebase, { auth } from "../config/firebase";
import { Link } from "react-router-dom";

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
    if (window.confirm("Are you sure you want to Sign Out?")) {
      firebase
        .auth()
        .signOut()
        .then((window.location = "/react-admin-lte/"));
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
              <Link
                className="nav-link"
                data-widget="pushmenu"
                to=""
                role="button"
              >
                <i className="fas fa-bars" />
              </Link>
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
