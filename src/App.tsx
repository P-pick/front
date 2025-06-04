import QueryProvider from '@/config/QueryProvider';
import Router from '@/config/Router';

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
