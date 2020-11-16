import React, { Component } from "react";

class TitleBar extends Component {
    render () {
        return (
            <div className="relative flex justify-between h-6">
                <div className="z-10">
                    {this.props.back && (
                        <button
                        onClick={this.props.setBack}
                        className="flex items-center text-lg w-full border-2 border-gray-500 text-gray-500 font-semibold focus:outline-none rounded-lg pr-3 pl-1 py-1">
                            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Kembali
                        </button>
                    )}
                </div>
                <div className="absolute w-full">
                    <h2 className="text-3xl text-center font-bold">{this.props.title}</h2>
                </div>
                <div className="z-10">
                    {this.props.next && (
                        <button
                        onClick={this.props.setNext}
                        className="flex justify-end items-center text-lg w-full border-2 border-green-600 text-green-600 font-semibold focus:outline-none rounded-lg pl-3 pr-1 py-1">
                            {this.props.setNextName}
                            <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    )}
                </div>
            </div>
        )
    }
}

export default TitleBar;