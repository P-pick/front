import QueryProvider from '@/app/QueryProvider';
import Router from '@/app/Router';

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
