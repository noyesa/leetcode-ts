import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Computes an array where each index is the running sum in the input array.
 */
function runningSum(nums: number[]): number[] {
  let sum = 0;
  return nums.map((x) => (sum += x));
}

describe('runningSum', () => {
  it('solves example #1', () => {
    const nums = [1, 2, 3, 4];
    assert.deepEqual(runningSum(nums), [1, 3, 6, 10]);
  });

  it('solves example #2', () => {
    const nums = [1, 1, 1, 1, 1];
    assert.deepEqual(runningSum(nums), [1, 2, 3, 4, 5]);
  });

  it('solves example #3', () => {
    const nums = [3, 1, 2, 10, 1];
    assert.deepEqual(runningSum(nums), [3, 4, 6, 16, 17]);
  });
});
