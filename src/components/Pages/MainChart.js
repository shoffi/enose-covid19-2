import React, { Component, createRef } from "react";
import { Redirect } from 'react-router-dom';
import Chart from "chart.js";
import ProgressBar from "../ProgressBar";
import Stopwatch from "../Clock/Stopwatch";
const { ipcRenderer } = window;

class MainChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            completed: 0
        }

        this.chartRef = createRef();
        this.setProgress = this.setProgress.bind(this);
    }

    componentDidMount() {
        
        let arrayAll = []
        let diseases = Object.values(this.props.location.state.diseases)
        let resultDisease = Object.keys(diseases).map( (key) => [diseases[key].isChecked ] )
        let comorbidities = Object.values(this.props.location.state.comorbidities)
        let resultComorbidities = Object.keys(comorbidities).map( (key) => [comorbidities[key].isChecked ] )
        arrayAll = resultDisease.concat(resultComorbidities)
        console.log(this.props)

        let detailPatient = {
            'nurse_id': this.props.location.state.nurse_id,
            'patient_id': this.props.location.state.patient_id,
            'ruang_id': this.props.location.state.ruang_id,
        }
        
        //console.log(detailPatient)

        ipcRenderer.send('storePatient', arrayAll, detailPatient)
        
        let pengambilan_id
        ipcRenderer.on('storePatientResponse', (event, storePatientResponse) => {
            console.log(storePatientResponse)
            pengambilan_id = storePatientResponse.id
        })

        this.myChart = new Chart (this.chartRef.current, {
            type: 'line',
            data: {
                labels: [''],
                datasets: [
                    {
                        label: 'MQ2_LPG',
                        data: [''],
                        borderColor: [
                            'red',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_CO',
                        data: [''],
                        borderColor: [
                            'orange',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_SMOKE',
                        data: [''],
                        borderColor: [
                            'pink',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_ALCOHOL',
                        data: [''],
                        borderColor: [
                            'green',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_CH4',
                        data: [''],
                        borderColor: [
                            'blue',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_H2',
                        data: [''],
                        borderColor: [
                            'indigo',
                        ],
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'MQ2_PROPANE',
                        data: [''],
                        borderColor: [
                            'violet',
                        ],
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        ipcRenderer.send('start', pengambilan_id)
        ipcRenderer.on('startResponse', (event, startResponse) => {
            let responseArray = ['']
            responseArray = startResponse.split(";")
            console.log('responseArray = '+responseArray)

            let time = new Date()
            time = time.toLocaleTimeString().toString() 
            
            // MQ2
            this.addData(this.myChart, 0, time, responseArray[0])
            this.addData(this.myChart, 1, null, responseArray[1])
            this.addData(this.myChart, 2, null, responseArray[2])
            this.addData(this.myChart, 3, null, responseArray[3])
            this.addData(this.myChart, 4, null, responseArray[4])
            this.addData(this.myChart, 5, null, responseArray[5])
            this.addData(this.myChart, 6, null, responseArray[6])
        })
    
    }

    addData(chart, num, label, data) {
        if(label != null){
            chart.data.labels.push(label)
            // chart.data.labels.shift()
        }
        chart.data.datasets[num].data.push(data)
        // chart.data.datasets[num].data.shift()
        chart.update()
    }

    setProgress (completed) {
        this.setState({
            completed: completed
        })
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <div>
                <div className="text-center">
                    <button style={{width:'30%'}} className="btn btn-danger mt-5 mb-5" onClick={() => this.setState({redirect: '/ambil-sample'})}>Stop</button>
                    <h1>Ambil Sampling</h1>
                    <canvas ref={this.chartRef} />
                </div>
                <div>
                    <Stopwatch
                        setProgress={this.setProgress}
                    />
                    <ProgressBar bgcolor={"#6a1b9a"} completed={this.state.completed} />
                </div>
            </div>
        )
    }
}

export default MainChart;
