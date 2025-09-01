import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('variant에 따른 스타일이 적용됩니다.', () => {
    render(
      <Button variant="primary">
        <div>Primary Button</div>
      </Button>,
    );

    const primaryButton = screen.getByText('Primary Button');
    expect(primaryButton).toBeInTheDocument();

    render(
      <Button variant="secondary">
        <div>Secondary Button</div>
      </Button>,
    );

    const secondaryButton = screen.getByText('Secondary Button');
    expect(secondaryButton).toBeInTheDocument();

    render(
      <Button variant="danger">
        <div>Danger Button</div>
      </Button>,
    );

    const dangerButton = screen.getByText('Danger Button');
    expect(dangerButton).toBeInTheDocument();
  });
});
