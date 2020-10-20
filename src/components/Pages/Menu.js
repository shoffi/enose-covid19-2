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
                <div className="text-center col-md-12 mt-3 ml-auto mr-auto d-flex">
                    <div className="col-md-4" >
                        <div className="card">
                            <div className="card-body">
                                <button 
                                    style={{
                                        width:'100%', 
                                        height:'150px',
                                        backgroundColor:'#46bfb7',
                                        fontWeight: "Bold"
                                    }} 
                                    className="btn" 
                                    onClick={() => this.setState({redirect: '/ambil-sample'})}
                                >Ambil Sample</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4" >
                        <div className="card">
                            <div className="card-body">
                                <button disabled 
                                    style={{
                                        width:'100%', 
                                        height:'150px',
                                        backgroundColor:'#46bfb7',
                                        fontWeight: "Bold"
                                    }} 
                                    className="btn"
                                >History</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4" >
                        <div className="card">
                            <div className="card-body">
                                <button disabled 
                                    style={{
                                        width:'100%', 
                                        height:'150px',
                                        backgroundColor:'#46bfb7',
                                        fontWeight: "Bold"
                                    }} 
                                    className="btn"
                                >Data baru</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button style={{width:'100%'}} className="btn btn-warning mt-5 mb-5 mr-auto" onClick={() => this.setState({redirect: '/connect'})}>Kembali</button>
            </>
        );
    }
}

export default Home;
