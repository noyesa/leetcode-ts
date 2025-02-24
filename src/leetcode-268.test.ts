import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Given an array nums containing n disting numbers in the range [0, n],
 * return the only number in the range this is missing from the array.
 * @param nums - Numbers to search for missing value.
 * @returns The number missing from the array.
 */
function missingNumber(nums: number[]): number {
  const values = new Set(nums);
  for (let i = 0; i <= nums.length; ++i) {
    if (!values.has(i)) {
      return i;
    }
  }
  return -1;
}

describe('missingNumber', () => {
  it('solves example #1', () => {
    const nums = [3, 0, 1];
    assert.equal(missingNumber(nums), 2);
  });

  it('solves example #2', () => {
    const nums = [0, 1];
    assert.equal(missingNumber(nums), 2);
  });

  it('solves example #3', () => {
    const nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
    assert.equal(missingNumber(nums), 8);
  });
});
