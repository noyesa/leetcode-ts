import { describe, beforeEach, it, afterEach, mock } from 'node:test';
import assert from 'node:assert';

class TimeLimitedCacheEntry {
  /**
   * The value this entry contains.
   */
  value: number;

  /**
   * Duration in milliseconds this entry will persist.
   */
  duration: number;

  /**
   * The time at which this element was inserted into the cache.
   */
  insertedAt: number;

  /**
   * Set initial values for properties.
   * @param value - The value being encapsulated.
   * @param duration - The number of milliseconds before this entry expires.
   * @param insertedAt - The time at which the entry was inserted.
   */
  constructor(
    value: number,
    duration: number,
    insertedAt: number = Date.now(),
  ) {
    this.value = value;
    this.duration = duration;
    this.insertedAt = insertedAt;
  }

  /**
   * The time after which the entry expired.
   * @returns The time after which this entry is expired.
   */
  get expiresAfter(): number {
    return this.insertedAt + this.duration;
  }

  /**
   * Is this entry expired?
   */
  get isExpired(): boolean {
    return Date.now() > this.expiresAfter;
  }
}

class TimeLimitedCache {
  #cache: Map<number, TimeLimitedCacheEntry> = new Map();

  /**
   * Gets a value from the cache if it exists and its expiry has not elapsed.
   * @param key - The key for the value to get
   * @returns The value, or -1 if it is not found.
   */
  get(key: number): number {
    const o = this.#cache.get(key);
    if (o !== undefined) {
      const { insertedAt, duration, value } = o;
      if (insertedAt + duration > Date.now()) {
        return value;
      }
    }
    return -1;
  }

  /**
   * Sets a key and value in the cache with a timeout duration.
   * @param key - The key for the value.
   * @param value - The value for the key.
   * @returns Was there an existing value in the cache?
   */
  set(key: number, value: number, duration: number): boolean {
    const existing = this.#cache.get(key);
    this.#cache.set(key, new TimeLimitedCacheEntry(value, duration));
    return Boolean(existing && !existing.isExpired);
  }

  /**
   * Returns the number of elements in the cache.
   * @returns Number of elements in the cache.
   */
  count(): number {
    let count = 0;
    this.#cache.forEach((entry) => {
      if (!entry.isExpired) {
        ++count;
      }
    });
    return count;
  }
}

describe('TimeLimitedCache', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'] });
  });

  afterEach(() => {
    mock.timers.reset();
  });

  describe('get', () => {
    it('returns -1 if the value was never inserted', () => {
      const cache = new TimeLimitedCache();
      assert.equal(cache.get(5), -1);
    });

    it('returns the value previously associated with key', () => {
      const cache = new TimeLimitedCache();
      cache.set(3, 10, 1000);
      assert.equal(cache.get(3), 10);
    });

    it('returns -1 for previously valid keys that have expired', () => {
      const cache = new TimeLimitedCache();
      cache.set(3, 10, 1000);
      mock.timers.tick(500);
      assert.equal(cache.get(3), 10);
      mock.timers.tick(500);
      assert.equal(cache.get(3), -1);
    });
  });

  describe('set', () => {
    it("sets the value at the key specified, and returns false if it didn't exist", () => {
      const cache = new TimeLimitedCache();
      cache.set(4, 5, 1000);
      assert.equal(cache.get(4), 5);
    });

    it('returns true if a value already existed for key', () => {
      const cache = new TimeLimitedCache();
      cache.set(4, 5, 1000);
      assert.equal(cache.set(4, 6, 2000), true);
    });
  });

  describe('count', () => {
    it('returns 0 when no elements have been added', () => {
      const cache = new TimeLimitedCache();
      assert.equal(cache.count(), 0);
    });

    it('returns the proper count before any elements have expired', () => {
      const cache = new TimeLimitedCache();
      cache.set(1, 2, 1000);
      assert.equal(cache.count(), 1);
      cache.set(2, 3, 2000);
      assert.equal(cache.count(), 2);
    });

    it('returns the proper count when there are elements that have expired', () => {
      const cache = new TimeLimitedCache();
      cache.set(1, 2, 1000);
      cache.set(2, 3, 2000);
      assert.equal(cache.count(), 2);
      mock.timers.tick(1000);
      assert.equal(cache.count(), 2);
      mock.timers.tick(1);
      assert.equal(cache.count(), 1);
      mock.timers.tick(999);
      assert.equal(cache.count(), 1);
      mock.timers.tick(1);
      assert.equal(cache.count(), 0);
    });
  });
});
