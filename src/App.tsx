import { MetadataProvider, QueryProvider } from '@/app/';
import { Router } from '@/app/';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <MetadataProvider>
        <QueryProvider>
          <Router />
        </QueryProvider>
      </MetadataProvider>
    </HelmetProvider>
  );
}
