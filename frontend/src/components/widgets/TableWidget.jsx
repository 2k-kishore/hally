const STATUS_BADGE = {
  'Pending': 'badge-pending',
  'In Progress': 'badge-progress',
  'Completed': 'badge-completed',
};

const COLUMN_MAP = {
  'Customer ID': item => item._id?.slice(-6)?.toUpperCase(),
  'Customer name': item => item.customerName,
  'Email id': item => item.customer?.email,
  'Phone number': item => item.customer?.phone,
  'Address': item => item.address,
  'Order date': item => item.orderDate,
  'Product': item => item.order?.product,
  'Quantity': item => item.order?.quantity,
  'Unit price': item => `$${Number(item.order?.unitPrice || 0).toFixed(2)}`,
  'Total amount': item => `$${Number(item.order?.totalAmount || 0).toFixed(2)}`,
  'Status': item => item.order?.status,
  'Created by': item => item.order?.createdBy,
};

export default function TableWidget({ widget, normalized }) {
  const cols = widget.selectedColumns?.length ? widget.selectedColumns : ['Customer name', 'Product', 'Status', 'Total amount'];
  let rows = [...normalized];
  if (widget.sort === 'Ascending') rows.sort((a,b) => (a.order?.totalAmount||0) - (b.order?.totalAmount||0));
  else rows.sort((a,b) => (b.order?.totalAmount||0) - (a.order?.totalAmount||0));
  rows = rows.slice(0, widget.pagination || 5);

  if (!rows.length) {
    return <p className="text-sm text-slate-500 mt-4 text-center">No data available.</p>;
  }

  return (
    <div className="overflow-auto h-full">
      <table className="w-full min-w-max text-xs">
        <thead>
          <tr>
            {cols.map(col => (
              <th
                key={col}
                className="text-left px-3 py-2 font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row._id || ri}
              className="group transition-colors"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              {cols.map(col => {
                const val = COLUMN_MAP[col] ? COLUMN_MAP[col](row) : '';
                return (
                  <td key={col} className="px-3 py-2 text-slate-300 whitespace-nowrap max-w-[140px] truncate">
                    {col === 'Status' ? (
                      <span className={STATUS_BADGE[val] || 'badge-pending'}>{val}</span>
                    ) : (
                      <span title={String(val)}>{val}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
