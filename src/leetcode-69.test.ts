import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Find the nearest integer square root of a number. Returns the floor of the
 * actual square root.
 * @param x - The number to find the square root of.
 * @returns The square root of X rounded down to the nearest integer
 */
function mySqrt(x: number): number {
  let bestGuess = NaN;
  let left = 0;
  let right = Math.ceil(x / 2);
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (mid * mid <= x) {
      // Each successive guess that passes the predicate is larger than the
      // last and is therefore closer to the correct answer.
      bestGuess = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return bestGuess;
}

describe('mySqrt', () => {
  it('solves example #1', () => {
    assert.equal(mySqrt(4), 2);
  });

  it('solves example #2', () => {
    assert.equal(mySqrt(8), 2);
  });

  it('handles 0', () => {
    assert.equal(mySqrt(0), 0);
  });
});
