import { describe, it } from 'node:test';
import assert from 'assert';

/**
 * Response from a guess checker indicating whether the guess was lower than,
 * equal to, or higher than the target.
 */
enum HighOrLow {
  Low = -1,
  Equal,
  High,
}

interface GuessChecker {
  (guess: number): HighOrLow;
}

/**
 * Returns a function that checks its argument to see if the arg is higher,
 * lower than, or equal to the target.
 * @param target - The target number for which to return Equal.
 * @returns Whether the guess was lower, equal to, or higher than the target.
 */
function makeGuessChecker(target: number): GuessChecker {
  return (guess: number): HighOrLow => {
    if (guess < target) {
      return HighOrLow.Low;
    }

    if (guess === target) {
      return HighOrLow.Equal;
    }

    return HighOrLow.High;
  };
}

describe('guessMaker', () => {
  it('returns Low if the guess was below the target', () => {
    const checker = makeGuessChecker(5);
    assert.equal(checker(4), HighOrLow.Low);
  });

  it('returns High if the guess was above the target', () => {
    const checker = makeGuessChecker(5);
    assert.equal(checker(6), HighOrLow.High);
  });

  it('returns Equal if the guess matches the target', () => {
    const checker = makeGuessChecker(5);
    assert.equal(checker(5), HighOrLow.Equal);
  });
});

/**
 * Accepts a number n that represents the upper bound of the search space
 * within the range of integers from [0, Infinity).
 * @param n - The upper bound of the range to search.
 * @param checker - The function that will tell whether each successive guess
 *    is higher or lower than the target.
 */
function guessNumber(n: number, checker: GuessChecker): number {
  let left = 0;
  let right = n;
  while (left <= right) {
    const guess = left + Math.floor((right - left) / 2);
    const result = checker(guess);
    if (result === HighOrLow.Equal) {
      return guess;
    }

    if (result === HighOrLow.Low) {
      left = guess + 1;
    } else {
      right = guess - 1;
    }
  }

  // This should only be reached if the target was outside the range of [0, n].
  return NaN;
}

describe('guessNumber', () => {
  it('solves example #1', () => {
    assert.equal(guessNumber(10, makeGuessChecker(6)), 6);
  });

  it('solves example #2', () => {
    assert.equal(guessNumber(1, makeGuessChecker(1)), 1);
  });

  it('solves example #3', () => {
    assert.equal(guessNumber(2, makeGuessChecker(1)), 1);
  });
});
