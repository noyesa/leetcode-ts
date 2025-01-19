import { describe, it } from 'node:test';
import assert from 'node:assert';
import almostEqual from 'almost-equal';

/**
 * Finds the maximum average of any subsequence of length k.
 * @param nums - Sequence within which to find max average subarray
 * @param k - The length of the subarrays.
 * @returns The maximum average of any subarray in the array
 */
function findMaxAverage(nums: number[], k: number): number {
  // Initialize the sliding window.
  let runningSum = 0;
  let end = 0;
  while (end < k) {
    runningSum += nums[end++];
  }

  let maxAverage = runningSum / k;

  // Move the sliding window.
  let start = 0;
  while (end < nums.length) {
    runningSum += nums[end++] - nums[start++];
    maxAverage = Math.max(maxAverage, runningSum / k);
  }

  return maxAverage;
}

describe('findMaxAverage', () => {
  it('solves example #1', () => {
    const nums = [1, 12, -5, -6, 50, 3];
    assert.equal(almostEqual(findMaxAverage(nums, 4), 12.75), true);
  });

  it('solves example #2', () => {
    const nums = [5];
    assert.equal(almostEqual(findMaxAverage(nums, 1), 5.0), true);
  });
});
