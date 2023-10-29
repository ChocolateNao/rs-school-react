import React, { Component } from 'react';

class Error extends Component {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Error({ error: 'Dummy Error!' });
    return <div />;
  }
}

export default Error;
