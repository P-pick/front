import type { FallbackProps } from 'react-error-boundary';

import { NetworkError, UnknownError } from '@/shared';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (error.message === 'timeout of 5000ms exceeded') {
    return <UnknownError onClickRetry={resetErrorBoundary} />;
  }

  return <NetworkError onClickRetry={resetErrorBoundary} />;
}
