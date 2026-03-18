export default function TopNavBar({ dateFilter, onDateFilter, onToggleConfig, showConfigPanel, view }) {
  const handleDate = (field, val) =>
    onDateFilter({ ...dateFilter, [field]: val });

  return (
    <header
      className="flex items-center justify-between px-4 lg:px-6 h-16 shrink-0"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Left: page title */}
      <div>
        <h1 className="text-lg font-bold text-white capitalize">{view === 'dashboard' ? 'Dashboard Builder' : 'Customer Orders'}</h1>
        <p className="text-xs text-slate-500 hidden sm:block">
          {view === 'dashboard' ? 'Drag, drop & configure your widgets' : 'Manage all customer orders'}
        </p>
      </div>

      {/* Center: date range */}
      {view === 'dashboard' && (
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-slate-500">From</span>
          <input
            type="date"
            value={dateFilter.startDate}
            onChange={e => handleDate('startDate', e.target.value)}
            className="glow-input text-xs w-36"
            style={{ colorScheme: 'dark' }}
          />
          <span className="text-xs text-slate-500">To</span>
          <input
            type="date"
            value={dateFilter.endDate}
            onChange={e => handleDate('endDate', e.target.value)}
            className="glow-input text-xs w-36"
            style={{ colorScheme: 'dark' }}
          />
          {(dateFilter.startDate || dateFilter.endDate) && (
            <button
              onClick={() => onDateFilter({ startDate: '', endDate: '' })}
              className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-lg border border-white/10 hover:border-white/20"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Right: actions + profile */}
      <div className="flex items-center gap-3">
        {view === 'dashboard' && (
          <button
            onClick={onToggleConfig}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              showConfigPanel
                ? 'text-white border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                : 'text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
            }`}
            style={showConfigPanel ? { background: 'rgba(59,130,246,0.15)' } : { background: 'rgba(255,255,255,0.04)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
            </svg>
            <span className="hidden sm:inline">Widgets</span>
          </button>
        )}

        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #3b82f6, #a855f7)', boxShadow: '0 0 4px rgba(59,130,246,0.8)' }}/>
        </button>

        {/* Profile avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white cursor-pointer transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              boxShadow: '0 0 12px rgba(59,130,246,0.4)',
            }}
          >
            MH
          </div>
        </div>
      </div>
    </header>
  );
}
