import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NEON_PALETTE = ['#3b82f6', '#a855f7', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const fieldOf = (item, metric) => {
  switch (metric) {
    case 'Product': return item.order.product;
    case 'Status': return item.order.status;
    case 'Created by': return item.order.createdBy;
    case 'Country': return item.customer.country;
    default: return item.order.product;
  }
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieWidget({ widget, normalized }) {
  const data = useMemo(() => {
    const counts = normalized.reduce((acc, item) => {
      const key = String(fieldOf(item, widget.metric || 'Product'));
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [normalized, widget.metric]);

  const innerRadius = widget.donut ? '55%' : '0%';

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs text-slate-500 mb-1">Distribution by <span className="text-blue-400">{widget.metric || 'Product'}</span></p>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {NEON_PALETTE.map((color, i) => (
                <filter key={i} id={`pie-glow-${i}-${widget.i}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              ))}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius="70%"
              dataKey="value"
              labelLine={false}
              label={<CustomLabel />}
              strokeWidth={2}
              stroke="rgba(15,23,42,0.8)"
            >
              {data.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={NEON_PALETTE[idx % NEON_PALETTE.length]}
                  style={{ filter: `drop-shadow(0 0 6px ${NEON_PALETTE[idx % NEON_PALETTE.length]}88)` }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            {widget.showLegend !== false && (
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#64748b', paddingTop: '8px' }}
                iconType="circle"
                iconSize={8}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
