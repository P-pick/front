import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const renderApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <div id="app-wrapper">
        <App />
      </div>
    </StrictMode>,
  );
};

if (KAKAO_MAP_KEY) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;
  script.async = true;

  script.onload = () => {
    window.kakao.maps.load(() => {
      renderApp();
    });
  };

  document.head.appendChild(script);
} else {
  console.error(
    'KAKAO_MAP_KEY is not defined. Please set it in your environment variables.',
  );
  renderApp();
}
