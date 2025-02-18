import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Reverses only the letters in the array.
 * @param s - The string within which to reverse letters.
 * @returns A string where the english letters are swapped.
 */
function reverseOnlyLetters(s: string): string {
  const chars = Array.from(s);
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    while (!/[a-z]/i.test(chars[left])) {
      ++left;
    }

    while (!/[a-z]/i.test(chars[right])) {
      --right;
    }

    [chars[left], chars[right]] = [chars[right], chars[left]];
    ++left;
    --right;
  }

  return chars.join('');
}

describe('reverseOnlyLetters', () => {
  it('solves examples #1', () => {
    assert.equal(reverseOnlyLetters('ab-cd'), 'dc-ba');
  });

  it('solves example #2', () => {
    assert.equal(reverseOnlyLetters('a-bC-dEf-ghIj'), 'j-Ih-gfE-dCba');
  });

  it('solves example #3', () => {
    assert.equal(
      reverseOnlyLetters('Test1ng-Leet=code-Q!'),
      'Qedo1ct-eeLg=ntse-T!',
    );
  });
});
