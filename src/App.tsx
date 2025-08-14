import { QueryProvider } from '@/app/';
import { Router } from '@/app/';

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
