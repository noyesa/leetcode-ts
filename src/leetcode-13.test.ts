import { describe, it } from 'node:test';
import assert from 'node:assert';

const romanMap = new Map([
  ['I', 1],
  ['IV', 4],
  ['V', 5],
  ['IX', 9],
  ['X', 10],
  ['XL', 40],
  ['L', 50],
  ['XC', 90],
  ['C', 100],
  ['CD', 400],
  ['D', 500],
  ['CM', 900],
  ['M', 1000],
]);

const prefixes = new Map([
  ['I', new Set(['V', 'X'])],
  ['X', new Set(['L', 'C'])],
  ['C', new Set(['D', 'M'])],
]);

/**
 * Converts a roman numeral to an integer by looping through each character in
 * the string and summing the values of each roman numeral.
 * @param s - The string to loop.
 * @returns The integer value of the roman numeral.
 */
function romanToIntIterative(s: string): number {
  let sum = 0;
  for (let i = 0; i < s.length; ++i) {
    let numeral = s.charAt(i);
    if (prefixes.has(numeral) && i + 1 < s.length) {
      const nextChar = s.charAt(i + 1);
      if (prefixes.get(numeral)?.has(nextChar)) {
        numeral += nextChar;
        i += 1;
      }
    }
    sum += romanMap.get(numeral) ?? 0;
  }
  return sum;
}

/**
 * Converts a roman numeral to an integer by looping through each character in
 * the string and summing the values of each roman numeral.
 * @param s - The string to loop.
 * @returns The integer value of the roman numeral.
 */
function romanToIntRegExp(s: string): number {
  let sum = 0;
  for (const [value] of s.matchAll(/C?[MD]|X?[CL]|I?[XV]|I/g)) {
    sum += romanMap.get(value) ?? 0;
  }
  return sum;
}

function testRomanToInt(romanToIntImpl: (s: string) => number) {
  describe(romanToIntImpl.name, () => {
    it('solves example #1', () => {
      const s = 'III';
      assert.equal(romanToIntImpl(s), 3);
    });

    it('solves example #2', () => {
      const s = 'LVIII';
      assert.equal(romanToIntImpl(s), 58);
    });

    it('solves example #3', () => {
      const s = 'MCMXCIV';
      assert.equal(romanToIntImpl(s), 1994);
    });
  });
}

testRomanToInt(romanToIntRegExp);
testRomanToInt(romanToIntIterative);
