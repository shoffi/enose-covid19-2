import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import TopNav from "./components/Nav/Top";
import Home from "./components/Pages/Home";
import Menu from "./components/Pages/Menu";
import AmbilSample from "./components/Pages/AmbilSample";
import PatientDetail from "./components/Pages/PatientDetail";
import MainChart from "./components/Pages/MainChart";
import Welcome from "./components/Pages/Welcome";
import Pengaturan from "./components/Pages/Pengaturan";
import Modal from './components/Modal';

const { ipcRenderer } = window; 

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            rumahSakit: "",
            nurseId: "",
            ruangId: "",
            patientId: "",
            covidStatus: "",

            suhuTubuh: "",
            asamUrat: "",
            kolestrol: "",
            saturasiOksigen: "",
            gulaDarah: "",
            denyutJantung: "",

            toggleModal: false,

            isConnected: false,
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

        this.setSuhuTubuh = this.setSuhuTubuh.bind(this);
        this.setAsamUrat = this.setAsamUrat.bind(this);
        this.setKolestrol = this.setKolestrol.bind(this);
        this.setSaturasiOksigen = this.setSaturasiOksigen.bind(this);
        this.setGulaDarah = this.setGulaDarah.bind(this);
        this.setDenyutJantung = this.setDenyutJantung.bind(this);

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.updateTimer = this.updateTimer.bind(this);

        this.setToggleModal = this.setToggleModal.bind(this);
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
        isConnected: false,
      });
      this.setToggleModal();
    }

    setNurseId(event) {
      this.setState({
          nurseId: event.target.value,
      });
    }

    setRuangId(value) {
      this.setState({
          ruangId: value,
      });
    }

    setPatientId(event) {
      this.setState({
          patientId: event.target.value,
      });
    }

    setSuhuTubuh (event) {
      this.setState({
          suhuTubuh: event.target.value,
      })
    }

    setAsamUrat (event) {
      this.setState({
          asamUrat: event.target.value,
      })
    }

    setKolestrol (event) {
      this.setState({
          kolestrol: event.target.value,
      })
    }

    setSaturasiOksigen (event) {
      this.setState({
          saturasiOksigen: event.target.value,
      })
    }

    setGulaDarah (event) {
      this.setState({
          gulaDarah: event.target.value,
      })
    }

    setDenyutJantung (event) {
      this.setState({
          denyutJantung: event.target.value,
      })
    }

    setToggleModal() {
      this.setState({
        toggleModal : !this.state.toggleModal
      })
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
        <div className="relative">

          <div className="fixed w-full bg-white z-20 border-b px-4 py-2">
            <TopNav></TopNav>
          </div>

          <Router>
            <div className="container mx-auto min-h-screen flex z-0 py-20">
            
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

              <Route path='/patient-detail' exact>
                  <PatientDetail
                    patientId={this.state.patientId}
                    suhuTubuh={this.state.suhuTubuh}
                    asamUrat={this.state.asamUrat}
                    kolestrol={this.state.kolestrol}
                    saturasiOksigen={this.state.saturasiOksigen}
                    gulaDarah={this.state.gulaDarah}
                    denyutJantung={this.state.denyutJantung}
                    setPatientId={this.setPatientId}
                    setSuhuTubuh = {this.setSuhuTubuh}
                    setAsamUrat = {this.setAsamUrat}
                    setKolestrol = {this.setKolestrol}
                    setSaturasiOksigen = {this.setSaturasiOksigen}
                    setGulaDarah = {this.setGulaDarah}
                    setDenyutJantung = {this.setDenyutJantung}
                  />
              </Route>
              
              <Route path='/ambil-sample' exact>
                  <AmbilSample
                    nurseId={this.state.nurseId}
                    ruangId={this.state.ruangId}
                    patientId={this.state.patientId}
                    covidStatus={this.state.covidStatus}
                    suhuTubuh= {this.state.suhuTubuh}
                    asamUrat= {this.state.asamUrat}
                    kolestrol= {this.state.kolestrol}
                    saturasiOksigen= {this.state.saturasiOksigen}
                    gulaDarah= {this.state.gulaDarah}
                    denyutJantung= {this.state.denyutJantung}
                  />
              </Route>

              <Route path='/history' exact>
                  <Menu/>
              </Route>

              <Route path='/data-baru' exact>
                  <Menu/>
              </Route>

              { this.state.renderMainChart ?  
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
          
          <div className="absolute top-0 w-full z-10">
              {this.state.toggleModal && (
                <Modal
                  setToggleModal = {this.setToggleModal}
                  disconnect = {this.disconnect}
                ></Modal>
              )}
          </div>

          <div className="fixed w-full bottom-0">
            <Nav
                  isConnected={this.state.isConnected}
                  nurseId={this.state.nurseId}
                  patientId={this.state.patientId}
                  ruangId={this.state.ruangId}
                  rumahSakit={this.state.rumahSakit}
                  connect={this.connect}
                  disconnect={this.disconnect}
                  setToggleModal = {this.setToggleModal}
              />
          </div>

          </Router>
          
        </div>
      );
    }
}

export default App;
