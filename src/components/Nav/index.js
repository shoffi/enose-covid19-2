import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import Clock from '../Clock';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    powerOff () {
        this.props.disconnect()
    }

    showModal () {
        alert('alert alert !')
    }

    render () 
    {

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
                                <Link to="/">
                                    <span 
                                        style={{
                                            borderRadius:'100%', 
                                            margin: 'auto',
                                            padding: 'auto',
                                            width:'100%'
                                        }} 
                                        className="btn btn-danger" 
                                        onClick={() => this.powerOff()}
                                    >
                                        <FaPowerOff/>
                                    </span>
                                </Link>
                            </>
        }
        
        return (
            <>
                <nav 
                    className="navbar navbar-expand-lg" 
                    style={{ 
                        backgroundColor:"#1AB0EB", 
                        color:"#3E4095", 
                        fontWeight: "Bold",
                        fontSize: "35px"
                    }}
                >
                    <div 
                        className="navbar-brand"
                        style={{ 
                            fontSize: "35px"
                        }}
                    >{this.props.rumahSakit}</div>

                    <div className="navbar-collapse">
                    
                        {info_navbar}

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <span className="nav-link" href="#"><Clock></Clock></span>
                            </li>
                            <li className="nav-item active">
                                {button_off}
                            </li>
                            <li>
                                <Link to='/pengaturan'>
                                <span 
                                    style={{
                                        color: "primary",
                                        cursor: "pointer"
                                    }}   
                                >
                                    <AiFillSetting/>
                                </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

export default Nav;
