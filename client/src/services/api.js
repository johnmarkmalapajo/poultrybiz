// src/services/api.js
const BASE_URL = 'https://poultrybiz-server.onrender.com/api/v1';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const request = async (path, method = 'GET', body = null) => {
  const options = { method, headers: authHeaders() };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  return res.json();
};

// ─── AUTH ─────────────────────────────────────
export const authAPI = {
  signup: (body) =>
    fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  login: (body) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  getMe: () => request('/auth/me'),
};

// ─── DASHBOARD ────────────────────────────────
export const dashboardAPI = {
  get: () => request('/dashboard'),
};

// ─── FLOCK ────────────────────────────────────
export const flockAPI = {
  getAll: () => request('/flock'),
  create: (data) => request('/flock', 'POST', data),
  update: (id, data) => request(`/flock/${id}`, 'PUT', data),
  remove: (id) => request(`/flock/${id}`, 'DELETE'),
};

// ─── EGGS ─────────────────────────────────────
export const eggAPI = {
  getAll: () => request('/eggs'),

  create: (data) => {
    return request('/eggs', 'POST', {
      date: data.date,
      batchId: data.batchId,   
      totalEggs: data.totalEggs,
      eggSizes: data.eggSizes,
    });
  },

  update: (id, data) => {
    return request(`/eggs/${id}`, 'PUT', {
      date: data.date,
      batchId: data.batchId,   
      totalEggs: data.totalEggs,
      eggSizes: data.eggSizes,
    });
  },

  remove: (id) => request(`/eggs/${id}`, 'DELETE'),
};

// ─── HEALTH RECORD ────────────────────────────
export const healthAPI = {
  getAll: () => request('/health-records'),
  create: (data) => request('/health-records', 'POST', data),
  update: (id, data) => request(`/health-records/${id}`, 'PUT', data),
  remove: (id) => request(`/health-records/${id}`, 'DELETE'),
};

// ─── MORTALITY RECORD ─────────────────────────
export const mortalityAPI = {
  getAll: () => request('/mortality-records'),
  create: (data) => request('/mortality-records', 'POST', data),
  update: (id, data) => request(`/mortality-records/${id}`, 'PUT', data),
  remove: (id) => request(`/mortality-records/${id}`, 'DELETE'),
};

// ─── FEED ─────────────────────────────────────
export const feedAPI = {
  getAll: () => request('/feed'),
  create: (data) => request('/feed', 'POST', data),
  update: (id, data) => request(`/feed/${id}`, 'PUT', data),
  remove: (id) => request(`/feed/${id}`, 'DELETE'),
};

// ─── FEED CONSUMPTION ─────────────────────────
export const feedConsumptionAPI = {
  getAll: () => request('/feed-consumption'),
  create: (data) => request('/feed-consumption', 'POST', data),
  update: (id, data) => request(`/feed-consumption/${id}`, 'PUT', data),
  remove: (id) => request(`/feed-consumption/${id}`, 'DELETE'),
};

// ─── EQUIPMENT ────────────────────────────────
export const equipmentAPI = {
  getAll: () => request('/equipment'),
  create: (data) => request('/equipment', 'POST', data),
  update: (id, data) => request(`/equipment/${id}`, 'PUT', data),
  remove: (id) => request(`/equipment/${id}`, 'DELETE'),
};

// ─── SALES ────────────────────────────────────
export const salesAPI = {
  getAll: () => request('/sales'),
  create: (data) => request('/sales', 'POST', data),
  update: (id, data) => request(`/sales/${id}`, 'PUT', data),
  remove: (id) => request(`/sales/${id}`, 'DELETE'),
};

// ─── EXPENSES ─────────────────────────────────
export const expensesAPI = {
  getAll: () => request('/expenses'),
  create: (data) => request('/expenses', 'POST', data),
  update: (id, data) => request(`/expenses/${id}`, 'PUT', data),
  remove: (id) => request(`/expenses/${id}`, 'DELETE'),
};