import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
import CustomInput from '../Form/customInput';

class PatientDetail extends Component {
  constructor (props){
    super (props)
    this.state = {
      redirect: null,
      waktuTest: [
        { id: 0, value: 'Pagi' },
        { id: 1, value: 'Siang' },
        { id: 2, value: 'Malam' },
      ],
      isWaktuSelected: false
    }

    this.toggleWaktu = this.toggleWaktu.bind(this)
  }

  toggleWaktu() {
    this.setState({
      isWaktuSelected: !this.state.isWaktuSelected
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: this.state
      }} />
  }
    return (
      <div className="w-full">
        <TitleBar
          title={'Registrasi Pasien'}
          back={true}
          next={false}
          setBack={() => this.setState({redirect: '/menu'})}
        />
        <div className="h-full flex items-center justify-center">
          <div className="w-2/5 bg-white space-y-3 mb-16">
            <div>
              <CustomInput
              data={this.props.patientId}
              label={"ID Pasien"}
              unit={""}
              value={this.props.patientId}
              onchange={ this.props.setPatientId }
              />
              <span className="text-xs text-gray-600">Masukkan ID atau NIK Pasien</span>
            </div>
            <div className="relative">
              <p className="text-brand-green font-semibold mb-1">Waktu Test</p>
              <button
              onClick = { this.toggleWaktu }
              className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                <p className="text-xl text-left flex-1 px-4 py-1">
                Pagi
                </p>
                <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              { this.state.isWaktuSelected && (<div className="absolute z-10 border bg-white w-full mt-2 rounded-md py-2 divide-y">
                { this.state.waktuTest.map(waktu => (
                  <div
                  key = { waktu.id }
                  onClick = { this.toggleWaktu }
                  className="text-lg p-2 cursor-pointer">{ waktu.value }</div>
                )) }
              </div>)}
            </div>
            <button
            onClick={() => this.setState({redirect: '/patient-detail'})}
            className="bg-brand-green text-lg p-2 w-full text-white rounded-lg">Lanjutkan</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PatientDetail;