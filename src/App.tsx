import { QueryProvider } from '@/app/';
import { Router } from '@/app/';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryProvider>
  );
}
