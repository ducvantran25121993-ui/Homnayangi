import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Utensils,
  LogIn,
} from 'lucide-react';

export interface AdminUserSession {
  email: string;
  name?: string;
  avatar?: string;
  method: 'password' | 'google';
  loginAt: string;
}

interface AdminLoginProps {
  onLoginSuccess: (session: AdminUserSession) => void;
  onBackToHome?: () => void;
}

export const ADMIN_SESSION_STORAGE_KEY = 'angigio_admin_session';
export const ADMIN_CUSTOM_PASSCODE_KEY = 'angigio_admin_passcode';
export const DEFAULT_ADMIN_PASSCODE = 'Conlaumoinoi';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Handle Password Sign In
  const handlePasswordSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu quản trị.');
      return;
    }

    setPasswordLoading(true);

    const savedPasscode = typeof window !== 'undefined'
      ? localStorage.getItem(ADMIN_CUSTOM_PASSCODE_KEY) || DEFAULT_ADMIN_PASSCODE
      : DEFAULT_ADMIN_PASSCODE;

    // Check against user-requested passcode "Conlaumoinoi"
    const validPasscodes = [
      savedPasscode,
      DEFAULT_ADMIN_PASSCODE,
      'Conlaumoinoi',
    ];

    if (validPasscodes.includes(password.trim())) {
      const session: AdminUserSession = {
        email: 'ducvantran25121993@gmail.com',
        name: 'Quản Trị Viên',
        method: 'password',
        loginAt: new Date().toISOString(),
      };
      if (rememberMe) {
        localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
      } else {
        sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
      }
      onLoginSuccess(session);
    } else {
      setErrorMsg('Mật khẩu quản trị chưa chính xác. Vui lòng thử lại.');
    }

    setPasswordLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-stone-900/90 border border-stone-800 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative z-10 animate-fade-in">
        {/* Top Header & Brand Icon */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/20 mb-3.5 ring-4 ring-orange-500/15">
            <Lock className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
            <Utensils className="w-3.5 h-3.5" />
            <span>Hôm Nay Ăn Gì</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Đăng Nhập Quản Trị
          </h1>
          <p className="text-xs text-stone-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Khu vực bảo mật dành cho quản trị viên biên tập bài viết, xuất dữ liệu và quản lý tin nhắn.
          </p>
        </div>

        {/* Error notification if any */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-300 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        {/* Admin Password Form */}
        <form onSubmit={handlePasswordSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Mật Khẩu Quản Trị Viên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full pl-10 pr-10 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-colors"
                autoComplete="current-password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs text-stone-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-stone-950 border-stone-700 text-orange-600 focus:ring-orange-500"
              />
              <span>Ghi nhớ đăng nhập trên thiết bị này</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={passwordLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-70 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            {passwordLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            <span>{passwordLoading ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
          </button>
        </form>

        {/* Back to Website Link */}
        <div className="mt-6 pt-5 border-t border-stone-800 text-center">
          <button
            type="button"
            onClick={() => {
              if (onBackToHome) {
                onBackToHome();
              } else {
                window.location.href = '/';
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang chủ Hôm Nay Ăn Gì</span>
          </button>
        </div>
      </div>

      {/* Security note footer */}
      <div className="mt-6 text-center text-[11px] text-stone-500 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Hệ thống quản trị bảo mật Hôm Nay Ăn Gì</span>
      </div>
    </div>
  );
};
