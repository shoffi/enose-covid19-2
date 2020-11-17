import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';
const { ipcRenderer } = window;

class Pengaturan extends Component {
    constructor (props) {
        super (props)

        this.state = {
            proses1 : this.props.proses1,
            proses2 : this.props.proses2,
            proses3 : this.props.proses3,
        }

        ipcRenderer.send('getPengaturan')
        ipcRenderer.on('getPengaturanResponse', (event, response) => {
            this.setState({
                proses1 : response[0],
                proses2 : response[1],
                proses3 : response[2],
            })
        })

        this.getPengaturan = this.getPengaturan.bind(this);
        this.updatePengaturan = this.updatePengaturan.bind(this);

        this.changeProses1 = this.changeProses1.bind(this);
        this.changeProses2 = this.changeProses2.bind(this);
        this.changeProses3 = this.changeProses3.bind(this);
    }

    getPengaturan () {
        ipcRenderer.send('getPengaturan')
        ipcRenderer.on('getPengaturanResponse', (event, response) => {
            this.setState({
                proses1 : response[0],
                proses2 : response[1],
                proses3 : response[2],
            })
        })
    }

    changeProses1 (event) {
        this.setState({
            proses1: event.target.value
        })
    }

    changeProses2 (event) {
        this.setState({
            proses2: event.target.value
        })
    }

    changeProses3 (event) {
        this.setState({
            proses3: event.target.value
        })
    }

    updatePengaturan (event) {
        event.preventDefault();
        ipcRenderer.send('updatePengaturan', this.state)
        alert('timer updated')
    }

    render () {
        return (
            <div>
                <TitleBar
                    title={'Pengaturan'}
                    back={true}
                    next={true}
                    setBack={() => this.props.forceUpdateHandler()}
                    setNext={() => this.setState({redirect: '/main-chart'})}
                    setNextName={'Simpan'}
                ></TitleBar>
                <div className="col-md-12 ml-auto mr-auto">
                    <h1>Pengaturan</h1>

                    <Link to='/'>
                        <button className="btn btn-warning" onClick={() => this.props.forceUpdateHandler()}><h2>Kembali</h2></button>
                    </Link>

                    <form className="mt-5" onSubmit={this.updatePengaturan}>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 1</h2>
                            <input onChange={ this.changeProses1 } value={this.state.proses1} className="col-2 text-center form-control" />
                        </div>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 2</h2>
                            <input onChange={ this.changeProses2 } value={this.state.proses2} className="col-2 text-center form-control"/>
                        </div>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 3</h2>
                            <input onChange={ this.changeProses3 } value={this.state.proses3} className="col-2 text-center form-control"/>
                        </div>
                        
                        <button className="btn btn-primary" type='submit'> <h2>Simpan</h2> </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Pengaturan;