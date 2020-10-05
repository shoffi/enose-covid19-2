import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({nurseId: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.props.nurseId);
        event.preventDefault();
    }

    render() {
        console.log(this.props)
        return (
            <div className="text-center col-md-4 ml-auto mr-auto">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>ID Perawat: {this.props.nurseId}</label>
                        <input className="form-control" type="text" value={this.props.nurseId} onChange={this.props.setNurseId} />
                    </div>
                    <input type="submit" value="Connect" />
                </form>
            </div>
        );
    }
}

export default Home;
