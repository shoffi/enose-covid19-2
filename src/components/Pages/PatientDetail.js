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
                    <div className="flex w-3/5 mx-auto pt-12 space-x-6">
                        <div className="flex-1 text-2xl space-y-3">
                            <div>
                                <p className=" mb-1">ID Pasien</p>
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
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default PatientDetail