import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
            isConnected: this.props.isConnected
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) { 
        event.preventDefault();
        let status = true;
        
        if (status) {
            this.setState({
                redirect: '/menu',
                isConnected: true
            });
        }
    }
        

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div 
                className="col-md-10 mt-5 ml-auto mr-auto"
                style={{ 
                    fontSize: "35px"
                }}
            >
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>ID Perawat:</label>
                        <input 
                            className="form-control" type="text" 
                            value={this.props.nurseId} 
                            onChange={this.props.setNurseId}
                            style={{ 
                                fontSize: "35px"
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ruangan:</label>
                        <select 
                            className="form-control" 
                            value={this.props.ruangId} 
                            onChange={this.props.setRuangId}
                            style={{ 
                                fontSize: "35px"
                            }}
                        >
                            <option value="">Pilih Ruangan</option>
                            <option value="1">Ruang ICU</option>
                            <option value="2">Ruang Rawat Inap</option>
                        </select>
                    </div>
                    <div className="form-group text-center">
                        <input 
                            type="submit" 
                            style={{
                                borderRadius:'20px',
                                fontSize: "35px"
                            }} 
                            className="btn btn-primary" 
                            value="Masuk"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Home;
