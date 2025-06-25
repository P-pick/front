import { MenuIcon, BackButton } from '@/components/';
import type { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="w-full absolute flex items-center justify-between top-4 px-5 z-(--z-layer5)">
      <BackButton />
      {children}
      <MenuIcon />
    </header>
  );
}
