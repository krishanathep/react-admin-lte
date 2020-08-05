import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import firebase, { auth } from "../config/firebase";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default class Covid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTimeline: [],
      dataTimeline15: [],
      data_text: {
        updateDate: "",
        confirmed: "",
        hospitalized: "",
        deaths: "",
        recovered: "",
        newConfirmed: "",
        newHospitalized: "",
        newDeaths: "",
        newRecovered: "",
      },
      data_pie: [{}],
    };
  }

  componentDidMount() {
    this.callAPI();
    this.userLogin();
    this.currentUser();
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

  callAPI() {
    axios
      .get("https://covid19.th-stat.com/api/open/timeline")
      .then((response) => {
        console.log(response.data);
        const data = response.data["Data"];
        const lastData = data.slice(-1)[0];
        this.setState({
          dataTimeline: data,
          dataTimeline15: data.slice(1).slice(-15),
          data_text: {
            source: response.data["Source"],
            updateDate: lastData["Date"],
            confirmed: lastData["Confirmed"],
            hospitalized: lastData["Hospitalized"],
            deaths: lastData["Deaths"],
            recovered: lastData["Recovered"],
            newConfirmed: lastData["NewConfirmed"],
            newHospitalized: lastData["NewHospitalized"],
            newDeaths: lastData["NewDeaths"],
            newRecovered: lastData["NewRecovered"],
          },
          data_pie: [
            { name: "hospitalized", value: lastData["Hospitalized"] },
            { name: "deaths", value: lastData["Deaths"] },
            { name: "recovered", value: lastData["Recovered"] },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { dataTimeline, dataTimeline15, data_text, data_pie } = this.state;
    return (
      <div className="Covid wrapper">
        <Navbar />
        <Sidebar />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>COVID 19 THAILAND</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/home">Home</Link> / Covid 19
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                <div className="info-box">
                  <span className="info-box-icon bg-info">
                    <i className="fas fa-viruses"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">CONFIRMED ({data_text.newConfirmed.toLocaleString()})</span>
                    <span className="info-box-number">{data_text.confirmed.toLocaleString()}</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-12">
                <div className="info-box">
                  <span className="info-box-icon bg-primary">
                  <i className="fas fa-clinic-medical"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">HOSPITALIZED ({data_text.newHospitalized.toLocaleString()})</span>
                    <span className="info-box-number">{data_text.hospitalized.toLocaleString()}</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-12">
                <div className="info-box">
                  <span className="info-box-icon bg-success">
                  <i className="fas fa-user-md"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">RECOVERED ({data_text.newRecovered.toLocaleString()})</span>
                    <span className="info-box-number">{data_text.recovered.toLocaleString()}</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-12">
                <div className="info-box">
                  <span className="info-box-icon bg-danger">
                  <i className="fas fa-skull"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">DEATHS ({data_text.newDeaths.toLocaleString()})</span>
                    <span className="info-box-number">{data_text.deaths.toLocaleString()}</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-chart-bar"></i> Bar Chart
                    </h3>
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
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart width={500} height={300} data={dataTimeline15}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="NewConfirmed" fill="#8884d8" />
                        <Bar dataKey="NewDeaths" fill="#FF9AA2" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-chart-pie"></i> Pie Chart
                    </h3>
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
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart width={400} height={300}>
                        <Legend />
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={data_pie}
                          outerRadius={100}
                          label
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#FF9AA2" />
                          <Cell fill="#8FC1A9" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
              <div className="col-md-12">
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-chart-area"></i> Area Chart
                    </h3>
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
                    <ResponsiveContainer width="100%" height={500}>
                      <LineChart
                        data={dataTimeline}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Confirmed"
                          stroke="blue"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Hospitalized"
                          stroke="orange"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Deaths"
                          stroke="red"
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="Recovered"
                          stroke="green"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  {/* /.card-body */}
                </div>
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
