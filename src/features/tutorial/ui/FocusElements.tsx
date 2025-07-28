import { commonSVG } from '@/assets';

import { useLayoutRect } from '@/features/tutorial';
import { Portal } from '@/shared';

import type { TutorialStep } from '@/features/tutorial';

export default function FocusElements({ id }: Pick<TutorialStep, 'id'>) {
  const rect = useLayoutRect(id);

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
        {id === 'shortform-slide-tutorial' && (
          // 아래로 향하는 화살표 아이콘
          <div className="fixed top-3/5 left-1/2 -translate-x-1/2 z-(--z-layer1000)">
            <commonSVG.DownArrowIcon
              id="shortform-slide-tutorial"
              className=" animate-bounce fill-white"
            />
          </div>
        )}
      </div>
    </Portal>
  );
}
