import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Keyboard from "react-simple-keyboard";

import TitleBar from '../Nav/TitleBar'
import '../../styles/keyboard.css'

class PatientDetail extends Component {

    constructor (props){
        super (props)

        this.state = {
            redirect: null,
            isFocus: true,

            allInputs: {},
            inputName: 'default'
        }
    }

    render () {
        if (this.state.redirect) {
            return  <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state
                        }} 
                    />
        }

        return (
            <div>
                <TitleBar
                    title={'Detail Pasien'}
                    back={true}
                    next={true}
                    setBack={() => this.setState({redirect: '/menu'})}
                    setNext={() => this.setState({redirect: '/ambil-sample'})}
                    setNextName={'Pilih Gejala'}
                ></TitleBar>

                <div className="py-8">
                    <div className="flex mx-auto pt-6 space-x-6">

                        <div className="w-1/4">
                            <div className="mb-2">
                                <p className="text-xl mb-1">ID Pasien</p>
                                <input
                                    type="text"
                                    onFocus={() => this.setState({inputName: 'PatientId'})}
                                    value = { this.state.allInputs.PatientId }
                                    onChange={ (event) => {
                                        this.props.setPatientId(event.target.value)
                                        this.setState({
                                            allInputs: { ...this.state.allInputs, PatientId: event.target.value }
                                        })
                                    } }
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="ID Pasien"
                                />
                                <p className="text-gray-600 mt-1 text-xs leading-tight">
                                    Masukkan ID atau NIK pasien.
                                </p>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Waktu</p>
                                <button
                                className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                                    <p
                                    className="text-xl text-left flex-1 font-semibold px-4 py-2">
                                    Pagi
                                    </p>
                                    <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div className="w-3/4 grid grid-cols-3 gap-3 border-l pl-4">
                            <div>
                                <p className="text-xl mb-1">Suhu Tubuh</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        onFocus={() => this.setState({inputName: 'SuhuTubuh'})}
                                        value = { this.state.allInputs.SuhuTubuh }
                                        onChange={ (event) => {
                                            this.props.setSuhuTubuh(event.target.value)
                                            this.setState({
                                                allInputs: { ...this.state.allInputs, SuhuTubuh: event.target.value }
                                            })
                                        } }
                                        className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="36.5"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">°C</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Asam Urat</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        // value={this.props.asamUrat}
                                        // onChange={this.props.setAsamUrat}
                                        onFocus={() => this.setState({inputName: 'AsamUrat'})}
                                        value = { this.state.allInputs.AsamUrat }
                                        onChange={ (event) => {
                                            this.props.setAsamUrat(event.target.value)
                                            this.setState({
                                                allInputs: { ...this.state.allInputs, AsamUrat: event.target.value }
                                            })
                                        } }
                                        className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="7.5"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Kolesterol</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        // value={this.props.kolestrol}
                                        // onChange={this.props.setKolestrol}
                                        onFocus={() => this.setState({inputName: 'Kolestrol'})}
                                        value = { this.state.allInputs.Kolestrol }
                                        onChange={ (event) => {
                                            this.props.setKolestrol(event.target.value)
                                            this.setState({
                                                allInputs: { ...this.state.allInputs, Kolestrol: event.target.value }
                                            })
                                        } }
                                        className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="200"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Saturasi Oksigen</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        // value={this.props.saturasiOksigen}
                                        // onChange={this.props.setSaturasiOksigen}
                                        onFocus={() => this.setState({inputName: 'SaturasiOksigen'})}
                                        value = { this.state.allInputs.SaturasiOksigen }
                                        onChange={ (event) => {
                                            this.props.setSaturasiOksigen(event.target.value)
                                            this.setState({
                                                allInputs: { ...this.state.allInputs, SaturasiOksigen: event.target.value }
                                            })
                                        } }
                                        className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="95"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">%</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Gula Darah</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        // value={this.props.gulaDarah} 
                                        // onChange={this.props.setGulaDarah}
                                        onFocus={() => this.setState({inputName: 'GulaDarah'})}
                                        value = { this.state.allInputs.GulaDarah }
                                        onChange={ (event) => {
                                            this.props.setGulaDarah(event.target.value)
                                            this.setState({
                                                allInputs: { ...this.state.allInputs, GulaDarah: event.target.value }
                                            })
                                        } }
                                        className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="100"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Denyut Jantung</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        // value={this.props.denyutJantung} 
                                        // onChange={this.props.setDenyutJantung}
                                        onFocus={() => this.setState({inputName: 'DenyutJantung'})}
                                        value = { this.state.allInputs.DenyutJantung }
                                        onChange={ (event) => {
                                            this.props.setDenyutJantung(event.target.value)
                                            this.setState({
                                                allInputs: { ...this.state.allInputs, DenyutJantung: event.target.value }
                                            })
                                        } }
                                        className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="60"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">BPM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                { this.state.isFocus && (
                    <Keyboard
                        
                        onChange={this.onChangeKeyboard}
                        onKeyPress={this.onKeyPress}
                        inputName={this.state.inputName}
                        onChangeAll={ (inputs) => {
                            this.setState({
                                allInputs: inputs
                            })
                            for (const key in inputs) {
                                if (inputs.hasOwnProperty(key)) {
                                    const value = inputs[key];
                                    this.props['set'+key] && this.props['set'+key](value)
                                }
                            }
                        } }
                    />
                    // <Keyboard
                    //     keyboardRef={r => (keyboard.current = r)}
                    //     inputName={inputName}
                    //     layoutName={layoutName}
                    //     onChangeAll={onChangeAll}
                    //     onKeyPress={onKeyPress}
                    // />
                )}
            </div>
        )
    }
}

export default PatientDetail