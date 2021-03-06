import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ambil_data from '../../images/ambil_data1.jpg';
import history from '../../images/history1.png';
import covid from '../../images/covid1.jpg';
import TitleBar from '../Nav/TitleBar';
const { ipcRenderer } = window;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            loading: false,
        }

        this.sync = this.sync.bind(this);
    }

    sync () {
        console.log('sync')
        ipcRenderer.send('dbSync')
        
        ipcRenderer.on('dbSyncDone', (event) => {
            alert(`sinkronisasi selesai`)
            this.setState({
                loading: false
            })
            ipcRenderer.removeAllListeners('dbSyncDone')
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="relative w-full items-center">
                <TitleBar
                        title={'Halaman Utama'}
                        back={true}
                        setBack={() => this.setState({redirect: '/connect'})}
                        next={true}
                        setNext={() => {
                            this.setState({
                                loading: true
                            })
                            this.sync()
                        }}
                        setNextName={'Database Sync'}
                    >
                </TitleBar>

                <div className="flex mt-5 space-x-5 pt-8">
                    <div className="w-1/3 p-2 bg-gray-200 rounded-lg">
                        <div className="mt-6 mb-8 mx-auto">
                            <img
                            src={ambil_data}
                            className="object-contain w-full h-32 lg:h-48"
                            alt="Ambil Data" />
                        </div>
                        <button
                        onClick={() => this.setState({redirect: '/register-patient'})}
                        className="bg-orange-500 w-full p-3 text-xl font-semibold text-white rounded-lg">
                        Ambil Sample</button>
                    </div>
                    <div className="w-1/3 p-2 bg-gray-200 rounded-lg">
                        <div className="mt-6 mb-8 mx-auto">
                            <img
                            src={history}
                            className="object-contain w-full h-32 lg:h-48"
                            alt="History" />
                        </div>
                        <button className="bg-gray-500 w-full p-3 text-xl font-semibold text-white cursor-not-allowed focus:outline-none rounded-lg">Riwayat</button>
                    </div>
                    <div className="w-1/3 p-2 bg-gray-200 rounded-lg">
                        <div className="mt-6 mb-8 mx-auto">
                            <img
                            src={covid}
                            className="object-contain w-full h-32 lg:h-48"
                            alt="Covid" />
                        </div>
                        <button
                        // onClick={() => this.setState({redirect: '/data-baru'})}
                        className="bg-gray-500 w-full p-3 text-xl font-semibold text-white cursor-not-allowed focus:outline-none rounded-lg">Data Baru</button>
                    </div>
                </div>

                {this.state.loading && (
                    <div className="absolute flex items-center bg-white w-full top-0 h-full z-10">
                        <div className="mx-auto w-72 border-2 border-brand-green rounded-lg overflow-hidden">
                            <div className="flex items-center bg-brand-green p-3">
                                <p className="text-xl text-center w-full font-semibold text-white">Proses Sinkronisasi</p>
                            </div>
                            <ul className="text-xl text-center font-semibold text-gray-700">
                                <h1>Tunggu hingga proses sinkronisasi selesai !</h1>
                            </ul>
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

export default Home;
