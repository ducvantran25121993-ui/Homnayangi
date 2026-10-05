import React, { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends (Component as unknown as new (props: Props) => Component & {
  props: Props;
  state: State;
  setState: (state: Partial<State>) => void;
}) {
  constructor(props: Props) {
    super(props);
    (this as any).state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if ((this as any).state.hasError) {
      if ((this as any).props.fallback) {
        return (this as any).props.fallback;
      }
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 text-2xl shadow-sm">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-stone-800 mb-2">Đã có lỗi xảy ra</h2>
          <p className="text-stone-500 text-sm max-w-md mb-6 leading-relaxed">
            Hệ thống đang tải lại dữ liệu. Vui lòng bấm vào nút bên dưới để quay về trang chủ hoặc tải lại trang.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                (this as any).setState({ hasError: false });
                window.location.href = '/';
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Về Trang Chủ
            </button>
            <button
              onClick={() => {
                (this as any).setState({ hasError: false });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm transition-all cursor-pointer"
            >
              Tải Lại Trang
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
