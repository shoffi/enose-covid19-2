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
            <>
                <h4 className="mt-5 text-center" >Welcome to Electronic Nose ITS</h4>
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
