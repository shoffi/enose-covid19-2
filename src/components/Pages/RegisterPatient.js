import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
import CustomInput from '../Form/customInput';

class PatientDetail extends Component {
  constructor (props){
    super (props)
    this.state = {
      redirect: null,
      waktuTestOptions: [
        { id: 0, value: 'Pagi' },
        { id: 1, value: 'Siang' },
        { id: 2, value: 'Malam' },
      ],
      isWaktuSelected: false
    }

    this.toggleWaktu = this.toggleWaktu.bind(this)
  }

  toggleWaktu(id) {
    this.setState({
      isWaktuSelected: !this.state.isWaktuSelected
    })
    this.props.setWaktuTes(id)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: this.state
      }} />
    }

    let waktuTes;
    switch (this.props.waktuTes) {
      case 0:
        waktuTes = 'Pagi'
        break;
      
      case 1:
        waktuTes = 'Siang'
        break;

      case 2:
        waktuTes = 'Malam'
        break;
    
      default:
        waktuTes = 'Pilih Waktu'
        break;
    }

    return (
      <div className="w-full">
        <TitleBar
          title={'Registrasi Pasien'}
          back={true}
          next={false}
          setBack={
            () => this.setState({redirect: '/menu'})
          }
        />

        <div className="mt-5 h-full flex items-center justify-center">
          <div className="w-2/5 bg-white space-y-3 mb-16">
            <div>
              <CustomInput
                data={this.props.patientId}
                value={this.props.patientId}
                label={"ID Pasien"}
                unit={""}
                onchange={ this.props.setPatientId }
              />
              <span className="text-sm text-gray-700">Masukkan ID atau NIK Pasien</span>
            </div>
            <div className="relative">
              <p className="text-brand-green font-semibold mb-1">Waktu Test</p>
              <button
                onClick = { () => this.toggleWaktu(this.props.waktuTes) }
                className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                <p className="text-lg font-semibold text-left flex-1 px-2 py-1">
                  {waktuTes}
                </p>
                <svg className="w-6 h-6 text-brand-orange mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              { this.state.isWaktuSelected && (<div className="absolute z-10 border bg-white w-full mt-2 rounded-md py-2 divide-y">
                { this.state.waktuTestOptions.map(waktu => (
                  <div
                  key = { waktu.id }
                  onClick = { () => this.toggleWaktu(waktu.id) }
                  className="text-lg p-2 cursor-pointer">{ waktu.value }</div>
                )) }
              </div>)}
            </div>
            <button
            onClick={
              () => {
                if(this.props.patientId !== '' && this.props.waktuTes !== ''){
                  this.setState({redirect: '/patient-detail'})
                }else{
                  alert('id pasien dan waktu test wajib diisi')
                }
              } }
            className="bg-brand-green font-semibold text-lg p-2 w-full text-white rounded-lg">Lanjutkan</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PatientDetail;