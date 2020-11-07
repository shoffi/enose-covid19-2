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

    handleMasuk() { 
        // this.props.forceUpdateHandler()
        if(this.props.connect()){
            this.setState({redirect: '/connect'})
        }
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
                            width:'300px'
                        }}
                        className="mt-5"
                        alt='Logo Enosika'
                    />
                </div>
                <div className="text-center">
                    <button 
                        style={{
                            borderRadius:'20px',
                        }}
                        className="btn btn-success mt-5 px-5"
                        fontWeight="bold" 
                        onClick={()=>this.handleMasuk()}
                    >
                        Power On
                    </button>
                </div>
            </>
        );
    }
}

export default Welcome;
