import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
            isModalOpen: false,
            isConnected: this.props.isConnected,
            ruangan: this.props.ruangan || [],
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.selectRuangan = this.selectRuangan.bind(this);
    }

    handleSubmit(event) { 
        event.preventDefault();
        let status = true;
        
        if (status) {
            this.setState({
                redirect: '/menu',
                isConnected: true
            });
        }
    }

    openModal() {
        // e.preventDefault();
        this.setState(state => ({
            isModalOpen: !state.isModalOpen
        }));
    };

    selectRuangan(kamar) {
        this.setState ({
            selectedRuangan: kamar,
        })
        this.props.setRuangId(kamar);
        this.openModal();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let ruangan;
        if (this.props.ruangId) {
            ruangan = this.props.ruangId.name;
        } else {
            ruangan = 'Pilih ruangan';
        }

        return (
            <div className="relative flex">
                <div className="flex w-4/5 mx-auto pt-12 space-x-6 items-end">
                    <div className="flex-1 text-2xl space-y-3">
                        <div>
                            <p className="text-brand-green mb-1">ID Perawat</p>
                            <input
                            type="text"
                            value={this.props.nurseId} 
                            onChange={this.props.setNurseId}
                            className="w-full font-semibold px-4 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                            placeholder="ID Perawat"
                            />
                        </div>
                        <div>
                            <p className="text-brand-green mb-1">Ruangan</p>
                            <p>{this.state.isModalOpen}</p>
                            <button
                            onClick={this.openModal}
                            className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                                <p
                                className="text-left flex-1 font-semibold px-4 py-2">
                                {ruangan}
                                </p>
                                <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        </div>
                    </div>
                    <button
                    onClick={this.handleSubmit}
                    disabled={!this.props.nurseId && !this.props.ruangId.id}
                    className={`${this.props.nurseId && this.props.ruangId.id ? 'bg-brand-orange' : 'bg-gray-400 cursor-not-allowed'} items-center justify-center w-48 h-48 text-white focus:outline-none rounded-md`}>
                        <svg class="mx-auto w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                        <p className="text-xl font-semibold">Masuk</p>
                    </button>
                </div>

                {/* Open Modal */}
                
                {this.state.isModalOpen && (
                    <div className="absolute bg-white w-full pt-8">
                    <div className="mx-auto w-2/3 bg-white border-4 border-brand-green rounded-lg overflow-hidden">
                        <div className="flex items-center p-3">
                            <p className="text-2xl font-semibold text-brand-green">Pilih Ruangan</p>
                        </div>
                        <ul className="bg-gray-100 divide-y-2 divide-gray-200 text-2xl text-gray-700">
                            {this.state.ruangan.map(kamar => (
                                <li
                                    key={kamar.id}
                                    onClick={() => this.selectRuangan(kamar)}
                                    className={`p-3 ${this.state.selectedRuangan === kamar ? "bg-brand-orange text-white" : "hover:bg-gray-200 hover:text-gray-900"} cursor-pointer`}>
                                    Ruangan {kamar.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                )}

                {/* Close modal */}
            </div>
        );
    }
}

export default Home;
