import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
import CustomInput from '../Form/customInput';

class AmbilSample extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          redirect: null,

          nurse_id: this.props.nurseId,
          ruang_id: this.props.ruangId,
          patient_id: this.props.patientId,
          covidStatus: this.props.covidStatus,

          suhuTubuh: this.props.suhuTubuh,
          asamUrat: this.props.asamUrat,
          kolestrol: this.props.kolestrol,
          saturasiOksigen: this.props.saturasiOksigen,
          gulaDarah: this.props.gulaDarah,
          denyutJantung: this.props.denyutJantung,
          hasilSwab: [
              { id: 1, value: 'Negatif Covid-19'},
              { id: 2, value: 'Positif - Tanpa gejala'},
              { id: 3, value: 'Positif - Ringan'},
              { id: 4, value: 'Positif - Sedang/moderat'},
              { id: 5, value: 'Positif - Berat/Pneumonia Berat'},
              { id: 6, value: 'Positif - Kritis'},
              { id: 7, value: 'Tidak diketahui'},
          ],
          isHasilSelected: false,

          alatPCR: [
              { id: 1, value: 'A'},
              { id: 2, value: 'B'},
              { id: 3, value: 'C'},
              { id: 4, value: 'D'},
              { id: 5, value: 'E'},
          ],
          isPCRSelected: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePatientId = this.handlePatientId.bind(this)
        this.startSampling = this.startSampling.bind(this)
        this.toggleHasil = this.toggleHasil.bind(this)
        this.togglePCR = this.togglePCR.bind(this)
    }

    componentDidMount(){
        console.log("componentDidMount")
        console.log(this.props)
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState({
            redirect: '/main-chart'
        })
    }

    handleDiseaseCheckboxes = (event) => {
        let diseases = this.state.diseases
        diseases.forEach(disease => {
           if (disease.value === event.target.value)
              disease.isChecked =  event.target.checked
        })
        this.setState({diseases: diseases})
    }

    handleComorbiditiesCheckboxes = (event) => {
        let comorbidities = this.state.comorbidities
        comorbidities.forEach(comorbidity => {
           if (comorbidity.value === event.target.value)
              comorbidity.isChecked =  event.target.checked
        })
        this.setState({comorbidities: comorbidities})
    }

    handlePatientId = (event) => {
        this.props.setPatientId(event)
        this.setState({
            patient_id: event.target.value
        })
    }

    handleCovidStatus = (event) => {
        this.setState({
            covidStatus: event.target.checked
        })
    }

    startSampling = () => {
        this.setState({
            redirect: '/main-chart'
        })
    }

    toggleHasil() {
        this.setState({
            isHasilSelected: !this.state.isHasilSelected
        })
    }
    togglePCR() {
        this.setState({
            isPCRSelected: !this.state.isPCRSelected
        })
    }

    render () {
        if (this.state.redirect) {
            console.log(this.state) 
            return <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state
                        }}
                    />
        }
        
        return (
            <div>
                <TitleBar
                    title={'Hasil Lab'}
                    back={true}
                    next={true}
                    setBack={() => this.setState({redirect: '/patient-detail'})}
                    setNext={() => this.setState({redirect: '/ambil-sample'})}
                    setNextName={'Gejala Pasien'}
                ></TitleBar>

                <div className="py-8">
                  <div className="flex items-start space-x-4">
                      <div className="w-1/3 relative">
                          <p className="text-brand-green font-semibold mb-1">Hasil Swab</p>
                          <button
                          onClick = { this.toggleHasil }
                          className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                              <p
                              className="text-xl text-left flex-1 px-3 py-1">
                              Negatif Covid-19
                              </p>
                              <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                          <p className="text-xs text-gray-700 leading-tight mt-2">Jika tidak ada hasil swab hari ini, maka pilih<br /><span className="font-bold text-brand-green">tidak diketahui</span></p>
                          { this.state.isHasilSelected && (<div className="absolute z-10 h-56 scrolling-touch overflow-y-scroll border bg-white w-full mt-2 rounded-md py-1 divide-y">
                              { this.state.hasilSwab.map(hasil => (
                                  <div
                                  key = { hasil.id }
                                  onClick = { this.toggleHasil }
                                  className="p-2 cursor-pointer">{ hasil.value }</div>
                              )) }
                          </div>)}
                      </div>
                      <div className="w-1/3 relative">
                          <p className="text-brand-green font-semibold mb-1">Alat PCR</p>
                          <button
                          onClick = { this.togglePCR }
                          className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                              <p
                              className="text-xl text-left flex-1 px-4 py-1">
                              PCR Tipe A
                              </p>
                              <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                          { this.state.isPCRSelected && (<div className="absolute z-10 border bg-white w-full mt-2 rounded-md py-2 divide-y">
                              { this.state.alatPCR.map(pcr => (
                                  <div
                                  key = { pcr.id }
                                  onClick = { this.togglePCR }
                                  className="p-2 cursor-pointer">PCR Tipe { pcr.value }</div>
                              )) }
                          </div>)}
                      </div>
                      <div className="w-1/3">
                        <CustomInput
                        data={this.props.ctPcr}
                        label={"CT PCR"}
                        unit={""}
                        onchange={ this.props.setCtPcr }
                        />
                      </div>
                  </div>
                  <hr className="my-5" />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                        <CustomInput
                        data={this.props.ddimer}
                        label={"D-Dimer"}
                        unit={""}
                        onchange={ this.props.setDdimer }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.hemoglobin}
                        label={"Hemoglobin"}
                        unit={""}
                        onchange={ this.props.setHemoglobin }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.leukosit}
                        label={"Leukosit"}
                        unit={""}
                        onchange={ this.props.setLeukosit }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.trombosit}
                        label={"Trombosit"}
                        unit={""}
                        onchange={ this.props.setTrombosit }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.LED}
                        label={"LED"}
                        unit={""}
                        onchange={ this.props.setLED }
                        />
                    </div>
                    <div>
                        <CustomInput
                        data={this.props.bloodGas}
                        label={"Blood Gas Analysis"}
                        unit={""}
                        onchange={ this.props.setBloodGas }
                        />
                    </div>
                  </div>

                </div>
            </div>
        )
    }
}

export default AmbilSample;
