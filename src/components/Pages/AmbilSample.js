import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

class AmbilSample extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState({
            redirect: '/main-chart'
        })
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <>
                <button style={{width:'100%'}} className="btn btn-warning mt-5 mb-5" onClick={() => this.setState({redirect: '/menu'})}>Kembali</button>
                <div className="mt-5">
                    <div className="col-md-8 ml-auto mr-auto">
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className="form-group">
                                <label>ID Pasien:</label>
                                <input className="form-control" type="text" value={this.props.patientId} onChange={this.props.setPatientId} />
                            </div>

                            <div className="form-group">
                                <input type="checkbox" />
                                <label className="ml-2">Negatif Covid-19</label>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Fever</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Flu/Sneeze</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Sore Throat</label>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Cough</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Nausea</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Diarrhea</label>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Headache</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Watery eyes</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Diff breath</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Hypertension</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Diabetes Mellitus</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Cardiovasular disease</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Heart disease</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Kidney disease</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Respiratory disease</label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Astma</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Cancer</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Tuberkolusis</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Liver disease</label>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" />
                                        <label className="ml-2">Immune disorders</label>
                                    </div>
                                </div>
                            </div>

                            <input type="submit" value="Start Sampling" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default AmbilSample;