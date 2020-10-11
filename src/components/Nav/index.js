import React, { Component } from "react";
import Clock from '../Clock';

class Nav extends Component {
    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">{this.props.rumahSakit}</div>
                
                <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <div style={{fontWeight:'bold'}}>ID Perawat: {this.props.nurseId}</div>
                    </ul>
                    <Clock></Clock>
                </div>
            </nav>
        )
    }
}

export default Nav;