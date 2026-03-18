import { useState } from 'react';

const METRICS = ['Total amount', 'Quantity', 'Unit price', 'Customer name', 'Status', 'Product', 'Created by', 'Email id'];
const AGGREGATIONS = ['Sum', 'Average', 'Count'];
const CHART_TYPES = ['Bar', 'Line', 'Area', 'Scatter'];
const PIE_METRICS = ['Product', 'Status', 'Created by', 'Country'];
const X_AXIS = ['Product', 'Status', 'Created by', 'Customer name'];
const Y_AXIS = ['Total amount', 'Quantity', 'Unit price'];
const COLUMNS_OPTIONS = ['Customer ID','Customer name','Email id','Phone number','Address','Order date','Product','Quantity','Unit price','Total amount','Status','Created by'];
const COLORS = ['#3b82f6','#a855f7','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#8b5cf6'];

const TabBtn = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className="flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200"
    style={active ? {
      background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.2))',
      color: '#e2e8f0', border: '1px solid rgba(59,130,246,0.4)',
    } : { background: 'transparent', color: '#64748b', border: '1px solid transparent' }}
  >
    {label}
  </button>
);

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-400 block">{label}</label>
    {children}
  </div>
);

export default function WidgetConfigPanel({ onAddWidget, onClose }) {
  const [tab, setTab] = useState('KPI');

  const [kpi, setKpi] = useState({ title: 'My KPI', metric: 'Total amount', aggregation: 'Sum', format: 'Currency', precision: 2, accentColor: '#3b82f6', description: '' });
  const [chart, setChart] = useState({ title: 'My Chart', type: 'Bar', xAxis: 'Product', yAxis: 'Total amount', primaryColor: '#3b82f6', secondaryColor: '#a855f7', showDataLabel: false, description: '' });
  const [pie, setPie] = useState({ title: 'My Pie', metric: 'Product', donut: false, showLegend: true, description: '' });
  const [table, setTable] = useState({ title: 'My Table', selectedColumns: ['Customer name', 'Product', 'Status', 'Total amount'], sort: 'Descending', pagination: 5, description: '' });

  const handleAdd = () => {
    const base = { widgetType: tab };
    let widget;
    if (tab === 'KPI')   widget = { ...base, ...kpi, defaultW: 4, defaultH: 3 };
    if (tab === 'Chart') widget = { ...base, ...chart, defaultW: 8, defaultH: 5 };
    if (tab === 'Pie')   widget = { ...base, ...pie, defaultW: 6, defaultH: 5 };
    if (tab === 'Table') widget = { ...base, ...table, defaultW: 12, defaultH: 6 };
    if (widget) onAddWidget(widget);
  };

  const toggleColumn = col => {
    setTable(prev => ({
      ...prev,
      selectedColumns: prev.selectedColumns.includes(col)
        ? prev.selectedColumns.filter(c => c !== col)
        : [...prev.selectedColumns, col],
    }));
  };

  return (
    <div
      className="w-72 shrink-0 flex flex-col rounded-[20px] overflow-hidden animate-slide-in-right"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)',
        maxHeight: 'calc(100vh - 5rem)',
      }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div>
          <h2 className="text-sm font-bold text-white">Widget Builder</h2>
          <p className="text-xs text-slate-500">Configure and add to dashboard</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-3 pb-0">
        {['KPI','Chart','Pie','Table'].map(t => (
          <TabBtn key={t} label={t} active={tab === t} onClick={() => setTab(t)} />
        ))}
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* ----- KPI ----- */}
        {tab === 'KPI' && (
          <>
            <Field label="Widget Title">
              <input className="glow-input" value={kpi.title} onChange={e => setKpi(p => ({...p, title: e.target.value}))} placeholder="My KPI" />
            </Field>
            <Field label="Description">
              <input className="glow-input" value={kpi.description} onChange={e => setKpi(p => ({...p, description: e.target.value}))} placeholder="Optional" />
            </Field>
            <Field label="Metric">
              <select className="glow-select" value={kpi.metric} onChange={e => setKpi(p => ({...p, metric: e.target.value}))}>
                {METRICS.map(m => <option key={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Aggregation">
              <select className="glow-select" value={kpi.aggregation} onChange={e => setKpi(p => ({...p, aggregation: e.target.value}))}>
                {AGGREGATIONS.map(a => <option key={a}>{a}</option>)}
              </select>
            </Field>
            <Field label="Format">
              <select className="glow-select" value={kpi.format} onChange={e => setKpi(p => ({...p, format: e.target.value}))}>
                <option>Currency</option><option>Number</option>
              </select>
            </Field>
            <Field label="Decimal Places">
              <input type="number" min={0} max={4} className="glow-input" value={kpi.precision} onChange={e => setKpi(p => ({...p, precision: e.target.value}))} />
            </Field>
            <Field label="Accent Color">
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setKpi(p => ({...p, accentColor: c}))}
                    className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                    style={{ background: c, boxShadow: kpi.accentColor === c ? `0 0 10px ${c}` : 'none', border: kpi.accentColor === c ? '2px solid white' : '2px solid transparent' }} />
                ))}
              </div>
            </Field>
          </>
        )}

        {/* ----- Chart ----- */}
        {tab === 'Chart' && (
          <>
            <Field label="Widget Title">
              <input className="glow-input" value={chart.title} onChange={e => setChart(p => ({...p, title: e.target.value}))} placeholder="My Chart" />
            </Field>
            <Field label="Description">
              <input className="glow-input" value={chart.description} onChange={e => setChart(p => ({...p, description: e.target.value}))} placeholder="Optional" />
            </Field>
            <Field label="Chart Type">
              <div className="flex gap-1 flex-wrap">
                {CHART_TYPES.map(t => (
                  <button key={t} onClick={() => setChart(p => ({...p, type: t}))}
                    className="flex-1 py-1.5 text-xs rounded-xl border transition-all"
                    style={chart.type === t ? { background: 'rgba(59,130,246,0.2)', borderColor: 'rgba(59,130,246,0.5)', color: '#93c5fd' } : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="X Axis (Category)">
              <select className="glow-select" value={chart.xAxis} onChange={e => setChart(p => ({...p, xAxis: e.target.value}))}>
                {X_AXIS.map(x => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Y Axis (Value)">
              <select className="glow-select" value={chart.yAxis} onChange={e => setChart(p => ({...p, yAxis: e.target.value}))}>
                {Y_AXIS.map(y => <option key={y}>{y}</option>)}
              </select>
            </Field>
            <Field label="Primary Color">
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setChart(p => ({...p, primaryColor: c}))}
                    className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                    style={{ background: c, boxShadow: chart.primaryColor === c ? `0 0 10px ${c}` : 'none', border: chart.primaryColor === c ? '2px solid white' : '2px solid transparent' }} />
                ))}
              </div>
            </Field>
            <Field label="Secondary Color">
              <div className="flex gap-2 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setChart(p => ({...p, secondaryColor: c}))}
                    className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                    style={{ background: c, boxShadow: chart.secondaryColor === c ? `0 0 10px ${c}` : 'none', border: chart.secondaryColor === c ? '2px solid white' : '2px solid transparent' }} />
                ))}
              </div>
            </Field>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="dataLabel" checked={chart.showDataLabel} onChange={e => setChart(p => ({...p, showDataLabel: e.target.checked}))} className="w-4 h-4" />
              <label htmlFor="dataLabel" className="text-xs text-slate-400">Show data labels</label>
            </div>
          </>
        )}

        {/* ----- Pie ----- */}
        {tab === 'Pie' && (
          <>
            <Field label="Widget Title">
              <input className="glow-input" value={pie.title} onChange={e => setPie(p => ({...p, title: e.target.value}))} placeholder="My Pie Chart" />
            </Field>
            <Field label="Description">
              <input className="glow-input" value={pie.description} onChange={e => setPie(p => ({...p, description: e.target.value}))} placeholder="Optional" />
            </Field>
            <Field label="Group By">
              <select className="glow-select" value={pie.metric} onChange={e => setPie(p => ({...p, metric: e.target.value}))}>
                {PIE_METRICS.map(m => <option key={m}>{m}</option>)}
              </select>
            </Field>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="donut" checked={pie.donut} onChange={e => setPie(p => ({...p, donut: e.target.checked}))} className="w-4 h-4" />
              <label htmlFor="donut" className="text-xs text-slate-400">Donut style</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="legend" checked={pie.showLegend} onChange={e => setPie(p => ({...p, showLegend: e.target.checked}))} className="w-4 h-4" />
              <label htmlFor="legend" className="text-xs text-slate-400">Show legend</label>
            </div>
          </>
        )}

        {/* ----- Table ----- */}
        {tab === 'Table' && (
          <>
            <Field label="Widget Title">
              <input className="glow-input" value={table.title} onChange={e => setTable(p => ({...p, title: e.target.value}))} placeholder="My Table" />
            </Field>
            <Field label="Description">
              <input className="glow-input" value={table.description} onChange={e => setTable(p => ({...p, description: e.target.value}))} placeholder="Optional" />
            </Field>
            <Field label="Columns (toggle to select)">
              <div className="flex flex-wrap gap-1.5 mt-1">
                {COLUMNS_OPTIONS.map(col => (
                  <button key={col} onClick={() => toggleColumn(col)}
                    className="text-xs px-2 py-1 rounded-lg border transition-all"
                    style={table.selectedColumns.includes(col)
                      ? { background: 'rgba(59,130,246,0.2)', borderColor: 'rgba(59,130,246,0.5)', color: '#93c5fd' }
                      : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }
                    }
                  >
                    {col}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Sort by Total Amount">
              <select className="glow-select" value={table.sort} onChange={e => setTable(p => ({...p, sort: e.target.value}))}>
                <option>Descending</option><option>Ascending</option>
              </select>
            </Field>
            <Field label="Rows to Show">
              <input type="number" min={1} max={50} className="glow-input" value={table.pagination} onChange={e => setTable(p => ({...p, pagination: Number(e.target.value)}))} />
            </Field>
          </>
        )}
      </div>

      {/* Add button */}
      <div className="p-4 border-t border-white/5">
        <button onClick={handleAdd} className="btn-neon w-full flex items-center justify-center gap-2 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 5v14M5 12h14"/></svg>
          Add {tab} Widget
        </button>
      </div>
    </div>
  );
}
