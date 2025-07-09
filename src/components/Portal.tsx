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
      `Element with id '${containerId}' not found. Please add <div id="${containerId}"></div> to your HTML.`,
    );
  }

  return createPortal(children, container);
}
