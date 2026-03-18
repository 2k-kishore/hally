export default function Sidebar({ view, setView, onLogout }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
        </svg>
      ),
    },
  ];

  return (
    <aside
      className="hidden md:flex flex-col w-16 lg:w-60 h-full shrink-0 transition-all duration-300 relative group/sidebar"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #a855f7)' }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="hidden lg:block overflow-hidden">
          <p className="text-sm font-black neon-text tracking-[0.1em] leading-none uppercase">Dashboard</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 pt-4 px-2 space-y-1">
        {navItems.map(item => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group relative"
              style={active ? {
                background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(168,85,247,0.15))',
                border: '1px solid rgba(59,130,246,0.3)',
                boxShadow: '0 0 16px rgba(59,130,246,0.15)',
              } : {
                background: 'transparent',
                border: '1px solid transparent',
              }}
            >
              {/* Active bar */}
              {active && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                  style={{ background: 'linear-gradient(180deg, #3b82f6, #a855f7)' }}
                />
              )}
              <span className={active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>
                {item.icon}
              </span>
              <span className={`hidden lg:block text-sm font-medium transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #a855f7)' }}
          >
            AD
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-slate-300">Admin User</p>
            <p className="text-xs text-slate-500">admin@hallyx.com</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full h-10 flex items-center justify-center lg:justify-start lg:px-4 gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all duration-300 group/logout"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover/logout:-translate-x-1 transition-transform">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-7-7H3m4 4-4-4 4-4"/>
          </svg>
          <span className="hidden lg:block text-xs font-bold uppercase tracking-wider">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
