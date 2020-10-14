import React, { Component } from "react";

class Stopwatch extends Component {
    constructor (props) {
        super(props);

        this.state = {
            runningTime: 0,
            status: true
        }

    }

    componentDidMount = () => {
        const startTime = Date.now() - this.state.runningTime;
        const totalTime = 60 * 0.5
        if(this.state.status){
            this.timer = setInterval( () => {
                if(this.state.runningTime < totalTime){
                    this.setState({ runningTime: parseInt((Date.now() - startTime)/1000) });
                    this.props.setProgress( parseInt((this.state.runningTime/totalTime)*100) )
                }
            }, 1000);
        }
    };
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    render () {
        return (
            <div className="text-center">
              <p>{this.state.runningTime} s</p>
            </div>
        );
    }
}

export default Stopwatch;