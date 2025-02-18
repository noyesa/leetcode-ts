import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Reverses the characters within each word in a sentence.
 * @param s - The sentence within which to reverse words.
 * @returns The input string with the words reversed.
 */
function reverseWords(s: string): string {
  const chars = Array.from(s);

  let i = 0;
  while (i < chars.length) {
    if (chars[i] === ' ') {
      ++i;
    } else {
      let j = chars.indexOf(' ', i);
      if (j === -1) {
        j = chars.length;
      }

      let k = i;
      let l = j - 1;
      while (k < l) {
        [chars[k], chars[l]] = [chars[l], chars[k]];
        k++;
        --l;
      }

      i = j;
    }
  }

  return chars.join('');
}

describe('reverseWords', () => {
  it('solves example #1', () => {
    const phrase = "Let's take LeetCode contest";
    assert.equal(reverseWords(phrase), "s'teL ekat edoCteeL tsetnoc");
  });

  it('solves example #2', () => {
    const s = 'Mr Ding';
    assert.equal(reverseWords(s), 'rM gniD');
  });
});
