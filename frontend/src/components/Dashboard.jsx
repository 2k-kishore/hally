import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetCard from './WidgetCard';
import WidgetConfigPanel from './WidgetConfigPanel';

const ResponsiveGrid = WidthProvider(Responsive);

const COLS = { lg: 12, md: 8, sm: 4, xs: 4, xxs: 2 };
const BREAKPOINTS = { lg: 1200, md: 768, sm: 480, xs: 360, xxs: 0 };

export default function Dashboard({
  orders, widgets, loading,
  onWidgetDelete, onLayoutChange,
  onAddWidget, showConfigPanel,
  onAddWidgetData, onClosePanel,
}) {
  const [localLayouts, setLocalLayouts] = useState({});

  const handleLayoutChange = (layout, allLayouts) => {
    setLocalLayouts(allLayouts);
    onLayoutChange(layout);
  };

  const gridItems = widgets.map(w => ({
    i: w.i, x: w.x ?? 0, y: w.y ?? 0,
    w: w.w ?? 4, h: w.h ?? 3,
    minW: 2, minH: 2,
  }));

  return (
    <div className="relative flex gap-4">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {loading && (
          <div className="flex items-center justify-center h-32">
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full" style={{
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  animation: `floatIdle ${0.6 + i * 0.15}s ease-in-out infinite`,
                  boxShadow: '0 0 8px rgba(59,130,246,0.6)',
                }}/>
              ))}
            </div>
          </div>
        )}

        {!loading && widgets.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center animate-float-idle"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(168,85,247,0.15))',
                border: '1px solid rgba(59,130,246,0.3)',
                boxShadow: '0 0 40px rgba(59,130,246,0.15)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.5" className="w-12 h-12">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Dashboard is Empty</h2>
              <p className="text-slate-400 text-sm max-w-sm">Add your first widget to start visualizing your order data. Click "Widgets" in the top bar to get started.</p>
            </div>
            <button onClick={onAddWidget} className="btn-neon flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add Your First Widget
            </button>
          </div>
        )}

        {!loading && widgets.length > 0 && (
          <ResponsiveGrid
            className="layout"
            layouts={localLayouts}
            breakpoints={BREAKPOINTS}
            cols={COLS}
            rowHeight={120}
            onLayoutChange={handleLayoutChange}
            draggableHandle=".widget-drag-handle"
            isDraggable
            isResizable
            margin={[32, 24]}
            containerPadding={[24, 24]}
          >
            {widgets.map((widget, i) => (
              <div key={widget.i} style={{ zIndex: 10 }}>
                <WidgetCard
                  widget={widget}
                  orders={orders}
                  onDelete={() => onWidgetDelete(widget.i)}
                  animDelay={i * 0.15}
                />
              </div>
            ))}
          </ResponsiveGrid>
        )}
      </div>

      {/* Config panel slide-in */}
      {showConfigPanel && (
        <WidgetConfigPanel
          onAddWidget={onAddWidgetData}
          onClose={onClosePanel}
        />
      )}
    </div>
  );
}
