import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import CheckBox from "../Utilities/Checkbox";

class AmbilSample extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
            nurse_id: this.props.nurseId,
            patient_id: this.props.patientId,
            ruang_id: this.props.ruangId,
            diseases: [
                {id: 1, value: "Fever", isChecked: false},
                {id: 2, value: "Flu/Sneeze", isChecked: false},
                {id: 3, value: "Sore Throat", isChecked: false},
                {id: 4, value: "Cough", isChecked: false},
                {id: 5, value: "Difficulty of breathing", isChecked: false},
                {id: 6, value: "Nausea", isChecked: false},
                {id: 7, value: "Headache", isChecked: false},
                {id: 8, value: "Watery eyes", isChecked: false},
                {id: 9, value: "Diarrhea", isChecked: false},
            ],
            comorbidities: [
                {id: 1+9, value: "Hypertension", isChecked: false},
                {id: 2+9, value: "Diabetes Mellitus", isChecked: false},
                {id: 3+9, value: "Immune disorders", isChecked: false},
                {id: 4+9, value: "Heart disease", isChecked: false},
                {id: 5+9, value: "Kidney disease", isChecked: false},
                {id: 6+9, value: "Liver disease", isChecked: false},
                {id: 7+9, value: "Astma", isChecked: false},
                {id: 8+9, value: "Cancer", isChecked: false},
                {id: 9+9, value: "Tuberkulosis", isChecked: false},
                {id: 10+9, value: "Respiratory system disease", isChecked: false},
                {id: 11+9, value: "Cardiovascular disease", isChecked: false},
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePatientId = this.handlePatientId.bind(this)
    }

    handleSubmit (event) {
        event.preventDefault()
        this.setState({
            redirect: '/main-chart'
        })
    }

    handleDiseaseCheckboxes = (event) => {
        let diseases = this.state.diseases
        diseases.forEach(disease => {
           if (disease.value === event.target.value)
              disease.isChecked =  event.target.checked
        })
        this.setState({diseases: diseases})
    }

    handleComorbiditiesCheckboxes = (event) => {
        let comorbidities = this.state.comorbidities
        comorbidities.forEach(comorbidity => {
           if (comorbidity.value === event.target.value)
              comorbidity.isChecked =  event.target.checked
        })
        this.setState({comorbidities: comorbidities})
    }

    handlePatientId = (event) => {
        this.props.setPatientId(event)
        this.setState({
            patient_id: event.target.value
        })
    }

    render () {
        if (this.state.redirect) {
            return <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state
                        }} 
                    />
        }
        
        return (
            <>
                <div className="mt-5">
                    <div 
                        className="col-md-12 ml-auto mr-auto"
                        style={{
                            fontSize: '25px'
                        }} 
                    >
                        <form onSubmit={this.handleSubmit}>
                            
                            <div className="row">
                            
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>ID Pasien:</label>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            value={this.props.patientId} 
                                            onChange={this.handlePatientId}
                                            style={{
                                                fontSize: "25px"
                                            }} 
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input 
                                            type="checkbox"
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                marginTop: "10px"
                                            }} 
                                        />
                                        <label className="ml-2">Negatif Covid-19</label>
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <h4>Symptoms</h4>
                                        {
                                            this.state.diseases.map((disease) => {
                                                return (<CheckBox handleCheckboxes={this.handleDiseaseCheckboxes} {...disease} />)
                                            })
                                        }
                                    </div>
                                </div>
                                    
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <h4>Comorbidities</h4>
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[0]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[1]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[2]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[3]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[4]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[5]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[6]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[7]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[8]} />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <h4>Comorbidities</h4>
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[9]} />
                                        <CheckBox handleCheckboxes={this.handleComorbiditiesCheckboxes} {...this.state.comorbidities[10]} />
                                    </div>
                                </div>
                                
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input 
                                            style={{
                                                borderRadius:'20px', 
                                                width:'100%',
                                                fontSize: '35px'
                                            }} 
                                            className="btn btn-success"
                                            type="submit" 
                                            value="Start Sampling" 
                                        />
                                    </div>
                                </div>
                            </div>

                        </form>
                        <button 
                            style={{
                                borderRadius:'20px', 
                                width:'100%',
                                fontSize: '35px'
                            }} 
                            className="btn btn-warning mb-5" 
                            onClick={() => this.setState({redirect: '/menu'})}
                        >
                            Kembali
                        </button>
                    </div>                    
                </div>
            </>
        )
    }
}

export default AmbilSample;
