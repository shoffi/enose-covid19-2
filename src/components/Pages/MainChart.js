import React, { Component, createRef } from "react";
import { Redirect } from 'react-router-dom';
import Chart from "chart.js";
import ProgressBar from "../ProgressBar";
const { ipcRenderer } = window;

class MainChart extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
            completed: 0
        }

        this.chartRef = createRef();
    }

    componentDidMount() {
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

        setInterval(() => this.setState({completed: Math.floor(Math.random() * 100) + 1}), 2000);

        ipcRenderer.send('start')

        ipcRenderer.on('startResponse', (event, startResponse) => {
            let responseArray = ['']
            responseArray = startResponse.split(";")
            console.log(responseArray)
            
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

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <div>
                    <button style={{width:'100%'}} className="btn btn-warning mt-5 mb-5" onClick={() => this.setState({redirect: '/ambil-sample'})}>Kembali</button>
                    <h1>Ambil Sampling</h1>
                    <canvas ref={this.chartRef} />
                </div>
                <div>
                    <ProgressBar bgcolor={"#6a1b9a"} completed={this.state.completed} />
                </div>
            </div>
        )
    }
}

export default MainChart;