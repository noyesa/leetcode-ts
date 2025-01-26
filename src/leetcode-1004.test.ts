import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given a binary array (all values 0 or 1), and an integer k, return the
 * maximum number of consecutive 1s you encounter, where you can flip at most
 * k 0s.
 * @param nums - The binary array.
 * @param k The number of 0s that can be flipped to make 1s continuous.
 * @returns The number of continuous 1s.
 */
function longestOnes(nums: number[], k: number): number {
  let start = 0;
  let skips = 0;
  let longest = -Infinity;
  for (let end = 0; end < nums.length; ++end) {
    if (nums[end] === 0) {
      while (skips === k) {
        if (nums[start++] === 0) {
          --skips;
        }
      }
      ++skips;
    }

    longest = Math.max(longest, end - start + 1);
  }
  return longest;
}

describe('longestOnes', () => {
  it('solves example #1', () => {
    const nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
    assert.equal(longestOnes(nums, 2), 6);
  });

  it('solves example #2', () => {
    const nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1];
    assert.equal(longestOnes(nums, 3), 10);
  });
});
