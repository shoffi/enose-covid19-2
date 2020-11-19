import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ambil_data from '../../images/ambil_data.png';
import history from '../../images/history.png';
import covid from '../../images/covid.png';
import TitleBar from '../Nav/TitleBar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <TitleBar
                    title={'Halaman Utama'}
                    back={true}
                    setBack={() => this.setState({redirect: '/connect'})}
                    next={false}>
                </TitleBar>

                <div className="flex space-x-5 pt-8">
                    <div className="w-1/3 p-2 bg-gray-200 rounded-lg">
                        <div className="mt-6 mb-8 mx-auto">
                            <img
                            src={ambil_data}
                            className="object-contain w-full h-32 lg:h-48"
                            alt="Ambil Data" />
                        </div>
                        <button
                        onClick={() => this.setState({redirect: '/patient-detail'})}
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
                        <button className="bg-gray-500 w-full p-3 text-xl font-semibold text-white cursor-not-allowed opacity-50 rounded-lg">Riwayat</button>
                    </div>
                    <div className="w-1/3 p-2 bg-gray-200 rounded-lg">
                        <div className="mt-6 mb-8 mx-auto">
                            <img
                            src={covid}
                            className="object-contain w-full h-32 lg:h-48"
                            alt="Covid" />
                        </div>
                        <button className="bg-gray-500 w-full p-3 text-xl font-semibold text-white cursor-not-allowed opacity-50 rounded-lg">Data Baru</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
