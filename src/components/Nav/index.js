import React, { Component } from "react";
import Clock from '../Clock';

class Nav extends Component {
    render () {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="navbar-brand">{this.props.rumahSakit}</p>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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