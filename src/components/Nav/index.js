import React, { Component } from "react";
import Clock from '../Clock';

class Nav extends Component {
    render () {
        let {isConnected} = this.props
        let info_navbar
        
        if(isConnected){
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
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

export default Nav;
