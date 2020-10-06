import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    handleSubmit() { 
        
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <>
                <button style={{width:'100%'}} className="btn btn-warning mt-5 mb-5" onClick={() => this.setState({redirect: '/'})}>Kembali</button>
                <div className="text-center col-md-12 mt-3 ml-auto mr-auto d-flex">
                    <div className="card" style={{width: '400px', display: 'inline-block', margin: "20px"}}>
                        <div className="card-body">
                            <button style={{width:'100%'}} className="btn btn-primary" onClick={() => this.setState({redirect: '/ambil-sample'})}>Ambil Sample</button>
                        </div>
                    </div>

                    <div className="card" style={{width: '400px', display: 'inline-block', margin: "20px"}}>
                        <div className="card-body">
                            <button disabled style={{width:'100%'}} className="btn btn-primary">History</button>
                        </div>
                    </div>

                    <div className="card" style={{width: '400px', display: 'inline-block', margin: "20px"}}>
                        <div className="card-body">
                            <button disabled style={{width:'100%'}} className="btn btn-primary">Data baru</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
