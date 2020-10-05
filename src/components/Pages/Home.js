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
        this.setState({
            redirect: '/menu'
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="text-center col-md-4 ml-auto mr-auto">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>ID Perawat:</label>
                        <input className="form-control" type="text" value={this.props.nurseId} onChange={this.props.setNurseId} />
                    </div>
                    <input type="submit" value="Connect" />
                </form>
            </div>
        );
    }
}

export default Home;
