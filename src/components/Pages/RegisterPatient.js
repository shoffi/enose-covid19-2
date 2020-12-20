import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
import CustomInput from '../Form/customInput';

class PatientDetail extends Component {
  constructor (props){
    super (props)
    this.state = {
      redirect: null,
    }
  }

  // setPatientId = (data) => {
  //   this.setState({ test: data })
  // }

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
              onchange={ this.props.setPatientId }
              />
              <span className="text-xs text-gray-600">Masukkan ID atau NIK Pasien</span>
            </div>
            <div>
              <label className="block">Waktu test</label>
              <input className="w-full bg-gray-300 px-2 py-3" type="text" placeholder="ID Pasien" />
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