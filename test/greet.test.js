import { describe, it } from 'node:test';
import assert from 'node:assert';
import { greet } from '../src/index.js';

describe('greet', () => {
  it('should greet with the provided name', () => {
    assert.strictEqual(greet('Alice'), 'Hello, Alice!');
  });

  it('should return Hello World for empty name', () => {
    assert.strictEqual(greet(''), 'Hello, World!');
  });

  it('should return Hello World for null', () => {
    assert.strictEqual(greet(null), 'Hello, World!');
  });
});
