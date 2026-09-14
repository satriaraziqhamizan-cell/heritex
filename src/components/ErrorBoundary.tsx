import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught runtime error caught by HERITEX ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#132726] flex items-center justify-center p-4 sm:p-6 font-sans select-none">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5DFD2] p-6 sm:p-8 shadow-2xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF5EE] border-2 border-[#C85A32] text-[#C85A32] shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C85A32]">
                Sistem Pemulihan HERITEX
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A]">
                Terjadi Kendala Teknis
              </h2>
              <p className="text-xs text-[#5B6D6C] leading-relaxed">
                Aplikasi mengalami kendala tak terduga saat memuat data atau merender tampilan. Silakan muat ulang halaman untuk melanjutkan penjelajahan.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD2] text-[11px] text-[#788887] text-left font-mono overflow-x-auto max-h-24">
                {this.state.error.message || 'Unknown runtime exception'}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="btn-error-reload"
                onClick={this.handleReload}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Muat Ulang Halaman</span>
              </button>
              <button
                id="btn-error-reset"
                onClick={this.handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F0ECE1] px-5 py-2.5 text-xs font-semibold text-[#0D3B3A] border border-[#D5CEBD] transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Coba Kembali</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
