import { BackButton, MenuIcon } from '@/shared';
import type { PropsWithChildren } from 'react';

export default function Header({
  children,
  className,
  onClick,
}: PropsWithChildren<{
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}>) {
  return (
    <header className={className}>
      <BackButton />
      {children}
      <MenuIcon onClick={onClick} />
    </header>
  );
}
