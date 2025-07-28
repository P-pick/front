import { BackButton, MenuIcon } from '@/shared';
import type { PropsWithChildren } from 'react';

export default function Header({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <header className={className}>
      <BackButton />
      {children}
      <MenuIcon />
    </header>
  );
}
