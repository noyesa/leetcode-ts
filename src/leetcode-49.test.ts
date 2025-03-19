import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Gets an array associated with a key from a map, creating it if it doesn't
 * exist.
 * @param map - The map to get sets from.
 * @param key - The key of the set within the map.
 * @returns The set associated with key.
 */
const getOrCreateArray = (
  map: Map<string, string[]>,
  key: string,
): string[] => {
  let array = map.get(key);
  if (!array) {
    array = [];
    map.set(key, array);
  }
  return array;
};

/**
 * Groups all strings in an array that are anagrams of each other.
 * @param strs - List of strings that might be anagrams of each other.
 * @returns Array of groups, represented as arrays, of anagrams.
 */
const groupAnagrams = (strs: string[]): string[][] => {
  const groups = new Map<string, string[]>();
  for (const str of strs) {
    // Sort the string lexicographically to match it with its anagram group.
    const sortedStr = Array.from(str).sort().join('');
    getOrCreateArray(groups, sortedStr).push(str);
  }
  return Array.from(groups.values());
};

/**
 * Counts the number of occurences of a string in an array.
 * @param strs - Strings to count occurrences of.
 * @returns Map of the counts of each string.
 */
const count = (strs: string[]): Map<string, number> => {
  const map = new Map<string, number>();
  for (const str of strs) {
    map.set(str, (map.get(str) ?? 0) + 1);
  }
  return map;
};

/**
 * Compares two arrays to determine whether they contain exactly the same
 * values, in any order.
 * @param first - The first array.
 * @param second - The second array.
 * @returns Are the array values all equal?
 */
const areArrayValuesEqual = (first: string[], second: string[]): boolean => {
  if (first.length !== second.length) {
    return false;
  }
  const firstCounts = count(first);
  const secondCounts = count(second);
  if (firstCounts.size !== secondCounts.size) {
    return false;
  }
  for (const [str, expectedCount] of firstCounts) {
    if (expectedCount !== secondCounts.get(str)) {
      return false;
    }
  }
  return true;
};

/**
 * Compares two 2D arrays to see if every array in one appears in another, in
 * any order.
 */
const are2DArrayValuesEqual = (
  first: string[][],
  second: string[][],
): boolean =>
  first.length === second.length &&
  first.every((firstGroup) =>
    second.some((secondGroup) => areArrayValuesEqual(firstGroup, secondGroup)),
  );

describe('groupAnagrams', () => {
  it('solves example #1', () => {
    const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const result = groupAnagrams(strs);
    const expected = [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']];

    assert.ok(are2DArrayValuesEqual(result, expected));
  });

  it('solves example #2', () => {
    const strs = [''];
    assert.ok(are2DArrayValuesEqual(groupAnagrams(strs), [['']]));
  });

  it('solves example #3', () => {
    const strs = ['a'];
    assert.ok(are2DArrayValuesEqual(groupAnagrams(strs), [['a']]));
  });

  it('solves example #4', () => {
    const strs = ['', ''];
    assert.ok(are2DArrayValuesEqual(groupAnagrams(strs), [['', '']]));
  });
});
