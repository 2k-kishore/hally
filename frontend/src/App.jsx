import { useEffect, useState, useCallback } from 'react';
import { fetchOrders } from './api/orders';
import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrdersView from './components/OrdersView';
import Login from './components/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  const loadOrders = useCallback(async (filters = dateFilter) => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const data = await fetchOrders(filters);
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  }, [dateFilter, isLoggedIn]);

  useEffect(() => { 
    if (isLoggedIn) loadOrders(); 
  }, [isLoggedIn, loadOrders]);

  const handleDateFilter = (newFilter) => {
    setDateFilter(newFilter);
    loadOrders(newFilter);
  };

  const addWidget = (widget) => setWidgets(prev => [...prev, { ...widget, i: `widget-${Date.now()}`, x: 0, y: Infinity, w: widget.defaultW || 4, h: widget.defaultH || 3 }]);
  const deleteWidget = (id) => setWidgets(prev => prev.filter(w => w.i !== id));
  const updateWidgetLayout = (layout) => {
    setWidgets(prev => prev.map(w => {
      const l = layout.find(l => l.i === w.i);
      return l ? { ...w, x: l.x, y: l.y, w: l.w, h: l.h } : w;
    }));
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f172a' }}>
      <Sidebar view={view} setView={setView} onLogout={() => setIsLoggedIn(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavBar
          dateFilter={dateFilter}
          onDateFilter={handleDateFilter}
          onToggleConfig={() => setShowConfigPanel(p => !p)}
          showConfigPanel={showConfigPanel}
          view={view}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {view === 'dashboard' ? (
            <Dashboard
              orders={orders}
              widgets={widgets}
              loading={loading}
              onWidgetDelete={deleteWidget}
              onLayoutChange={updateWidgetLayout}
              onAddWidget={() => setShowConfigPanel(true)}
              showConfigPanel={showConfigPanel}
              onAddWidgetData={addWidget}
              onClosePanel={() => setShowConfigPanel(false)}
            />
          ) : (
            <OrdersView onOrderChange={loadOrders} />
          )}
        </main>
      </div>
    </div>
  );
}
