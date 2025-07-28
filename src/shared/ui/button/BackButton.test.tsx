import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { BackButton } from '@/shared';

const PreviousPage = () => <div>이전 페이지</div>;
const NextPage = () => {
  const location = useLocation();
  return (
    <div>
      <div>다음 페이지</div>
      <p>현재 경로: {location.pathname}</p>
      <BackButton />
    </div>
  );
};

describe('BackButton', () => {
  it('클릭하면 이전 페이지로 이동해야 합니다.', async () => {
    render(
      <MemoryRouter initialEntries={['/previous', '/next']}>
        <Routes>
          <Route path="/previous" element={<PreviousPage />} />
          <Route path="/next" element={<NextPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('다음 페이지')).toBeInTheDocument();
    expect(screen.getByText('현재 경로: /next')).toBeInTheDocument();

    const backButton = screen.getByRole('button');
    await userEvent.click(backButton);

    expect(screen.getByText('이전 페이지')).toBeInTheDocument();
    expect(screen.queryByText('다음 페이지')).not.toBeInTheDocument();
  });
});
