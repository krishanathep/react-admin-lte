import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import "@fullcalendar/daygrid/main.css";

export default class MeetingRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarEvents: [{ title: "Event Now", start: new Date() }],
    };
  }
  handleDateClick = (arg) => {
    if (
      window.confirm("Would you like to add an event to " + arg.dateStr + "?")
    ) {
      this.setState({
        calendarEvents: this.state.calendarEvents.concat({
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };
  render() {
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
                  <div className="card-body">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      New Booking
                    </button>
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      events={this.state.calendarEvents}
                      dateClick={this.handleDateClick}
                    ></FullCalendar>
                  </div>
                  {/* /.card-body */}
                  {/* The Modal */}
                  <div className="modal fade" id="myModal">
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
                        <div className="modal-body">Modal body..</div>
                        {/* Modal footer */}
                        <div className="modal-footer">
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
