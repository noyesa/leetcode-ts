import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Creates an array ranging from 0 through length - 1.
 * @param length - The length of the range.
 */
const range = (length: number): number[] =>
  Array.from({ length }, (_, i: number) => i);

/**
 * Gets the char code of a single character.
 * @param char - The character to get the char code for.
 * @returns The character code for the char.
 */
const charCode = (char: string): number => char.charCodeAt(0);

describe('charCode', () => {
  it('gets the char code of the given character', () => {
    assert.equal(charCode('a'), 97);
    assert.equal(charCode('z'), 122);

    // You can pass in longer strings, but chars beyond the first are ignored.
    assert.equal(charCode('andrew'), 97);
  });
});

/**
 * Generates a string consisting of every character in the alphabet.
 * @param [isUpperCase=false] Should output characters be uppercase?
 */
const getAlphabetString = (isUpperCase: boolean = false): string => {
  const aCode = charCode(isUpperCase ? 'A' : 'a');
  return range(26)
    .map((_, i) => String.fromCharCode(aCode + i))
    .join('');
};

describe('getAlphabetString', () => {
  it('generates the alphabet (lowercase)', () => {
    assert.equal(getAlphabetString(), 'abcdefghijklmnopqrstuvwxyz');
  });

  it('generates the alphabet (uppercase)', () => {
    assert.equal(getAlphabetString(true), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  });
});

/**
 * Generats a string containing all alpha characters, lower and uppercase.
 * @returns A string containing all alpha characters.
 */
const getAllAlphaChars = (): string =>
  `${getAlphabetString(false)}${getAlphabetString(true)}`;

describe('getAllAlphaChars', () => {
  it('generates a string with lower and upper alpha characters', () => {
    assert.equal(
      getAllAlphaChars(),
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    );
  });
});

/**
 * Determines whether a character is an alpha character.
 * @param char - The character
 * @returns Is the character an alpha character?
 */
const isAlpha = (char: string): boolean => /[a-z]/i.test(char);

describe('isAlpha', () => {
  it('returns true for alpha characters', () => {
    for (const alpha of getAllAlphaChars()) {
      assert.ok(isAlpha(alpha));
    }
  });

  it('returns false for non-alpha characters', () => {
    assert.equal(isAlpha('|'), false);
    assert.equal(isAlpha('$'), false);
  });
});

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
    while (!isAlpha(chars[left])) {
      ++left;
    }

    while (!isAlpha(chars[right])) {
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
