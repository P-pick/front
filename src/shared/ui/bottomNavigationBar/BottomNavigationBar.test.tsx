import { BottomNavigationBar } from '@/shared/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
const TestComponent = () => {
  return (
    <MemoryRouter initialEntries={['/tour/list?distance=10000&tour-type=15']}>
      <BottomNavigationBar />
    </MemoryRouter>
  );
};
describe('BottomNavigationBar 컴포넌트', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('모든 아이콘이 렌더링되어야 한다', () => {
    render(<TestComponent />);

    const icons = screen.getAllByRole('button');
    expect(icons).toHaveLength(4);
  });
  it('home 아이콘 클릭 시 tour/geo-trip 경로로 이동한다', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const homeButton = screen.getByRole('button', {
      name: 'home Icon',
    });

    await user.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining('/tour/geo-trip'),
      { replace: true },
    );
  });
  it('list 아이콘 클릭 시 tour/list 경로로 이동한다', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const listButton = screen.getByRole('button', {
      name: 'list Icon',
    });

    await user.click(listButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining('/tour/list'),
      { replace: true },
    );
  });
  it('bookmark 아이콘 클릭 시 /bookmark 경로로 이동한다', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const bookmarkButton = screen.getByRole('button', {
      name: 'bookmark Icon',
    });

    await user.click(bookmarkButton);

    expect(mockNavigate).toHaveBeenCalledWith('/bookmark', { replace: true });
  });
  it('profile 아이콘 클릭 시 /profile 경로로 이동한다', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const profileButton = screen.getByRole('button', {
      name: 'profile Icon',
    });

    await user.click(profileButton);

    expect(mockNavigate).toHaveBeenCalledWith('/profile', { replace: true });
  });
});
