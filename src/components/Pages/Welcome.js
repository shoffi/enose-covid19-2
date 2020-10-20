import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
            <div className="text-center">
                <button 
                    style={{borderRadius:'20px'}}
                    className="btn btn-success mt-5" 
                    onClick={() => this.setState({redirect: '/connect'})}
                >
                    Power On
                </button>
            </div>
        );
    }
}

export default Welcome;
