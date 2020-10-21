import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Clock from '../Clock';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    render () {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {isConnected, nurseId} = this.props
        let info_navbar
        
        if(nurseId !== ''){
            info_navbar =   <>
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <span className="nav-link" href="#">Perawat: {this.props.nurseId}</span>
                                    </li>
                                    <li className="nav-item active">
                                        <span className="nav-link" href="#">Ruangan: {this.props.ruangId}</span>
                                    </li>
                                    <li className="nav-item active">
                                        <span className="nav-link" href="#">Pasien: {this.props.patientId}</span>
                                    </li>
                                </ul>
                            </>
        }

        let button_off
        if(isConnected) {
            button_off =    <>
                                <button style={{borderRadius:'20px', width:'100%'}} className="btn btn-danger" onClick={() => this.setState({redirect: '/menu'})}>Power Off</button>
                            </>
        }
        
        return (
            <>
                <nav 
                    className="navbar navbar-expand-sm" 
                    style={{ 
                        backgroundColor:"#1AB0EB", 
                        color:"#3E4095", 
                        fontWeight: "Bold"
                    }}
                >
                    <div className="navbar-brand">{this.props.rumahSakit}</div>

                    <div className="navbar-collapse">
                    
                        {info_navbar}

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <span className="nav-link" href="#"><Clock></Clock></span>
                            </li>
                            <li className="nav-item active">
                                {button_off}
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

export default Nav;
