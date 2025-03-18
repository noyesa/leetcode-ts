import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Find the largest unique number.
 * @param nums - The numbers within which to find the largest unique number.
 * @returns The largest number within the input array.
 */
function largestUniqueNumber(nums: number[]): number {
  const seen = new Set<number>();
  const unique = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) {
      continue;
    }

    if (unique.delete(num)) {
      seen.add(num);
    } else {
      unique.add(num);
    }
  }

  const largest = Array.from(unique).reduce(
    (largest, num) => Math.max(largest, num),
    -Infinity,
  );
  return Number.isFinite(largest) ? largest : -1;
}

describe('largestUniqueNumber', () => {
  it('solves example #1', () => {
    const nums = [5, 7, 3, 9, 4, 9, 8, 3, 1];
    assert.deepEqual(largestUniqueNumber(nums), 8);
  });

  it('solves example #2', () => {
    const nums = [9, 9, 8, 8];
    assert.deepEqual(largestUniqueNumber(nums), -1);
  });
});
