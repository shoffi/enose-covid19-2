import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) { 
        event.preventDefault();
        this.props.connect();
        this.setState({
            redirect: '/menu'
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="col-md-4 mt-5 ml-auto mr-auto">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>ID Perawat:</label>
                        <input className="form-control" type="text" value={this.props.nurseId} onChange={this.props.setNurseId} />
                    </div>
                    <div className="form-group">
                        <label>Ruangan:</label>
                        <select className="form-control" value={this.props.ruangId} onChange={this.props.setRuangId}>
                            <option value="">Pilih Ruangan</option>
                            <option value="1">Ruangan 1</option>
                            <option value="2">Ruangan 2</option>
                            <option value="3">Ruangan 3</option>
                            <option value="4">Ruangan 4</option>
                        </select>
                    </div>
                    <input type="submit" value="Connect" />
                </form>
            </div>
        );
    }
}

export default Home;
