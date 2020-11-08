'use strict';
const {
  compareSemVer,
  isValidSemVer,
  parseSemVer,
  promises
} = require('../index');
const { assert } = require('chai');
const { describe, it } = require('mocha');

describe('Is Valid Semver', () => {
  it('should be function', () => {
    assert.typeOf(isValidSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => isValidSemVer(),
      TypeError, 'Expected String but got Undefined.');
  });

  it('should get result', () => {
    const res = isValidSemVer('1.0.0');
    assert.isTrue(res);
  });

  it('should get result', () => {
    const res = isValidSemVer('v1.0.0', true);
    assert.isFalse(res);
  });
});

describe('Compare SemVer', () => {
  it('should be function', () => {
    assert.typeOf(compareSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer(),
      TypeError, 'Expected String but got Undefined.');
  });

  it('should get result', () => {
    const res = compareSemVer('1.0.1', '1.0.0');
    assert.isAbove(res, 0);
  });
});

describe('Parse SemVer', () => {
  it('should be function', () => {
    assert.typeOf(parseSemVer, 'function');
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
    assert.typeOf(func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
    });
  });

  it('should get result', async () => {
    const res = await func('1.0.1', '1.0.0');
    assert.isAbove(res, 0);
  });
});

describe('Is Valid SemVer String (async)', () => {
  const func = promises.isValidSemVer;
  it('should be function', () => {
    assert.typeOf(func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
    });
  });

  it('should get result', async () => {
    const res = await func('1.0.0');
    assert.isTrue(res);
  });

  it('should get result', async () => {
    const res = await func('v1.0.0', true);
    assert.isFalse(res);
  });
});

describe('Parse SemVer String (async)', () => {
  const func = promises.parseSemVer;
  it('should be function', () => {
    assert.typeOf(func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
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
