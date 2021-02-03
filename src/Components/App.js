import React, { Component } from 'react';

// Components
import Button from './Button';
import Display from './Display';

// Buttons
const buttons = [
  { id: 'seven', symbol: 7 },
  { id: 'eight', symbol: 8 },
  { id: 'nine', symbol: 9 },
  { id: 'divide', symbol: '/' },
  { id: 'four', symbol: 4 },
  { id: 'five', symbol: 5 },
  { id: 'six', symbol: 6 },
  { id: 'multiply', symbol: '*' },
  { id: 'one', symbol: 1 },
  { id: 'two', symbol: 2 },
  { id: 'three', symbol: 3 },
  { id: 'subtract', symbol: '-' },
  { id: 'zero', symbol: 0 },
  { id: 'decimal', symbol: '.' },
  { id: 'clear', symbol: 'C' },
  { id: 'add', symbol: '+' },
  { id: 'equal', symbol: '='}
];

class App extends React.Component {

  state = {
    mode: 'D', // D: Default, A: Append, E: Error
    display: '0',
    opperator: '',
    result: ''
  }
  
  handleButtonClick = (symbol, id) => {
    if (symbol === 'C') { // Clear
      this.setState({display: '0', result: '', mode: 'D'});
    }
    else if (this.state.mode != 'E') { // If not error mode
      if (symbol === '=') { // Equals
        try {
          let newValue = eval(this.state.result + this.state.opperator + this.state.display);
          if (newValue.toString().length > 12) {
            newValue = newValue.toFixed(9);
          }
          // Need to fix overflow
          if (newValue != Infinity || Math.floor(newValue).toString().length > 12) {
            this.setState({ mode: 'D', display: newValue});
          }
          else { // Catch division by zero
            this.setState({ mode: 'E', display: newValue})
          }
        }
        catch (err) { // Catch Additional ErrosErrors
          this.setState({mode: 'E', display: 'ERROR'});
        }
      }
      else if (symbol === '+' || symbol == "-" || symbol == '*' || symbol == '/') {  // Opperator
        this.setState( prevState => ({opperator: symbol, result: prevState.display, mode: 'D'}));
      }
      else { // Other
        if (this.state.mode === 'D') {  // Replace 0 and switch from default to append mode
          this.setState( prevState => ({
            display: symbol + '', 
            result: prevState.display,
            mode: 'A'
          }));
        }
        else if (this.state.mode === 'A') { // Append mode
          this.setState( prevState => ({
              display: prevState.display + symbol
          }));
        }      
      }
    }
  }
  
  render () {  
    return (
      <div className="calculator">
        <Display display={this.state.display} />
        
        {buttons.map(btn => 
          <Button id={btn.id} symbol={btn.symbol} updateDisplay={this.handleButtonClick} />
        )}
      </div>
    );
  }
}

export default App;
