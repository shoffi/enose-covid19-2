import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";

import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu";
import AmbilSample from "./components/Pages/AmbilSample";
import MainChart from "./components/Pages/MainChart";

class App extends Component {
    constructor(props) {
        
        super(props);

        this.state = {
            nurseId: "",
            patientId: "",
            isConnected: false,
        };

        this.setNurseId = this.setNurseId.bind(this);
        this.setPatientId = this.setPatientId.bind(this);
    }

  connect() {
    this.setState({
        isConnected: true,
    });
  }

  setNurseId(event) {
    this.setState({
         nurseId: event.target.value,
    });
  }

  setPatientId(event) {
    this.setState({
         patientId: event.target.value,
    });
    console.log(this.state.patientId)
  }

  render() {
    return (
      <div className="">
        <Nav
            nurseId={this.state.nurseId}
        />
        <div className="content">
          <Router>
            
            <Route path='/' exact>
                <Home
                    connect={this.connect}
                    setNurseId={this.setNurseId}
                    nurseId={this.state.nurseId}
                />
            </Route>

            <Route path='/menu' exact>
                <Menu/>
            </Route>
            
            <Route path='/ambil-sample' exact>
                <AmbilSample
                  setPatientId={this.setPatientId}
                  patientId={this.state.patientId}
                />
            </Route>
            <Route path='/history' exact>
                <Menu/>
            </Route>
            <Route path='/data-baru' exact>
                <Menu/>
            </Route>

            <Route path='/main-chart' exact>
                <MainChart></MainChart>
            </Route>

          </Router>
        </div>
      </div>
    );
  }
}

export default App;
