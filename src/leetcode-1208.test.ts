import { describe, it, run } from 'node:test';
import assert from 'node:assert';

/**
 * Finds the longest substring of t that can be mutated into the same
 * substring within s within the budget of maxCost.
 * @param s - The string to transform substrings of t into
 * @param t - The string to find substrings to transform
 * @param maxCost - The maximum cost of the transformation.
 * @returns The max length of a substring that can be transformed.
 */
function equalSubstring(s: string, t: string, maxCost: number): number {
  const costs = new Array(s.length);
  let runningCost = 0;
  let start = 0;
  let maxLen = 0;
  for (let end = 0; end < s.length; ++end) {
    costs[end] = Math.abs(s.charCodeAt(end) - t.charCodeAt(end));
    runningCost += costs[end];
    while (runningCost > maxCost) {
      runningCost -= costs[start++];
    }
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}

describe('equalSubstring', () => {
  it('solves example #1', () => {
    const s = 'abcd';
    const t = 'bcdf';
    const maxCost = 3;
    assert.equal(equalSubstring(s, t, maxCost), 3);
  });

  it('solves example #2', () => {
    const s = 'abcd';
    const t = 'cdef';
    const maxCost = 3;
    assert.equal(equalSubstring(s, t, maxCost), 1);
  });

  it('solves example #3', () => {
    const s = 'abcd';
    const t = 'acde';
    const maxCost = 0;
    assert.equal(equalSubstring(s, t, maxCost), 1);
  });
});
