import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading__spinner" />
        <span className="loading__text">Loading...</span>
      </div>
    );
  }
}

export default Loading;
