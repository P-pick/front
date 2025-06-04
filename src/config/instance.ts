import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  params: {
    MobileOS: 'WEB',
    MobileApp: 'p_pick',
    serviceKey: import.meta.env.VITE_TOUR_SERVICE_KEY,
    _type: 'json',
  },
});

export default api;
