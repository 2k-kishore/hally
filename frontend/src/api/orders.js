import axios from 'axios';

const BASE = '/api/orders';

export const fetchOrders = (params = {}) => {
  const query = new URLSearchParams();
  if (params.startDate) query.set('startDate', params.startDate);
  if (params.endDate) query.set('endDate', params.endDate);
  if (params.status && params.status !== 'All') query.set('status', params.status);
  const qs = query.toString();
  return axios.get(qs ? `${BASE}?${qs}` : BASE).then(r => r.data);
};

export const fetchOrder  = id => axios.get(`${BASE}/${id}`).then(r => r.data);
export const createOrder = payload => axios.post(BASE, payload).then(r => r.data);
export const updateOrder = (id, payload) => axios.put(`${BASE}/${id}`, payload).then(r => r.data);
export const deleteOrder = id => axios.delete(`${BASE}/${id}`).then(r => r.data);
