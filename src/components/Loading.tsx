import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading__spinner" />
        <p className="loading__text">Loading...</p>
      </div>
    );
  }
}

export default Loading;
