import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page or navigating back home.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
