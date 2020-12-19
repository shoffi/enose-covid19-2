import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar'

class PatientDetail extends Component {
  constructor (props){
    super (props)
    this.state = {
      redirect: null,
    }
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
          title={'Register Pasien'}
          back={true}
          next={false}
          setBack={() => this.setState({redirect: '/menu'})}
        />
        <div className="h-full flex items-center justify-center">
          <div className="w-1/3 bg-white space-y-3">
            <div>
              <label className="block">ID Pasien</label>
              <input className="w-full bg-gray-300 px-2 py-3" type="text" placeholder="ID Pasien" />
              <span className="text-xs text-gray-600">Masukkan ID atau NIK Pasien</span>
            </div>
            <div>
              <label className="block">Waktu test</label>
              <input className="w-full bg-gray-300 px-2 py-3" type="text" placeholder="ID Pasien" />
            </div>
            <button
            onClick={() => this.setState({redirect: '/patient-detail'})}
            className="bg-brand-green p-2 w-full text-white">Pilih tanda vital</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PatientDetail;