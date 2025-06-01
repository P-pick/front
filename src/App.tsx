import QueryProvider from '@/components/QueryProvider';
import Router from '@/components/Router';

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
