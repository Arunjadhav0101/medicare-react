import axios from 'axios';
import { Medicine, User, Order, BloodDonor, BloodRequest } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Medicine API
export const medicineAPI = {
  getAll: () => api.get<Medicine[]>('/medicines'),
  getById: (id: number) => api.get<Medicine>(`/medicines/${id}`),
  search: (query: string) => api.get<Medicine[]>(`/medicines/search?q=${query}`),
  getByCategory: (category: string) => api.get<Medicine[]>(`/medicines/category/${category}`),
  create: (medicine: Omit<Medicine, 'id'>) => api.post<Medicine>('/medicines', medicine),
  update: (id: number, medicine: Partial<Medicine>) => api.put<Medicine>(`/medicines/${id}`, medicine),
  delete: (id: number) => api.delete(`/medicines/${id}`),
};

// User API
export const userAPI = {
  login: (email: string, password: string) =>
    api.post<{ user: User; token: string }>('/users/login', { email, password }),
  register: (userData: Omit<User, 'id'> & { password: string }) =>
    api.post<{ user: User; token: string }>('/users/register', userData),
  getAll: () => api.get<User[]>('/users'),
  getProfile: () => api.get<User>('/users/profile'),
  updateProfile: (id: string, userData: Partial<User>) => api.put<User>(`/users/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addItem: (medicineId: number, quantity: number) =>
    api.post('/cart/add', { medicineId, quantity }),
  updateItem: (medicineId: number, quantity: number) =>
    api.put('/cart/update', { medicineId, quantity }),
  removeItem: (medicineId: number) => api.delete(`/cart/remove/${medicineId}`),
  clearCart: () => api.delete('/cart/clear'),
};

// Order API
export const orderAPI = {
  getOrders: () => api.get<Order[]>('/orders'),
  getOrderById: (id: number) => api.get<Order>(`/orders/${id}`),
  createOrder: (orderData: any) => api.post<Order>('/orders', orderData),
  updateOrderStatus: (id: number, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
};

// Blood Bank API
export const bloodBankAPI = {
  // Donor APIs
  registerDonor: (donorData: Omit<BloodDonor, 'id'>) =>
    api.post<BloodDonor>('/blood-bank/donors', donorData),
  getDonors: () => api.get<BloodDonor[]>('/blood-bank/donors'),
  getDonorById: (id: number) => api.get<BloodDonor>(`/blood-bank/donors/${id}`),

  // Blood Request APIs
  createBloodRequest: (requestData: Omit<BloodRequest, 'id'>) =>
    api.post<BloodRequest>('/blood-bank/requests', requestData),
  getBloodRequests: () => api.get<BloodRequest[]>('/blood-bank/requests'),
  updateRequestStatus: (id: number, status: string) =>
    api.put(`/blood-bank/requests/${id}/status`, { status }),

  // Inventory APIs
  getInventory: () => api.get('/blood-bank/inventory'),
  updateInventory: (bloodGroup: string, units: number) =>
    api.put('/blood-bank/inventory', { bloodGroup, units }),
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (message: string, context?: any) =>
    api.post('/chatbot/message', { message, context }),
  getRecommendations: (symptoms: string[]) =>
    api.post('/chatbot/recommendations', { symptoms }),
};

export default api;
