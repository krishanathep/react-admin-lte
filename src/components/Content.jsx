import React, { Component } from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import firebase from '../config/firebase'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

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
                  <h1>Dashboard</h1>
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
            <div class="col-lg-3 col-6">
                {/* small box */}
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>5</h3>

                    <p>MEETING ROOMS</p>
                  </div>
                  <div class="icon">
                  <i className="far fa-calendar-alt"></i>
                  </div>
                  <Link
                    to="/meeting-rooms"
                    class="small-box-footer"
                  >
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                {/* small box */}
                <div class="small-box bg-primary">
                  <div class="inner">
                    <h3>200</h3>

                    <p>DOCUMENTS</p>
                  </div>
                  <div class="icon">
                  <i className="fas fa-file-alt" />
                  </div>
                  <Link
                    to="/edocument"
                    class="small-box-footer"
                  >
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                {/* small box */}
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>3,320</h3>

                    <p>COVID 19 THAI REPORT</p>
                  </div>
                  <div class="icon">
                  <i className="far fa-viruses"></i>
                  </div>
                  <Link
                    to="/covid"
                    class="small-box-footer"
                  >
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                {/* small box */}
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>10</h3>

                    <p>CARS BOOKING</p>
                  </div>
                  <div class="icon">
                  <i className="fas fa-car"></i>
                  </div>
                  <Link
                    to="/meeting-rooms"
                    class="small-box-footer"
                  >
                    More info <i class="fas fa-arrow-circle-right"></i>
                  </Link>
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
