import React, { Component } from "react";
import Keyboard from 'react-simple-keyboard';
import '../../styles/keyboard.css'

class Input extends Component {
  constructor(props) {
    super(props)

    this.openKeyboard = this.openKeyboard.bind(this)
  }
  state = {
    layoutName: "numeric",
    input: "",
    isFocus: false
  };

  onChange = input => {
    this.setState({ input });
    console.log("Input changed", input);
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };

  openKeyboard() {
    this.setState({ isFocus: !this.state.isFocus });
  }

  render() {
    return (
      <div className="relative">
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={this.onChangeInput}
          onFocus={this.openKeyboard}
          onBlur={this.openKeyboard}
          className="w-full text-xl font-semibold pl-2 pr-10 py-1 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
        />
        {this.state.isFocus && (
          <div className="absolute">
            <Keyboard
              keyboardRef = {r => (this.keyboard = r)}
              layoutName = {this.state.layoutName}
              onChange = {this.onChange}
              onKeyPress = {this.onKeyPress}
              layout = {{
                numeric: [
                  "1 2 3",
                  "4 5 6",
                  "7 8 9",
                  ". 0 {bksp}",
                ]
              }}
              display = {{
                '{bksp}': 'Del',
              }} />
          </div>
        )}
      </div>
    )
  }
}
export default Input;