import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Finds the longest subarray that contains an equal number of 0s and 1s.
 * @param nums - The array of 0s and 1s.
 * @returns The length of the longest subarray with matches 0s and 1s.
 */
function findMaxLength(nums: number[]): number {
  let sum = 0;
  let max = -Infinity;
  const seen = new Map();
  for (let i = 0; i < nums.length; ++i) {
    sum += nums[i] === 0 ? -1 : 1;
    if (sum === 0) {
      max = Math.max(max, i + 1);
    } else if (seen.has(sum)) {
      const j = seen.get(sum) as number;
      max = Math.max(i - j);
    } else {
      seen.set(sum, i);
    }
  }
  return Number.isFinite(max) ? max : -1;
}

describe('findMaxLength', () => {
  it('solves example #1', () => {
    const nums = [0, 1];
    assert.equal(findMaxLength(nums), 2);
  });

  it('solves example #2', () => {
    const num = [0, 1, 0];
    assert.equal(findMaxLength(num), 2);
  });

  it('solves example #3', () => {
    const num = [0, 1, 1, 1, 1, 1, 0, 0, 0];
    assert.equal(findMaxLength(num), 6);
  });
});
