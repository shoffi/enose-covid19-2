import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
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
            proses3 : null
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

    setRuangId(event) {
      console.log(`setRuangId ${event.target.value}`)
      this.setState({
          ruangId: event.target.value,
      });
    }

    setPatientId(event) {
      this.setState({
          patientId: event.target.value,
      });
    }

    render() {
      return (
        <div className="">

          <Router>

            <Nav
                isConnected={this.state.isConnected}
                nurseId={this.state.nurseId}
                patientId={this.state.patientId}
                ruangId={this.state.ruangId}
                rumahSakit={this.state.rumahSakit}
                connect={this.connect}
                disconnect={this.disconnect}
            />

            <div className="container">
            
              <Route path='/' exact>
                  <Welcome
                    connect={this.connect}
                  />
              </Route>
              
              <Route path='/connect' exact>
                  <Home
                      nurseId={this.state.nurseId}
                      ruangId={this.state.ruangId}
                      setNurseId={this.setNurseId}
                      setRuangId={this.setRuangId}
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

              <Route 
                path="/main-chart" 
                render={(props) => (
                  <MainChart 
                    {...props}
                    proses1={this.state.proses1}
                    proses2={this.state.proses2}
                    proses3={this.state.proses3}
                  />
                )}
              />

              <Route path='/pengaturan' exact>
                  <Pengaturan 
                    proses1={this.state.proses1}
                    proses2={this.state.proses2}
                    proses3={this.state.proses3}
                  />
              </Route>

          </div>

          </Router>
          
        </div>
      );
    }
}

export default App;
