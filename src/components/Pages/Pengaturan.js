import React, { Component } from 'react';

class Pengaturan extends Component {
    constructor (props) {
        super (props)

        this.state = {
            proses1 : 60,
            proses2 : 60,
            proses3 : 60,
        }
    }

    render () {
        return (
            <div className="mt-5">
                <div className="col-md-12 ml-auto mr-auto">
                    <h1>Pengaturan</h1>
                    <form className="mt-5">
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 1</h2>
                            <input type="number" className="col-2 text-center form-control" value={this.state.proses1}/>
                        </div>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 2</h2>
                            <input type="number" className="col-2 text-center form-control" value={this.state.proses2}/>
                        </div>
                        <div className='form-group row'>
                            <h2 className="col-md-2" >Proses 3</h2>
                            <input type="number" className="col-2 text-center form-control" value={this.state.proses3}/>
                        </div>
                        
                        <button className="btn btn-primary"> <h2>Simpan</h2> </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Pengaturan;