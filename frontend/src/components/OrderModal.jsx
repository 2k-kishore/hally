import { useEffect, useMemo, useState } from 'react';
import { createOrder, updateOrder } from '../api/orders';

const PRODUCTS = ['Fiber Internet 300 Mbps', '5G Unlimited Mobile Plan', 'Fiber Internet 1 Gbps', 'Business Internet 500 Mbps', 'VoIP Corporate Package'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];
const CREATED_BY = ['Mr. Michael Harris', 'Mr. Ryan Cooper', 'Ms. Olivia Carter', 'Mr. Lucas Martin'];
const COUNTRIES = ['United States', 'Canada', 'Australia', 'Singapore', 'Hong Kong'];

const PRODUCT_PRICES = {
  'Fiber Internet 300 Mbps': 49.99,
  '5G Unlimited Mobile Plan': 59.99,
  'Fiber Internet 1 Gbps': 89.99,
  'Business Internet 500 Mbps': 149.99,
  'VoIP Corporate Package': 199.99,
};

const init = (o) => ({
  customer: {
    firstName: o?.customer?.firstName || '',
    lastName:  o?.customer?.lastName || '',
    email:     o?.customer?.email || '',
    phone:     o?.customer?.phone || '',
    streetAddress: o?.customer?.streetAddress || '',
    city:      o?.customer?.city || '',
    state:     o?.customer?.state || '',
    postalCode: o?.customer?.postalCode || '',
    country:   o?.customer?.country || 'United States',
  },
  order: {
    product:   o?.order?.product || PRODUCTS[0],
    quantity:  o?.order?.quantity || 1,
    unitPrice: o?.order?.unitPrice || PRODUCT_PRICES[PRODUCTS[0]],
    totalAmount: o?.order?.totalAmount || PRODUCT_PRICES[PRODUCTS[0]],
    status:    o?.order?.status || 'Pending',
    createdBy: o?.order?.createdBy || CREATED_BY[0],
  },
});

const InputField = ({ label, required, error, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-400 flex items-center gap-1">
      {label}
      {required && <span style={{ color: '#f87171' }}>*</span>}
    </label>
    {children}
    {error && (
      <p className="text-xs font-medium" style={{ color: '#f87171', textShadow: '0 0 8px rgba(248,113,113,0.5)' }}>
        {error}
      </p>
    )}
  </div>
);

export default function OrderModal({ order, onClose, onSaved }) {
  const isEdit = !!order;
  const [form, setForm] = useState(() => init(order));
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const totalAmount = useMemo(() => form.order.quantity * form.order.unitPrice, [form.order.quantity, form.order.unitPrice]);

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      order: {
        ...prev.order,
        unitPrice: PRODUCT_PRICES[prev.order.product] || prev.order.unitPrice,
      }
    }));
  }, [form.order.product]);

  const sc = (field, val) => setForm(p => ({ ...p, customer: { ...p.customer, [field]: val } }));
  const so = (field, val) => setForm(p => ({ ...p, order: { ...p.order, [field]: val } }));

  const validate = () => {
    const e = {};
    const c = form.customer;
    if (!c.firstName.trim()) e['firstName'] = 'First name is required';
    if (!c.lastName.trim())  e['lastName']  = 'Last name is required';
    if (!c.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e['email'] = 'Valid email required';
    if (!c.phone.trim())     e['phone']     = 'Phone is required';
    if (!c.streetAddress.trim()) e['streetAddress'] = 'Address is required';
    if (!c.city.trim())      e['city']      = 'City is required';
    if (!c.state.trim())     e['state']     = 'State is required';
    if (!c.postalCode.trim()) e['postalCode'] = 'Postal code is required';
    if (form.order.quantity < 1) e['quantity'] = 'Quantity must be at least 1';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setApiError('');
    try {
      const payload = { customer: form.customer, order: { ...form.order, totalAmount } };
      if (isEdit) await updateOrder(order._id, payload);
      else        await createOrder(payload);
      setSuccess(isEdit ? 'Order updated!' : 'Order created!');
      setTimeout(() => onSaved(), 900);
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Failed to save order');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[24px] overflow-hidden animate-fade-scale-in"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.97) 100%)',
          border: '1px solid rgba(59,130,246,0.25)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.1)',
          backdropFilter: 'blur(40px)',
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5 shrink-0">
          <div>
            <h2 className="text-base font-bold neon-text">{isEdit ? 'Edit Order' : 'New Customer Order'}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{isEdit ? `Editing order for ${order.customer.firstName}` : 'Fill in the details below'}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5">
          {/* Customer section */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg,#3b82f6,#a855f7)' }}/>
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['First name', 'firstName', 'text', true],
                ['Last name', 'lastName', 'text', true],
                ['Email address', 'email', 'email', true],
                ['Phone number', 'phone', 'tel', true],
                ['Street address', 'streetAddress', 'text', true],
                ['City', 'city', 'text', true],
                ['State / Province', 'state', 'text', true],
                ['Postal code', 'postalCode', 'text', true],
              ].map(([label, key, type, req]) => (
                <InputField key={key} label={label} required={req} error={errors[key]}>
                  <input
                    type={type}
                    required={req}
                    className={`glow-input ${errors[key] ? 'border-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.2)]' : ''}`}
                    value={form.customer[key]}
                    onChange={e => sc(key, e.target.value)}
                    placeholder={label}
                  />
                </InputField>
              ))}
              <InputField label="Country" required>
                <select className="glow-select" value={form.customer.country} onChange={e => sc('country', e.target.value)}>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </InputField>
            </div>
          </div>

          {/* Order section */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg,#a855f7,#06b6d4)' }}/>
              Order Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <InputField label="Product" required>
                  <select className="glow-select" value={form.order.product} onChange={e => so('product', e.target.value)}>
                    {PRODUCTS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </InputField>
              </div>
              <InputField label="Quantity" required error={errors.quantity}>
                <input type="number" min={1} className={`glow-input ${errors.quantity ? 'border-red-500/60' : ''}`}
                  value={form.order.quantity} onChange={e => so('quantity', Math.max(1, Number(e.target.value)))} />
              </InputField>
              <InputField label="Unit Price ($)">
                <input type="number" min={0} step="0.01" className="glow-input"
                  value={form.order.unitPrice} onChange={e => so('unitPrice', Number(e.target.value) || 0)} />
              </InputField>
              <InputField label="Total Amount (auto-calculated)">
                <input readOnly className="glow-input opacity-60 cursor-default"
                  value={`$${totalAmount.toFixed(2)}`} />
              </InputField>
              <InputField label="Status" required>
                <select className="glow-select" value={form.order.status} onChange={e => so('status', e.target.value)}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </InputField>
              <div className="sm:col-span-2">
                <InputField label="Created By" required>
                  <select className="glow-select" value={form.order.createdBy} onChange={e => so('createdBy', e.target.value)}>
                    {CREATED_BY.map(n => <option key={n}>{n}</option>)}
                  </select>
                </InputField>
              </div>
            </div>
          </div>

          {/* Messages */}
          {apiError && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', boxShadow: '0 0 16px rgba(239,68,68,0.15)' }}>
              ⚠️ {apiError}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', boxShadow: '0 0 16px rgba(34,197,94,0.15)' }}>
              ✅ {success}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-5 pt-3 border-t border-white/5 shrink-0">
          <button type="button" onClick={onClose} className="btn-ghost text-sm px-5 py-2.5">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="btn-neon text-sm px-6 py-2.5 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                Saving…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  {isEdit ? <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/> : <path d="M12 5v14M5 12h14"/>}
                </svg>
                {isEdit ? 'Update Order' : 'Create Order'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
