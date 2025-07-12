import { describe, expect, it } from 'vitest';
import { getNextYPosition, shouldClose } from './utils';

describe('getNextYPosition 함수 테스트', () => {
  it('80%에서 -60만큼 올리면 0%로 변경', () => {
    const result = getNextYPosition('80%', -60);
    expect(result).toBe('0%');
  });

  it('80%에서 offsetY가 -20만큼 올리면 50%로 변경', () => {
    const result = getNextYPosition('80%', -20);
    expect(result).toBe('50%');
  });

  it('80%에서 offsetY가 0이면 그대로 80% 유지', () => {
    const result = getNextYPosition('80%', 0);
    expect(result).toBe('80%');
  });

  it('50%에서 offsetY가 -20만큼 올리면 0%로 변경', () => {
    const result = getNextYPosition('50%', -20);
    expect(result).toBe('0%');
  });

  it('50%에서 offsetY가 20만큼 내리면 80%로 변경', () => {
    const result = getNextYPosition('50%', 20);
    expect(result).toBe('80%');
  });

  it('50%에서 offsetY가 0이면 그대로 50% 유지', () => {
    const result = getNextYPosition('50%', 0);
    expect(result).toBe('50%');
  });

  it('0%에서 offsetY가 60만큼 내리면 80%로 변경', () => {
    const result = getNextYPosition('0%', 60);
    expect(result).toBe('80%');
  });

  it('0%에서 offsetY가 20만큼 내리면 50%로 변경', () => {
    const result = getNextYPosition('0%', 20);
    expect(result).toBe('50%');
  });

  it('0%에서 offsetY가 5만큼 움직이면 그대로 0% 유지', () => {
    const result = getNextYPosition('0%', 5);
    expect(result).toBe('0%');
  });
});

describe('shouldClose 함수 테스트', () => {
  it('80%에서 offsetY가 20이면 true 반환', () => {
    const result = shouldClose('80%', 20);
    expect(result).toBe(true);
  });

  it('80%에서 offsetY가 5이면 false 반환', () => {
    const result = shouldClose('80%', 5);
    expect(result).toBe(false);
  });

  it('50%에서는 어떤 offsetY여도 false 반환', () => {
    expect(shouldClose('50%', 20)).toBe(false);
    expect(shouldClose('50%', -10)).toBe(false);
  });

  it('0%에서는 어떤 offsetY여도 false 반환', () => {
    expect(shouldClose('0%', 20)).toBe(false);
    expect(shouldClose('0%', -10)).toBe(false);
  });
});
