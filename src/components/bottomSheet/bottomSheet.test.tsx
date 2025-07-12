import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BottomSheet } from './index';
beforeEach(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'bottomsheet-root');
  document.body.appendChild(root);
});

afterEach(() => {
  const root = document.getElementById('bottomsheet-root');
  if (root) {
    document.body.removeChild(root);
  }
});

describe('BottomSheet 컴포넌트 랜더링 테스트', () => {
  it('isOpen이 true이면 children이 보여야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>바텀시트 내용</div>
      </BottomSheet>,
    );

    expect(screen.getByText('바텀시트 내용')).toBeInTheDocument();
  });

  it('isOpen이 false이면 children이 보이지 않아야 한다', () => {
    render(
      <BottomSheet isOpen={false} onClose={() => {}}>
        <div>바텀시트 내용</div>
      </BottomSheet>,
    );

    expect(screen.queryByText('바텀시트 내용')).not.toBeInTheDocument();
  });

  it('오버레이 클릭 시 onClose가 호출된다', async () => {
    const onCloseMock = vi.fn();

    render(
      <BottomSheet isOpen={true} onClose={onCloseMock} showOverlay={true}>
        <div>테스트</div>
      </BottomSheet>,
    );

    const overlay = screen.getByTestId('bottomsheet-overlay');
    await userEvent.click(overlay);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('헤더 영역 렌더링 여부 확인', () => {
    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>내용</div>
      </BottomSheet>,
    );

    const bar = screen.getByTestId('bottomsheet-header');
    expect(bar).toBeInTheDocument();
  });
});
