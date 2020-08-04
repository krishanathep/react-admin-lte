import React, { Component, Fragment } from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import ReactDatatable from '@ashvin27/react-datatable';

export default class MovieSearch extends Component {
  constructor(props){
    super(props)
    this.state={
      comments: [],
    }
    this.columns = [
      { key: 'id', text: 'ID' },
      { key: 'name', text: 'Name' },
      { key: 'email', text: 'Email' },
     
      {
        key: "action",
        text: "Action",
        cell: (record, index) => {
            return (
                <Fragment>
                    <button
                        className="btn btn-primary btn-sm"
                        style={{marginRight: '5px'}}>
                            Edit
                    </button>
                    <button 
                        className="btn btn-danger btn-sm" 
                        >
                            Delete
                    </button>
                </Fragment>
            );
        }
    }
    ]
    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: true,
      show_pagination: true,
      pagination: 'advance',
      button: {
          excel: false,
          print: false
      }
  }
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res=>res.json())
      .then(comments=>this.setState({comments: comments}))
  }

  render() {
    return (
        <div className="Edocument wrapper">
        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Movies</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link> / Movies
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Moives Search</h3>
                  </div>
                  <div className="card-body">
                  <ReactDatatable
                    config={this.config}
                    records={this.state.comments}
                    columns={this.columns}
                  />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
