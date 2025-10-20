import axios from 'axios';

const isLocal = import.meta.env.DEV;

/**
 * TourAPI 요청을 위한 Axios 인스턴스
 */
export const tourApi = axios.create({
  baseURL: import.meta.env.VITE_TOUR_BASE_URL,
  params: {
    MobileOS: 'WEB',
    MobileApp: 'p_pick',
    serviceKey: import.meta.env.VITE_TOUR_SERVICE_KEY,
    _type: 'json',
  },
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
  timeout: 5000,
});

/**
 * TMAP API 요청을 위한 Axios 인스턴스
 */
export const tmapApi = axios.create({
  baseURL: isLocal ? '/path/navigation' : 'https://apis.openapi.sk.com',
  params: {
    version: '1',
    callback: 'function',
  },
  headers: {
    appKey: import.meta.env.VITE_TMAP_APP_KEY,
  },
  timeout: 5000,
});
