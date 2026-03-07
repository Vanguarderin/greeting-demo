import { describe, it } from 'node:test';
import assert from 'node:assert';
import { greet } from '../src/index.js';

describe('greet - backward compatibility', () => {
  it('should greet with the provided name (no options)', () => {
    assert.strictEqual(greet('Alice'), 'Hello, Alice!');
  });

  it('should return Hello World for empty name (no options)', () => {
    assert.strictEqual(greet(''), 'Hello, World!');
  });

  it('should return Hello World for null (no options)', () => {
    assert.strictEqual(greet(null), 'Hello, World!');
  });

  it('should return Hello World for undefined (no options)', () => {
    assert.strictEqual(greet(undefined), 'Hello, World!');
  });
});

describe('greet - style parameter', () => {
  it('should use normal style by default', () => {
    assert.strictEqual(greet('Alice', {}), 'Hello, Alice!');
  });

  it('should support normal style explicitly', () => {
    assert.strictEqual(greet('Bob', { style: 'normal' }), 'Hello, Bob!');
  });

  it('should support formal style', () => {
    assert.strictEqual(greet('Charlie', { style: 'formal' }), 'Good day, Charlie');
  });
});

describe('greet - language parameter', () => {
  it('should use English by default', () => {
    assert.strictEqual(greet('Alice', {}), 'Hello, Alice!');
  });

  it('should support English explicitly', () => {
    assert.strictEqual(greet('Bob', { language: 'en' }), 'Hello, Bob!');
  });

  it('should support Spanish', () => {
    assert.strictEqual(greet('Carlos', { language: 'es' }), 'Hola, Carlos!');
  });

  it('should support French', () => {
    assert.strictEqual(greet('David', { language: 'fr' }), 'Bonjour, David!');
  });
});

describe('greet - style and language combinations', () => {
  // English combinations
  it('should return English normal greeting', () => {
    assert.strictEqual(greet('Alice', { style: 'normal', language: 'en' }), 'Hello, Alice!');
  });

  it('should return English formal greeting', () => {
    assert.strictEqual(greet('Bob', { style: 'formal', language: 'en' }), 'Good day, Bob');
  });

  // Spanish combinations
  it('should return Spanish normal/casual greeting', () => {
    assert.strictEqual(greet('Carlos', { style: 'normal', language: 'es' }), 'Hola, Carlos!');
  });

  it('should return Spanish formal greeting', () => {
    assert.strictEqual(greet('Diana', { style: 'formal', language: 'es' }), 'Buenos días, Diana');
  });

  // French combinations
  it('should return French normal greeting', () => {
    assert.strictEqual(greet('Eric', { style: 'normal', language: 'fr' }), 'Bonjour, Eric!');
  });

  it('should return French formal greeting', () => {
    assert.strictEqual(greet('Françoise', { style: 'formal', language: 'fr' }), 'Bonjour, Françoise');
  });
});

describe('greet - edge cases with options', () => {
  it('should handle empty name with style and language', () => {
    assert.strictEqual(greet('', { style: 'formal', language: 'es' }), 'Buenos días, World');
  });

  it('should handle null name with style and language', () => {
    assert.strictEqual(greet(null, { style: 'formal', language: 'en' }), 'Good day, World');
  });

  it('should handle undefined name with style and language', () => {
    assert.strictEqual(greet(undefined, { language: 'es' }), 'Hola, World!');
  });

  it('should default to English normal for invalid language', () => {
    assert.strictEqual(greet('Alice', { language: 'invalid' }), 'Hello, Alice!');
  });

  it('should default to English normal for invalid style', () => {
    assert.strictEqual(greet('Bob', { style: 'invalid' }), 'Hello, Bob!');
  });
});
