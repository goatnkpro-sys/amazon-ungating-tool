import React, { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '640px', margin: '40px auto', background: '#fee2e2', borderRadius: '16px', color: '#991b1b', border: '1px solid #f87171' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold' }}>Application Encountered an Error</h2>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#7f1d1d' }}>
            The page encountered an unexpected issue while rendering:
          </p>
          <pre style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', border: '1px solid #fca5a5' }}>
            {this.state.error?.message || 'Unknown runtime error'}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px', padding: '10px 20px', background: '#991b1b', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Fatal: Root DOM element with id "root" was not found.');
}
