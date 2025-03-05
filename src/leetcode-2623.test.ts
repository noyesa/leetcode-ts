import { describe, it, mock } from 'node:test';
import assert from 'assert';

interface Fn {
  (...params: number[]): number;
}

/**
 * Memoizes a function that accepts numbers as parameters.
 * @param fn - The function to memoize.
 * @returns The memoized function.
 */
function memoize(fn: Fn): Fn {
  const cache: Map<string, number> = new Map();
  return (...params: number[]): number => {
    const paramsString = params.join(',');

    // If we have a cached result, use that.
    if (cache.has(paramsString)) {
      return cache.get(paramsString) as number;
    }

    // Otherwise, compute the result.
    const result = fn(...params);
    cache.set(paramsString, result);
    return result;
  };
}

describe('memoize', () => {
  it('solves example #1', () => {
    const spy = mock.fn((a, b) => a + b);
    const memoizedSum = memoize(spy);
    memoizedSum(2, 2);
    memoizedSum(2, 2);
    assert.equal(spy.mock.callCount(), 1);
    memoizedSum(1, 2);
    assert.equal(spy.mock.callCount(), 2);
  });

  it('solves example #2', () => {
    const factorial = (n: number): number =>
      n <= 1 ? 1 : n * factorial(n - 1);
    const spy = mock.fn(factorial);
    const memoizedFactorial = memoize(spy);
    memoizedFactorial(2);
    memoizedFactorial(3);
    memoizedFactorial(2);
    assert.equal(spy.mock.callCount(), 2);
    memoizedFactorial(3);
    assert.equal(spy.mock.callCount(), 2);
  });
});
