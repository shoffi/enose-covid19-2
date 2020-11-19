import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import TitleBar from '../Nav/TitleBar'

class PatientDetail extends Component {

    constructor (props){
        super (props)

        this.state = {
            redirect: null,
        }
    }

    render () {
        if (this.state.redirect) {
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
                            <p className="text-xl mb-1">ID Pasien</p>
                            <input
                            type="text"
                            value={this.props.patientId} 
                            onChange={this.props.setPatientId}
                            className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                            placeholder="ID Pasien"
                            />
                            <p className="text-gray-600 mt-3">
                                Masukkan ID atau NIK pasien.
                            </p>
                        </div>
                        <div className="w-3/4 grid grid-cols-2 gap-3 border-l pl-4">
                            <div>
                                <p className="text-xl mb-1">Suhu Tubuh</p>
                                <div className="relative">
                                    <input
                                    type="text"
                                    onChange={this.props.setSuhuTubuh}
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="36,5"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">°C</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Asam Urat</p>
                                <div className="relative">
                                    <input
                                    type="text"
                                    onChange={this.props.setAsamUrat}
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="7,5"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">mg/dL</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-1">Kolesterol</p>
                                <div className="relative">
                                    <input
                                    type="text"
                                    onChange={this.props.setSuhuTubuh}
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
                                    onChange={this.props.setSuhuTubuh}
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
                                    onChange={this.props.setAsamUrat}
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
                                    onChange={this.props.setAsamUrat}
                                    className="w-full text-2xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                    placeholder="60"
                                    />
                                    <p className="mx-3 text-xl text-gray-600 flex items-center absolute inset-y-0 right-0">BPM</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="w-3/4 text-2xl space-y-3">
                            <div>
                                <p className=" mb-1">ID Pasien 1</p>
                                <input
                                type="text"
                                value={this.props.patientId} 
                                onChange={this.props.setPatientId}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="ID Pasien"
                                />
                            </div>

                            <div>
                                <p className=" mb-1">Suhu Tubuh</p>
                                <input
                                type="text"
                                value={this.state.suhuTubuh} 
                                onChange={this.setSuhuTubuh}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="Suhu Tubuh"
                                />
                            </div>

                            <div>
                                <p className=" mb-1">Asam Urat</p>
                                <input
                                type="text"
                                value={this.state.asamUrat} 
                                onChange={this.setAsamUrat}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="Asam Urat"
                                />
                            </div>

                            <div>
                                <p className=" mb-1">Kolestrol</p>
                                <input
                                type="text"
                                value={this.state.kolestrol} 
                                onChange={this.setKolestrol}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="Kolestrol"
                                />
                            </div>

                            <div>
                                <p className=" mb-1">Saturasi Oksigen</p>
                                <input
                                type="text"
                                value={this.state.saturasiOksigen} 
                                onChange={this.setSaturasiOksigen}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="Saturasi Oksigen"
                                />
                            </div>

                            <div>
                                <p className=" mb-1">Gula Darah</p>
                                <input
                                type="text"
                                value={this.state.gulaDarah} 
                                onChange={this.setGulaDarah}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="Gula Darah"
                                />
                            </div>

                            <div>
                                <p className=" mb-1">Denyut Jantung</p>
                                <input
                                type="text"
                                value={this.state.denyutJantung} 
                                onChange={this.setDenyutJantung}
                                className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-gray-900 rounded-lg"
                                placeholder="Denyut Jantung"
                                />
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        )
    }
}

export default PatientDetail