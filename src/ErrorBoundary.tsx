import React, { Component } from 'react';

// https://reactjs.org/docs/error-boundaries.html

// componentDidCatch is not supported in function components
class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: 'red', color: 'white', padding: 20 }}>
          {
            'Error, but handled by a <ErrorBoundary /> so the rest of the page works.'
          }
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
