import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { Portal } from '@/shared';

beforeEach(() => {
  const root = document.createElement('div');
  root.id = 'test-portal';
  document.body.appendChild(root);
});

afterEach(() => {
  const portal = document.getElementById('test-portal');
  if (portal) {
    document.body.removeChild(portal);
  }
});

const PortalTestComponent = ({ id }: { id: string }) => {
  return (
    <Portal containerId={id}>
      <h1>Portal Test</h1>
      <div>Test Content</div>
    </Portal>
  );
};

describe('Portal Component Test', () => {
  it('root경로에 id가 존재한다면 렌더링 합니다.', () => {
    const { getByText } = render(<PortalTestComponent id="test-portal" />);
    expect(getByText('Portal Test')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('root경로에 id가 존재하지 않는다면 에러를 발생시킵니다.', () => {
    expect(() => {
      render(<PortalTestComponent id="non-existent-portal" />);
    }).toThrow(
      'non-existent-portal라는 id를 가진 요소가 존재하지 않습니다. HTML에 <div id="non-existent-portal"></div>를 추가해주세요.',
    );
  });
});
