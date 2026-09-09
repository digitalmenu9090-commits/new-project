import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Coffee, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#E8DFC8] text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C89D5C]/15 text-[#C89D5C] flex items-center justify-center mb-6">
              <Coffee className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              SIP CAFE
            </h1>
            <p className="text-stone-600 text-sm mb-6 leading-relaxed">
              We encountered a temporary display issue while brewing your page. Click below to refresh and load the latest menu.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#2A1810] hover:bg-[#C89D5C] text-white font-medium text-sm transition-all duration-300 shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reload Cafe Menu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
