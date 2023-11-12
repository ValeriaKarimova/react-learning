import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong. Please refresh the page or try again later.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
