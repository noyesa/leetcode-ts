import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Computes the average of the range of size 2 * k + 1, centered on each index.
 * If either the left or right side of the window are within the array bounds,
 * the average centered on that location is -1.
 * @param nums - The numbers to range over and compute window averages.
 * @param k - The distance from each index to find left and right.
 * @returns Averages of the window ranging k elements around i for each i in nums
 */
function getAverages(nums: number[], k: number): number[] {
  const size = 2 * k + 1;
  let sum = nums.slice(0, size).reduce((total, x) => total + x, 0);
  const averages = new Array(nums.length).fill(-1);
  for (let right = size - 1; right < nums.length; ++right) {
    const i = right - k;
    averages[i] = Math.floor(sum / size);
    sum += nums[right + 1] - nums[i - k];
  }
  return averages;
}

describe('getAverages', () => {
  it('solves example #1', () => {
    const nums = [7, 4, 3, 9, 1, 8, 5, 2, 6];
    assert.deepEqual(getAverages(nums, 3), [-1, -1, -1, 5, 4, 4, -1, -1, -1]);
  });

  it('solves example #2', () => {
    const nums = [100000];
    assert.deepEqual(getAverages(nums, 0), [100000]);
  });

  it('solves examples #3', () => {
    const nums = [8];
    assert.deepEqual(getAverages(nums, 100000), [-1]);
  });
});
