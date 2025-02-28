import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Gets the prefix of an array of numbers. A prefix is an array where each
 * index represents the running sum of the source array at that index.
 * @params nums - Numbers for which to compute prefix.
 * @returns Prefix array.
 */
function getArrayPrefix(nums: number[]): number[] {
  if (nums.length === 0) {
    return [];
  }

  const prefix = [nums[0]];
  for (let i = 1; i < nums.length; ++i) {
    prefix.push(nums[i] + prefix[i - 1]);
  }
  return prefix;
}

describe('getArrayPrefix', () => {
  it('computes the prefix for an array', () => {
    const nums = [1, 3, 5, 7];
    assert.deepEqual(getArrayPrefix(nums), [1, 4, 9, 16]);
  });

  it('computes the prefix for a different array', () => {
    const nums = [5, -1, 32, -10];
    assert.deepEqual(getArrayPrefix(nums), [5, 4, 36, 26]);
  });
});

/**
 * Computes the sum of a range in a prefix array.
 * @param prefix - The prefix array.
 * @param start - The start index of the range.
 * @param [end=0] - The end index of the range.
 * @returns The sum of the range.
 */
function getPrefixRangeSum(
  prefix: number[],
  start: number,
  end: number = prefix.length - 1,
): number {
  if (start > 0) {
    return prefix[end] - prefix[start - 1];
  }
  return prefix[end];
}

describe('getPrefixRangeSum', () => {
  it('gets the sum of a range from an index to the end with only a start', () => {
    const nums = [1, 3, 5, 7];
    // prefix = [1, 4, 9, 16]
    const prefix = getArrayPrefix(nums);
    assert.equal(getPrefixRangeSum(prefix, 0), 16);
    assert.equal(getPrefixRangeSum(prefix, 1), 15);
  });

  it('gets the sum of a subarray with a start and end', () => {
    // prefix = [1, 4, 9, 16]
    const nums = [1, 3, 5, 7];
    const prefix = getArrayPrefix(nums);
    assert.equal(getPrefixRangeSum(prefix, 1, 2), 8);
  });
});

/**
 * nums contains a valid split at index i if the following are true:
 *   - The sum of the first i + 1 elements is great than or equal to the sum
 *     of the last n - i - 1 elements.
 *   - There is at least one element to the right of i, so 0 <= i < n - 1.
 * @param nums - The array to find splits in.
 * @returns The number of the splits in the array.
 */
function waysToSplitArray(nums: number[]): number {
  const prefix = getArrayPrefix(nums);
  let splits = 0;
  for (let i = 0; i < nums.length - 1; ++i) {
    const left = getPrefixRangeSum(prefix, 0, i);
    const right = getPrefixRangeSum(prefix, i + 1, nums.length - 1);
    if (left >= right) {
      ++splits;
    }
  }
  return splits;
}

describe('waysToSplitArray', () => {
  it('solves example #1', () => {
    const nums = [10, 4, -8, 7];
    assert.equal(waysToSplitArray(nums), 2);
  });

  it('solves example #2', () => {
    const nums = [2, 3, 1, 0];
    assert.equal(waysToSplitArray(nums), 2);
  });
});

/**
 * Second algorithm for finding splits in array.
 * @param nums - Array of numbers to find splits in.
 * @returns Number of splits in the input nums
 */
function waysToSplitArray2(nums: number[]): number {
  let splits = 0;
  let left = 0;
  let right = nums.reduce((sum, x) => sum + x, 0);
  for (let i = 0; i < nums.length - 1; ++i) {
    left += nums[i];
    right -= nums[i];

    if (left >= right) {
      ++splits;
    }
  }

  return splits;
}

describe('waysToSplitArray2', () => {
  it('solves example #1', () => {
    const nums = [10, 4, -8, 7];
    assert.equal(waysToSplitArray2(nums), 2);
  });

  it('solves example #2', () => {
    const nums = [2, 3, 1, 0];
    assert.equal(waysToSplitArray2(nums), 2);
  });
});
