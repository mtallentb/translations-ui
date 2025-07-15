import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

// Mock timers for testing
jest.useFakeTimers();

describe('useDebounce Hook', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe('updated');
  });

  it('should reset timeout on multiple rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // Make multiple rapid changes
    rerender({ value: 'change1', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: 'change2', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    rerender({ value: 'final', delay: 500 });

    // Value should still be initial because timeout keeps resetting
    expect(result.current).toBe('initial');

    // Complete the final timeout
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now should have the final value
    expect(result.current).toBe('final');
  });

  it('should handle different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      }
    );

    rerender({ value: 'updated', delay: 1000 });

    // Should not update after 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    // Should update after full 1000ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('updated');
  });

  it('should clean up timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { unmount } = renderHook(() => useDebounce('test', 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
