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
            <div className="text-center col-md-12 mt-3 ml-auto mr-auto d-flex">
                <div className="card" style={{width: '400px', display: 'inline-block', margin: "20px"}}>
                    <div className="card-body">
                        <button style={{width:'100%'}} className="btn btn-primary">Ambil Sample</button>
                    </div>
                </div>

                <div className="card" style={{width: '400px', display: 'inline-block', margin: "20px"}}>
                    <div className="card-body">
                        <button style={{width:'100%'}} className="btn btn-primary">History</button>
                    </div>
                </div>

                <div className="card" style={{width: '400px', display: 'inline-block', margin: "20px"}}>
                    <div className="card-body">
                        <button disabled style={{width:'100%'}} className="btn btn-primary">Data baru</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
