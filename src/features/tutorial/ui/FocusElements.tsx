import { Portal } from '@/shared';

interface FocusElementsProps {
  rect: DOMRect | null;
}

export default function FocusElements({ rect }: FocusElementsProps) {
  const clipPath = rect
    ? {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        top: `${rect.top}px`,
        left: `${rect.left}px`,
      }
    : undefined;

  return (
    <Portal containerId="tutorial-root">
      <div className="fixed left-0 top-0 bottom-0 right-0 mix-blend-hard-light bg-black/50 z-(--z-layer1000)">
        <div className="absolute bg-white/50" style={clipPath} />
      </div>
    </Portal>
  );
}
