import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="text-6xl mb-4">🚨</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Something went wrong!</h1>
          <p className="text-gray-600 dark:text-gray-400">{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-6">Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;