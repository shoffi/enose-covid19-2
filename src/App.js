import React, { Component } from 'react';
import Nav from './components/Nav';
import Home from './components/Pages/Home';

class App extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      nurseId: '',
      isConnected: false
    }

    this.setNurseId = this.setNurseId.bind(this);
  }

  connect () {
    this.setState({
      isConnected: true
    })
  }

  setNurseId (event) {
    this.setState({
      nurseId: event.target.value
    })
  }
  
  render () {
    return (
      <div className="">
        <Nav></Nav>
        <div className="content">
          <Home connect={this.connect} setNurseId={this.setNurseId} nurseId={this.state.nurseId} />
        </div>
      </div>
    );
  }
}

export default App;
