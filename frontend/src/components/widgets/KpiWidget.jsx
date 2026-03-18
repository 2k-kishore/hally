import { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const METRIC_MAP = {
  'Customer name': item => item.customerName,
  'Email id': item => item.customer.email,
  'Product': item => item.order.product,
  'Quantity': item => item.order.quantity,
  'Unit price': item => item.order.unitPrice,
  'Total amount': item => item.order.totalAmount,
  'Status': item => item.order.status,
  'Created by': item => item.order.createdBy,
};

export default function KpiWidget({ widget, normalized }) {
  const value = useMemo(() => {
    const accessor = METRIC_MAP[widget.metric];
    if (!accessor) return 'N/A';
    const vals = normalized.map(accessor).filter(v => v != null);
    if (widget.aggregation === 'Count') return vals.length;
    const nums = vals.map(Number).filter(v => !isNaN(v));
    if (!nums.length) return vals.length;
    if (widget.aggregation === 'Sum') return nums.reduce((a, b) => a + b, 0);
    if (widget.aggregation === 'Average') return (nums.reduce((a, b) => a + b, 0) / nums.length);
    return nums.length;
  }, [widget, normalized]);

  // Trend compared to midpoint (simple mock trend)
  const trend = useMemo(() => {
    const nums = normalized.map(METRIC_MAP[widget.metric]).filter(v => v != null && !isNaN(Number(v))).map(Number);
    if (nums.length < 2) return null;
    const mid = Math.floor(nums.length / 2);
    const first = nums.slice(0, mid).reduce((a,b) => a+b, 0) / mid;
    const second = nums.slice(mid).reduce((a,b) => a+b, 0) / (nums.length - mid);
    return second >= first ? 'up' : 'down';
  }, [widget, normalized]);

  // sparkline data
  const sparkData = useMemo(() => {
    return normalized.slice(-12).map((item, i) => ({
      i,
      v: Number(METRIC_MAP[widget.metric]?.(item)) || 0,
    }));
  }, [widget, normalized]);

  const formatted = useMemo(() => {
    const n = Number(value);
    if (isNaN(n)) return String(value);
    const fixed = n.toFixed(widget.precision ?? 0);
    return widget.format === 'Currency' ? `$${Number(fixed).toLocaleString()}` : Number(fixed).toLocaleString();
  }, [value, widget]);

  const accent = widget.accentColor || '#3b82f6';

  return (
    <div className="flex flex-col h-full justify-between pt-1">
      <div>
        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{widget.metric}</p>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-black" style={{ color: accent, textShadow: `0 0 25px ${accent}88` }}>
            {formatted}
          </span>
          {trend && (
            <span className={`flex items-center gap-1 text-xs font-semibold mb-1 ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                {trend === 'up' ? <path d="M18 15l-6-6-6 6"/> : <path d="M6 9l6 6 6-6"/>}
              </svg>
              {trend === 'up' ? '+' : ''}Trend
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1">{widget.aggregation || 'Count'} of {widget.metric}</p>
      </div>

      {/* Sparkline */}
      {sparkData.length > 2 && (
        <div className="h-16 mt-3 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id={`spark-${widget.i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accent} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={accent} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={accent}
                strokeWidth={2}
                fill={`url(#spark-${widget.i})`}
                dot={false}
              />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: `1px solid ${accent}44`, borderRadius: '8px', fontSize: '11px' }}
                labelStyle={{ display: 'none' }}
                itemStyle={{ color: accent }}
                formatter={v => [typeof v === 'number' ? v.toFixed(2) : v, widget.metric]}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
