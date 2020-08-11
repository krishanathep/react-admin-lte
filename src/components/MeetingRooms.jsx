import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import firebase from "../config/firebase";

import "@fullcalendar/daygrid/main.css";

export default class MeetingRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: "",
      date: "",
      end: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title) {
      alert("Please input data!");
    }

    const eventRef = firebase.database().ref("events");

    const event = {
      title: this.state.title,
      date: this.state.date,
      end: this.state.end,
    };

    eventRef.push(event);

    this.setState({
      event_id: "",
      title: "",
      date: "",
      end: "",
    });
  };

  updateEvent() {}

  componentDidMount() {
    const fetchEvent = firebase.database().ref('events');
    fetchEvent.on('value', (snapshot)=>{
      let events = snapshot.val();
      let newEvent = [];
      for(let event in events){
        newEvent.push({
          event_id: event,
          title: events[event].title,
          date: events[event].date,
          end: events[event].end
        })
      }
      this.setState({
        events: newEvent
      })
      console.log(this.state.events)
    })
  }

  render() {
    const { title, date, end } = this.state;
    return (
      <div className="wrapper">
        <Navbar />
        <Sidebar />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Meeting Rooms</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link> / Meeting-Rooms
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
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      events={this.state.events}
                    ></FullCalendar>
                  </div>
                  {/* /.card-body */}
                  {/* The Modal */}
                  <div className="modal fade" id="createModal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                          <h4 className="modal-title">Modal Heading</h4>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            ×
                          </button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">
                          <div className="form-group">
                            <label htmlFor="">Event Title :</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={title}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Start Event :</label>
                            <input
                              type="date"
                              className="form-control"
                              name="date"
                              value={date}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">End Event :</label>
                            <input
                              type="date"
                              className="form-control"
                              name="end"
                              value={end}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                          <button
                            onClick={this.handleSubmit}
                            className="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
