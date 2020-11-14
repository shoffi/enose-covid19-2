import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import TopNav from "./components/Nav/Top";
import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu";
import AmbilSample from "./components/Pages/AmbilSample";
import MainChart from "./components/Pages/MainChart";
import Welcome from "./components/Pages/Welcome";
import Pengaturan from "./components/Pages/Pengaturan";

const { ipcRenderer } = window; 

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            rumahSakit: "",
            nurseId: "",
            ruangId: "",
            patientId: "",
            isConnected: false, //koneksi
            proses1 : null,
            proses2 : null,
            proses3 : null,
            renderMainChart: true,
            ruangan: [
              {id: 1, name: 'ICU'},
              {id: 2, name: 'Rawat Inap'},
              {id: 3, name: 'Kesehatan'},
          ],
        };

        ipcRenderer.send('getPengaturan')
        ipcRenderer.on('getPengaturanResponse', (event, response) => {
            this.setState({
                proses1 : response[0],
                proses2 : response[1],
                proses3 : response[2],
            })
        })

        this.setNurseId = this.setNurseId.bind(this);
        this.setRuangId = this.setRuangId.bind(this);
        this.setPatientId = this.setPatientId.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
    }

    componentDidMount () {
      ipcRenderer.send('mounted');
      ipcRenderer.on('mountedResponse', (event, rumahSakit) => {
        this.setState({ 
          rumahSakit: rumahSakit
        })
      });

      ipcRenderer.send('coba', 'Satu dua tiga empat');
      ipcRenderer.on('cobaResponse', (event, response) => {
        // console.log(response)
      });
    }

    connect() {
      let connectStatus = true
      
      ipcRenderer.send('connect');
      
      this.setState({ 
        isConnected: true
      })
      
      return connectStatus;
    }

    disconnect () {
      // ipcRenderer.send('disconnect');
      this.setState({
        isConnected: false
      });
    }

    setNurseId(event) {
      this.setState({
          nurseId: event.target.value,
      });
    }

    setRuangId(value) {
      // alert(`Ruangan ${value.id} & ${value.name}`);
      this.setState({
          ruangId: value.id,
      });
    }
    // setRuangId(event) {
    //   console.log(`setRuangId ${event.target.value}`)
    //   this.setState({
    //       ruangId: event.target.value,
    //   });
    // }

    setPatientId(event) {
      this.setState({
          patientId: event.target.value,
      });
    }

    forceUpdateHandler(){
      alert("hahaha")
      ipcRenderer.send('getPengaturan')
      this.forceUpdate();
    };

    updateTimer(){
      ipcRenderer.send('getPengaturan')
      ipcRenderer.once('getPengaturanResponse', (event, response) => {
          alert("hoho")
          this.setState({
              proses1 : response[0],
              proses2 : response[1],
              proses3 : response[2],
          })
      })
    }

    render() {

      return (
        <div className="min-h-screen flex flex-col">
          <TopNav></TopNav>
          <Router>
            <div className="flex-grow">
            
              <Route path='/' exact>
                  <Welcome
                    forceUpdateHandler = {this.forceUpdateHandler}
                    connect={this.connect}
                  />
              </Route>
              
              <Route path='/connect' exact>
                  <Home
                      nurseId={this.state.nurseId}
                      ruangId={this.state.ruangId}
                      setNurseId={this.setNurseId}
                      setRuangId={this.setRuangId}
                      ruangan={this.state.ruangan}
                  />
              </Route>

              <Route path='/menu' exact>
                  <Menu/>
              </Route>
              
              <Route path='/ambil-sample' exact>
                  <AmbilSample
                    setPatientId={this.setPatientId}
                    nurseId={this.state.nurseId}
                    patientId={this.state.patientId}
                    ruangId={this.state.ruangId}
                  />
              </Route>

              <Route path='/history' exact>
                  <Menu/>
              </Route>

              <Route path='/data-baru' exact>
                  <Menu/>
              </Route>

              { this.state.renderMainChart ? 
                // <Child unmountMe={this.handleChildUnmount} /> 
                <Route 
                  path="/main-chart" 
                  render={(props) => (
                    <MainChart 
                      {...props}
                      proses1={this.state.proses1}
                      proses2={this.state.proses2}
                      proses3={this.state.proses3}
                      // key={0}
                    />
                  )}
                />
                : null
              }

              <Route path='/pengaturan' exact>
                  <Pengaturan 
                    proses1={this.state.proses1}
                    proses2={this.state.proses2}
                    proses3={this.state.proses3}
                    forceUpdateHandler = {this.forceUpdateHandler}
                  />
              </Route>
          </div>
          <Nav
                isConnected={this.state.isConnected}
                nurseId={this.state.nurseId}
                patientId={this.state.patientId}
                ruangId={this.state.ruangId}
                rumahSakit={this.state.rumahSakit}
                connect={this.connect}
                disconnect={this.disconnect}
            />

          </Router>
          
        </div>
      );
    }
}

export default App;
