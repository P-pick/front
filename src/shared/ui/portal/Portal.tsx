import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  containerId: string;
}

export default function Portal({ children, containerId }: PortalProps) {
  const container = document.getElementById(containerId);

  if (!container) {
    throw new Error(
      `${containerId}라는 id를 가진 요소가 존재하지 않습니다. HTML에 <div id="${containerId}"></div>를 추가해주세요.`,
    );
  }

  return createPortal(children, container);
}
