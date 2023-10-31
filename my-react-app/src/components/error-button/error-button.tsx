import React, { Component } from 'react';
import './error-button.scss';

class ErrorButton extends Component {
  state = {
    error: false,
  };

  throwError = () => {
    this.setState({ error: !this.state.error });
  };

  render() {
    if (this.state.error) {
      throw new Error('Simulated error from button click');
    }
    return (
      <div className="err-btn">
        <button onClick={this.throwError}>Throw Error</button>
      </div>
    );
  }
}

export default ErrorButton;
