import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import TitleBar from '../Nav/TitleBar';

class AmbilSample extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,

            nurse_id: this.props.nurseId,
            ruang_id: this.props.ruangId,
            patient_id: this.props.patientId,
            covidStatus: this.props.covidStatus,

            suhuTubuh: this.props.suhuTubuh,
            asamUrat: this.props.asamUrat,
            kolestrol: this.props.kolestrol,
            saturasiOksigen: this.props.saturasiOksigen,
            gulaDarah: this.props.gulaDarah,
            denyutJantung: this.props.denyutJantung,
            hasilSwab: [
                { id: 1, value: 'Negatif Covid-19'},
                { id: 2, value: 'Positif Covid-19'},
                { id: 3, value: 'Tidak diketahui'},
            ],
            isHasilSelected: false,

            alatPCR: [
                { id: 1, value: 'A'},
                { id: 2, value: 'B'},
                { id: 3, value: 'C'},
                { id: 4, value: 'D'},
                { id: 5, value: 'E'},
            ],
            isPCRSelected: false,

            diseases: [
                {id: 4, value: "Batuk", isChecked: false},
                {id: 1, value: "Demam", isChecked: false},
                {id: 9, value: "Diare", isChecked: false},
                {id: 2, value: "Flu atau bersin", isChecked: false},
                {id: 10, value: "Gangguan Pencernaan", isChecked: false},
                {id: 11, value: "Gangguan Penciuman", isChecked: false},
                {id: 8, value: "Mata Berair", isChecked: false},
                {id: 6, value: "Mual", isChecked: false},
                {id: 7, value: "Pusing", isChecked: false},
                {id: 3, value: "Sakit Tenggorokan", isChecked: false},
                {id: 5, value: "Sulit Bernapas", isChecked: false},
            ],

            comorbidities: [
                {id: 2+9, value: "Diabetes Mellitus", isChecked: false},
                {id: 3+9, value: "Gangguan Imun", isChecked: false},
                {id: 6+9, value: "Gangguan Pernapasan", isChecked: false},
                {id: 5+9, value: "Ginjal", isChecked: false},
                {id: 1+9, value: "Hipertensi", isChecked: false},
                {id: 7+9, value: "Kanker", isChecked: false},
                {id: 4+9, value: "Liver atau Hati", isChecked: false},
                {id: 9+9, value: "Kardiovaskular", isChecked: false},
                {id: 8+9, value: "Tuberkulosis", isChecked: false},
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePatientId = this.handlePatientId.bind(this)
        this.startSampling = this.startSampling.bind(this)
        this.toggleHasil = this.toggleHasil.bind(this)
        this.togglePCR = this.togglePCR.bind(this)
    }

    componentDidMount(){
        console.log("componentDidMount")
        console.log(this.props)
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

    handleCovidStatus = (event) => {
        this.setState({
            covidStatus: event.target.checked
        })
    }

    startSampling = () => {
        this.setState({
            redirect: '/main-chart'
        })
    }

    toggleHasil() {
        this.setState({
            isHasilSelected: !this.state.isHasilSelected
        })
    }
    togglePCR() {
        this.setState({
            isPCRSelected: !this.state.isPCRSelected
        })
    }

    render () {
        if (this.state.redirect) {
            console.log(this.state) 
            return <Redirect 
                        to={{
                            pathname: this.state.redirect,
                            state: this.state
                        }}
                    />
        }
        
        return (
            <div className="w-full">
                <TitleBar
                    title={'Gejala Pasien'}
                    back={true}
                    next={true}
                    setBack={() => this.setState({redirect: '/symptom-patient'})}
                    setNext={() => this.startSampling()}
                    setNextName={'Start Sampling'}
                ></TitleBar>

                <div className="py-8">
                    {/* <div className="flex justify-center mb-5">
                        <div className="w-2/3">
                            <p className="text-center text-xl font-light leading-snug text-gray-800">
                                Pilih sesuai dengan gejala yang dirasakan pasien saat ini. Jika pasien Negatif, silahkan pilih opsi <span className="font-semibold text-green-700">Negatif Covid-19</span>.
                            </p>
                        </div>
                    </div> */}

                    {/* <hr className="border my-3" />
                    <div className="">
                        <h3 className="text-2xl text-center font-bold mb-4">Hasil PCR</h3>
                        <div className="flex items-start space-x-4">
                            <div className="w-1/3 relative">
                                <p className="text-brand-green font-semibold mb-1">Hasil Swab</p>
                                <button
                                onClick = { this.toggleHasil }
                                className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                                    <p
                                    className="text-xl text-left flex-1 px-4 py-2">
                                    Negatif Covid-19
                                    </p>
                                    <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <p className="text-xs text-gray-700 leading-tight mt-2">Jika Positif Covid-19, maka tidak perlu dicentang</p>
                                { this.state.isHasilSelected && (<div className="absolute border bg-white w-full mt-2 rounded-md py-2 divide-y">
                                    { this.state.hasilSwab.map(hasil => (
                                        <div
                                        key = { hasil.id }
                                        onClick = { this.toggleHasil }
                                        className="text-lg p-2 cursor-pointer">{ hasil.value }</div>
                                    )) }
                                </div>)}
                            </div>
                            <div className="w-1/3 relative">
                                <p className="text-brand-green font-semibold mb-1">Alat PCR</p>
                                <button
                                onClick = { this.togglePCR }
                                className="flex w-full items-center bg-gray-200 border-4 border-gray-200 focus:outline-none rounded-lg">
                                    <p
                                    className="text-xl text-left flex-1 px-4 py-2">
                                    PCR Tipe A
                                    </p>
                                    <svg class="w-8 h-8 text-brand-orange mx-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                { this.state.isPCRSelected && (<div className="absolute border bg-white w-full mt-2 rounded-md py-2 divide-y">
                                    { this.state.alatPCR.map(pcr => (
                                        <div
                                        key = { pcr.id }
                                        onClick = { this.togglePCR }
                                        className="text-lg p-2 cursor-pointer">PCR Tipe { pcr.value }</div>
                                    )) }
                                </div>)}
                            </div>
                            <div className="w-1/3">
                                <p className="text-brand-green font-semibold mb-1">CT PCR</p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full text-xl font-semibold pl-3 pr-10 py-2 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
                                        placeholder="35"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="flex space-x-4 mt-6">
                        <div className="w-1/2">
                            <h3 className="text-lg text-gray-800 font-semibold mb-3 px-3">Gejala</h3>
                            <div className="bg-purple-200 bg-opacity-25 p-3 rounded-xl h-72 scrolling-touch overflow-y-scroll">
                                {this.state.diseases.map(item => (
                                    <div className="w-full">
                                        <label class="inline-flex items-center w-full">
                                            <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                onClick={this.handleDiseaseCheckboxes}
                                                value={item.value}
                                                class="form-checkbox h-8 w-8 text-purple-600 rounded-xl"
                                            ></input>
                                            <span class="ml-3 text-gray-800 text-xl">{item.value}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-lg text-gray-800 font-semibold mb-3 px-3">Penyakit Bawaan</h3>
                            <div className="bg-yellow-200 bg-opacity-25 p-3 rounded-xl h-72 scrolling-touch overflow-y-scroll">
                                {this.state.comorbidities.map(item => (
                                    <div className="w-full">
                                        <label class="inline-flex items-center w-full">
                                            <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                onClick={this.handleComorbiditiesCheckboxes}
                                                value={item.value}
                                                class="form-checkbox h-8 w-8 text-orange-600 rounded-xl"
                                            ></input>
                                            <span class="ml-3 text-gray-800 text-xl">{item.value}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-5">
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
                </div> */}
            </div>
        )
    }
}

export default AmbilSample;
