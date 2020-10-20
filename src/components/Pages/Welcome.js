import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../../images/logo.png';

class Welcome extends Component {
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
                <h3 className="mt-5 text-center text-bold" >Welcome to Electronic Nose ITS</h3>
                <div className="mt-3 text-center">
                    <img 
                        src={logo}
                        style={{
                            width:'200px'
                        }}
                    />
                </div>
                <div className="text-center">
                    <button 
                        style={{borderRadius:'20px'}}
                        className="btn btn-success mt-3 p-3" 
                        onClick={() => this.setState({redirect: '/connect'})}
                    >
                        Power On
                    </button>
                </div>
            </>
        );
    }
}

export default Welcome;
