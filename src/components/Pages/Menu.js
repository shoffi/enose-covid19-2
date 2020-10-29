import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ambil_data from '../../images/ambil_data.png'
import history from '../../images/history.png'
import covid from '../../images/covid.png'

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
                <div className="mt-5">
                    <div className="col-md-12 ml-auto mr-auto d-flex">
                        <div className="col-md-4" >
                            <div className="card">
                                <div className="card-body">
                                    <img 
                                        src={ambil_data} alt='Ambil Data'
                                        style={{
                                            width:'100%',
                                            marginBottom: '20px'
                                        }} 
                                    />

                                    <button 
                                        style={{
                                            width:'100%', 
                                            height:'150px',
                                            backgroundColor:'#46bfb7',
                                            fontWeight: "Bold",
                                            fontSize: "20pt"
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
                                    <img 
                                        src={history} alt='Ambil Data'
                                        style={{
                                            width:'100%',
                                            marginBottom: '20px'
                                        }} 
                                    />

                                    <button disabled 
                                        style={{
                                            width:'100%', 
                                            height:'150px',
                                            backgroundColor:'#46bfb7',
                                            fontWeight: "Bold",
                                            fontSize: "20pt"
                                        }} 
                                        className="btn"
                                    >History</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4" >
                            <div className="card">
                                <div className="card-body">
                                    <img 
                                        src={covid} alt='Ambil Data'
                                        style={{
                                            width:'100%',
                                            marginBottom: '20px'
                                        }} 
                                    />

                                    <button disabled 
                                        style={{
                                            width:'100%', 
                                            height:'150px',
                                            backgroundColor:'#46bfb7',
                                            fontWeight: "Bold",
                                            fontSize: "20pt"
                                        }} 
                                        className="btn"
                                    >Data baru</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        style={{
                            borderRadius:'20px', 
                            width:'100%',
                            fontSize: '35px'
                        }} 
                        className="btn btn-warning mt-5" 
                        onClick={() => this.setState({redirect: '/connect'})}
                    >Kembali</button>
                </div>
            </>
        );
    }
}

export default Home;
