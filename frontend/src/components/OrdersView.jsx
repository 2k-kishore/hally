import { useEffect, useState, useCallback } from 'react';
import { fetchOrders, deleteOrder } from '../api/orders';
import OrderModal from './OrderModal';

const STATUS_BADGE = {
  'Pending': 'badge-pending',
  'In Progress': 'badge-progress',
  'Completed': 'badge-completed',
};

export default function OrdersView({ onOrderChange }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchOrders({ status: statusFilter !== 'All' ? statusFilter : undefined });
      setOrders(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    setDeleting(id);
    try {
      await deleteOrder(id);
      await load();
      if (onOrderChange) onOrderChange();
    } catch (e) { console.error(e); }
    finally { setDeleting(null); }
  };

  const handleEdit = (order) => { setEditingOrder(order); setModalOpen(true); };
  const handleNew = () => { setEditingOrder(null); setModalOpen(true); };
  const handleSaved = async () => { setModalOpen(false); await load(); if (onOrderChange) onOrderChange(); };

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    return !q || (`${o.customer.firstName} ${o.customer.lastName}`).toLowerCase().includes(q)
      || o.order.product.toLowerCase().includes(q)
      || o.customer.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Customer Orders</h2>
          <p className="text-xs text-slate-500">{filtered.length} orders {statusFilter !== 'All' ? `(${statusFilter})` : 'total'}</p>
        </div>
        <button onClick={handleNew} className="btn-neon flex items-center gap-2 text-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 5v14M5 12h14"/></svg>
          New Order
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="glow-input pl-9"
            placeholder="Search by name, email, or product…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="glow-select w-full sm:w-44" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg,#3b82f6,#a855f7)', animation: `floatIdle ${0.6+i*0.15}s ease-in-out infinite` }}/>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            <p className="text-2xl mb-2">📋</p>
            <p>No orders found. {search ? 'Try a different search.' : 'Create your first order!'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['#','Customer','Product','Qty','Unit Price','Total','Status','Created By','Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                    className="transition-colors"
                  >
                    <td className="px-4 py-3 text-xs text-slate-600">{i+1}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-white">{o.customer.firstName} {o.customer.lastName}</p>
                      <p className="text-xs text-slate-500">{o.customer.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300 max-w-[150px] truncate">{o.order.product}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{o.order.quantity}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">${Number(o.order.unitPrice).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#3b82f6' }}>${Number(o.order.totalAmount).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={STATUS_BADGE[o.order.status] || 'badge-pending'}>{o.order.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">{o.order.createdBy}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(o)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(o._id)}
                          disabled={deleting === o._id}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <OrderModal
          order={editingOrder}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
