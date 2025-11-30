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
  if (!onClick) {
    return (
      <header className={className}>
        <BackButton />
        {children}
        <span></span>
      </header>
    );
  }

  return (
    <header className={className}>
      <span></span>
      {children}
      <MenuIcon onClick={onClick} />
    </header>
  );
}
