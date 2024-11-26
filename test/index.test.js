/* api */
import { strict as assert } from 'node:assert';
import { describe, it } from 'mocha';

/* test */
import {
  compareSemVer, isValidSemVer, parseSemVer, promises
} from '../index.js';

describe('Is Valid Semver', () => {
  it('should be function', () => {
    assert.strictEqual(typeof isValidSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => isValidSemVer(),
      TypeError, 'Expected String but got Undefined.');
  });

  it('should get result', () => {
    const res = isValidSemVer('1.0.0');
    assert.strictEqual(res, true);
  });

  it('should get result', () => {
    const res = isValidSemVer('v1.0.0', true);
    assert.strictEqual(res, false);
  });
});

describe('Compare SemVer', () => {
  it('should be function', () => {
    assert.strictEqual(typeof compareSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer(),
      TypeError, 'Expected String but got Undefined.');
  });

  it('should get result', () => {
    const res = compareSemVer('1.0.1', '1.0.0');
    assert.strictEqual(res > 0, true);
  });
});

describe('Parse SemVer', () => {
  it('should be function', () => {
    assert.strictEqual(typeof parseSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => parseSemVer(),
      TypeError, 'Expected String but got Undefined.');
  });

  it('should get result', () => {
    const res = parseSemVer('v1.0.0');
    assert.deepEqual(res, {
      version: 'v1.0.0',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: undefined
    });
  });
});

describe('Compare SemVer (async)', () => {
  const func = promises.compareSemVer;
  it('should be function', () => {
    assert.strictEqual(typeof func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.deepStrictEqual(e,
        new TypeError('Expected String but got Undefined.'));
    });
  });

  it('should get result', async () => {
    const res = await func('1.0.1', '1.0.0');
    assert.strictEqual(res > 0, true);
  });
});

describe('Is Valid SemVer String (async)', () => {
  const func = promises.isValidSemVer;
  it('should be function', () => {
    assert.strictEqual(typeof func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.deepStrictEqual(e,
        new TypeError('Expected String but got Undefined.'));
    });
  });

  it('should get result', async () => {
    const res = await func('1.0.0');
    assert.strictEqual(res, true);
  });

  it('should get result', async () => {
    const res = await func('v1.0.0', true);
    assert.strictEqual(res, false);
  });
});

describe('Parse SemVer String (async)', () => {
  const func = promises.parseSemVer;
  it('should be function', () => {
    assert.strictEqual(typeof func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.deepStrictEqual(e,
        new TypeError('Expected String but got Undefined.'));
    });
  });

  it('should get result', async () => {
    const res = await func('v1.0.0');
    assert.deepEqual(res, {
      version: 'v1.0.0',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: undefined
    });
  });
});
