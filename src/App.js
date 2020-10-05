import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu";

class App extends Component {
    constructor(props) {
        
        super(props);

        this.state = {
            nurseId: "",
            isConnected: false,
        };

        this.setNurseId = this.setNurseId.bind(this);
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
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
