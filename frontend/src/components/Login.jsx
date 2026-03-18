import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login for demo purposes
    setTimeout(() => {
      if (email === 'admin@hallyx.com' && password === 'password') {
        onLogin();
      } else {
        setError('Invalid credentials');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#0f172a] overflow-hidden">
      {/* Background Animated Gradient Waves/Particles */}
      <div className="absolute inset-0 z-0 bg-particles">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-spin-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] animate-spin-slow"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-float-idle cursor-default">
        <div className="glass-login-card rounded-[24px] p-8 md:p-10 border border-white/10 group hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3b82f6] to-[#a855f7] flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 animate-float-idle-slow">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white tracking-widest leading-none">DASHBOARD</h1>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-[0.2em]">Secure Access Control</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 input-focus-glow placeholder:text-slate-600"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <div className="relative flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors uppercase font-bold tracking-tighter">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 input-focus-glow placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl flex items-center gap-2 animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-red-500">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span className="text-xs font-semibold text-red-400">{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-neon py-4 flex items-center justify-center gap-3 group/btn hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="font-bold uppercase tracking-widest text-sm">Sign In to Dashboard</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform overflow-visible">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-white/5"></div>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">Or Secure with</span>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full py-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/5 active:scale-[0.98]"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-bold text-slate-300 text-sm">Continue with Google</span>
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default Login;
