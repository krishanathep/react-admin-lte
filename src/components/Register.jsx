import React, { Component } from "react";
import { Link } from 'react-router-dom'
import firebase from '../config/firebase'

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      email: '',
      password:'',
      re_password:'',
    }
  }
  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    const { email, username, password, re_password } = this.state;

    if(password !== re_password){
      return alert('Password Not Match!');
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: username }).then(()=>{
          this.props.history.push('/home')
        })
      })
      .catch((error)=>{
        this.setState({ error })
        alert(error)
      })
  }
  render() {
    const { email, username, password, re_password } = this.state; 
    return (
      <div className="hold-transition register-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Register a new membership</p>
              <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    name='username'
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
                    name='re_password'
                    value={re_password}
                    onChange={this.handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="terms"
                        defaultValue="agree"
                      />
                      <label htmlFor="agreeTerms">
                        I agree to the <Link to='#'>terms</Link>
                      </label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              <div className="social-auth-links text-center">
                <p>- OR -</p>
                <Link to='#' className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2" />
                  Sign up using Facebook
                </Link>
                <Link to="#" className="btn btn-block btn-danger">
                  <i className="fab fa-google-plus mr-2" />
                  Sign up using Google+
                </Link>
              </div>
              <Link to='/' className="text-center">
                I already have a membership
              </Link>
            </div>
            {/* /.form-box */}
          </div>
          {/* /.card */}
        </div>
        {/* /.register-box */}
      </div>
    );
  }
}
