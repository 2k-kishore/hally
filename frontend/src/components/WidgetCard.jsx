import { useMemo } from 'react';
import KpiWidget from './widgets/KpiWidget';
import ChartWidget from './widgets/ChartWidget';
import PieWidget from './widgets/PieWidget';
import TableWidget from './widgets/TableWidget';

const normalize = (orders) => orders.map(o => ({
  ...o,
  customerName: `${o.customer.firstName} ${o.customer.lastName}`,
  address: `${o.customer.streetAddress}, ${o.customer.city}, ${o.customer.state}`,
  orderDate: new Date(o.order.orderDate || o.createdAt || Date.now()).toLocaleDateString(),
}));

export default function WidgetCard({ widget, orders, onDelete, animDelay = 0 }) {
  const normalized = useMemo(() => normalize(orders), [orders]);

  const typeColors = {
    KPI: { from: '#3b82f6', to: '#06b6d4', glow: 'rgba(59,130,246,0.25)' },
    Chart: { from: '#a855f7', to: '#ec4899', glow: 'rgba(168,85,247,0.25)' },
    Pie: { from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6,182,212,0.25)' },
    Table: { from: '#f59e0b', to: '#ef4444', glow: 'rgba(245,158,11,0.25)' },
  };
  const colors = typeColors[widget.widgetType] || typeColors.KPI;

  return (
    <div
      className="h-full flex flex-col rounded-[20px] overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: `1px solid rgba(255,255,255,0.08)`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
        animation: `floatIdle ${4 + (animDelay % 2)}s ease-in-out ${animDelay}s infinite`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 24px ${colors.glow}, 0 0 0 1px rgba(59,130,246,0.2)`;
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      {/* Header gradient bar */}
      <div
        className="h-1 w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${colors.from}, ${colors.to})` }}
      />

      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="widget-drag-handle cursor-grab active:cursor-grabbing p-1 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            title="Drag to move"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-500">
              <path d="M5 9h14M5 15h14"/>
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-white tracking-tight leading-none">{widget.title || `${widget.widgetType} Widget`}</h3>
            {widget.description && <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[220px]">{widget.description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              background: `linear-gradient(135deg, ${colors.from}22, ${colors.to}22)`,
              color: colors.from,
              border: `1px solid ${colors.from}44`,
            }}
          >
            {widget.widgetType}
          </span>
          <button
            onClick={onDelete}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Remove widget"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Widget content */}
      <div className="flex-1 min-h-0 px-6 pb-6 overflow-hidden">
        {widget.widgetType === 'KPI' && <KpiWidget widget={widget} normalized={normalized} />}
        {widget.widgetType === 'Chart' && <ChartWidget widget={widget} normalized={normalized} />}
        {widget.widgetType === 'Pie' && <PieWidget widget={widget} normalized={normalized} />}
        {widget.widgetType === 'Table' && <TableWidget widget={widget} normalized={normalized} />}
      </div>
    </div>
  );
}
