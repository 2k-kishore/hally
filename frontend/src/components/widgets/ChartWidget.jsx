import { useMemo } from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, XAxis as SXAxis, YAxis as SYAxis,
} from 'recharts';

const labelOf = (item, field) => {
  switch (field) {
    case 'Product': return item.order.product;
    case 'Quantity': return item.order.quantity;
    case 'Unit price': return item.order.unitPrice;
    case 'Total amount': return item.order.totalAmount;
    case 'Status': return item.order.status;
    case 'Created by': return item.order.createdBy;
    case 'Customer name': return item.customerName;
    default: return 0;
  }
};

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1e293b', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', fontSize: '12px' },
  labelStyle: { color: '#94a3b8', fontWeight: 600 },
  itemStyle: { color: '#e2e8f0' },
};
const GRID_STYLE = { stroke: 'rgba(255,255,255,0.05)' };
const AXIS_STYLE = { tick: { fill: '#64748b', fontSize: 11 }, axisLine: { stroke: 'rgba(255,255,255,0.08)' }, tickLine: false };

export default function ChartWidget({ widget, normalized }) {
  const primary = widget.primaryColor || '#3b82f6';
  const secondary = widget.secondaryColor || '#a855f7';
  const chartId = widget.i || 'chart';

  const data = useMemo(() => {
    return normalized.map((item, i) => ({
      name: String(labelOf(item, widget.xAxis)).slice(0, 14),
      value: Number(labelOf(item, widget.yAxis)) || 0,
      x: Number(labelOf(item, widget.xAxis)) || i,
      y: Number(labelOf(item, widget.yAxis)) || 0,
    }));
  }, [normalized, widget.xAxis, widget.yAxis]);

  const commonProps = {
    data,
    margin: { top: 4, right: 8, bottom: 4, left: 0 },
  };

  const gradId = `chart-grad-${chartId}`;

  const renderChart = () => {
    if (widget.type === 'Bar') return (
      <BarChart {...commonProps}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primary} stopOpacity={1}/>
            <stop offset="100%" stopColor={secondary} stopOpacity={0.7}/>
          </linearGradient>
        </defs>
        <CartesianGrid {...GRID_STYLE} />
        <XAxis dataKey="name" {...AXIS_STYLE} />
        <YAxis {...AXIS_STYLE} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Bar dataKey="value" fill={`url(#${gradId})`} radius={[6, 6, 0, 0]}
          label={widget.showDataLabel ? { fill: '#94a3b8', fontSize: 10, position: 'top' } : false} />
      </BarChart>
    );

    if (widget.type === 'Line') return (
      <LineChart {...commonProps}>
        <CartesianGrid {...GRID_STYLE} />
        <XAxis dataKey="name" {...AXIS_STYLE} />
        <YAxis {...AXIS_STYLE} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Line type="monotone" dataKey="value" stroke={primary} strokeWidth={2.5} dot={{ fill: primary, r: 3 }}
          activeDot={{ r: 5, fill: primary, stroke: 'white', strokeWidth: 2 }} />
      </LineChart>
    );

    if (widget.type === 'Area') return (
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primary} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={primary} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid {...GRID_STYLE} />
        <XAxis dataKey="name" {...AXIS_STYLE} />
        <YAxis {...AXIS_STYLE} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Area type="monotone" dataKey="value" stroke={primary} strokeWidth={2.5} fill={`url(#${gradId})`} />
      </AreaChart>
    );

    if (widget.type === 'Scatter') {
      const scatterData = normalized.map(item => ({
        x: Number(labelOf(item, widget.xAxis)) || 0,
        y: Number(labelOf(item, widget.yAxis)) || 0,
      }));
      return (
        <ScatterChart margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid {...GRID_STYLE} />
          <SXAxis type="number" dataKey="x" name={widget.xAxis} {...AXIS_STYLE} />
          <SYAxis type="number" dataKey="y" name={widget.yAxis} {...AXIS_STYLE} />
          <Tooltip {...TOOLTIP_STYLE} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
          <Scatter data={scatterData} fill={primary} opacity={0.8} />
        </ScatterChart>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      <p className="text-xs text-slate-500 mb-2">
        <span style={{ color: primary }}>{widget.yAxis}</span>
        <span className="mx-1 text-slate-600">by</span>
        <span className="text-slate-400">{widget.xAxis}</span>
      </p>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
