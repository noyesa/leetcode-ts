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

/**
 * Returns a function that checks its argument to see if the arg is higher,
 * lower than, or equal to the target.
 * @param target - The target number for which to return Equal.
 * @returns Whether the guess was lower, equal to, or higher than the target.
 */
function makeGuessChecker(target: number): (guess: number) => HighOrLow {
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
