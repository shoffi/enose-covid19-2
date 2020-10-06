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
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <>
                <button style={{width:'100%'}} className="btn btn-warning" onClick={() => this.setState({redirect: '/menu'})}>Kembali</button>
                <div className="mt-5">
                    <div className="text-center col-md-4 ml-auto mr-auto">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>ID Pasien:</label>
                                <input className="form-control" type="text" value={this.props.patientId} onChange={this.props.setPatientId} />
                            </div>
                            <input type="submit" value="Start" />
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default AmbilSample;