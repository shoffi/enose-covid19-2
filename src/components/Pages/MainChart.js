import React, { Component, createRef } from "react";
import { Redirect } from 'react-router-dom';
import Chart from "chart.js"

class MainChart extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null
        }

        this.chartRef = createRef();

    }

    componentDidMount() {
        this.myChart = new Chart (this.chartRef.current, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: 'MQ 2',
                        fill: false,
                        data: [12, 8, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(132, 99, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'MQ 3',
                        fill: false,
                        data: [13, 15, 1, 7, 8, 2],
                        backgroundColor: [
                            'rgba(132, 255, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(132, 255, 255, 1)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'MQ 4',
                        fill: false,
                        data: [2, 13, 10, 5, 9, 5],
                        backgroundColor: [
                            'rgba(132, 255, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(67, 255, 34, 1)'
                        ],
                        borderWidth: 1
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
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <button style={{width:'100%'}} className="btn btn-warning mt-5 mb-5" onClick={() => this.setState({redirect: '/ambil-sample'})}>Kembali</button>
                <h1>Main Chart</h1>
                <canvas ref={this.chartRef} />
            </div>
        )
    }
}

export default MainChart;