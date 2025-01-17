import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Reverses a string, represented as an array of characters, in place, using
 * O(1) space complexity.
 * @param s - The string represented as an array of characters
 */
function reverseString(s: string[]): void {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    // Swap the values.
    [s[left], s[right]] = [s[right], s[left]];
    ++left;
    --right;
  }
}

describe('reverseString', () => {
  it('solves example #1', () => {
    const input = Array.from('hello');
    reverseString(input);
    assert.deepEqual(input, Array.from('olleh'));
  });

  it('solves example #2', () => {
    const input = Array.from('Hannah');
    reverseString(input);
    assert.deepEqual(input, Array.from('hannaH'));
  });
});
