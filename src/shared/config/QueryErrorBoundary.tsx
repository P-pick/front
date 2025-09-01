import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/shared';

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
}

export default function QueryErrorBoundary({
  children,
}: QueryErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
