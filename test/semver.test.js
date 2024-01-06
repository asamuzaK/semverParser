/* api */
import { assert } from 'chai';
import { describe, it } from 'mocha';

/* test */
import {
  compareSemVer,
  isValidSemVer,
  parseSemVer,
  parseVersionPart,
  promises
} from '../modules/semver.js';

describe('Is Valid Semver', () => {
  it('should be function', () => {
    assert.typeOf(isValidSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => isValidSemVer());
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('0.0.0'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.99999'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('v1.0.0'));
  });

  it('should be false if v prefixed and 2nd param is true', () => {
    assert.isFalse(isValidSemVer('v1.0.0', true));
  });

  it('should be false if version part lacks one of x.y.z', () => {
    assert.isFalse(isValidSemVer('0'));
  });

  it('should be false if version part lacks one of x.y.z', () => {
    assert.isFalse(isValidSemVer('1.0'));
  });

  it('should be false if there is more than 3 version parts', () => {
    assert.isFalse(isValidSemVer('1.0.0.0'));
  });

  it('should be false if version part contains leading 0 integer', () => {
    assert.isFalse(isValidSemVer('1.0.01'));
  });

  it('should be false if 0 is omitted', () => {
    assert.isFalse(isValidSemVer('.1.1'));
  });

  it('should be false if 0 is omitted', () => {
    assert.isFalse(isValidSemVer('1.1.'));
  });

  it('should be false if version part contains negative integer', () => {
    assert.isFalse(isValidSemVer('1.0.-1'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-a'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-0'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-a.1'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-0.1'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-0.a.0'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-a1b1'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-1a1b'));
  });

  it('should be false if pre part is not separeted by hyphen', () => {
    assert.isFalse(isValidSemVer('1.0.0a'));
  });

  it('should be false if pre part is not separeted by hyphen', () => {
    assert.isFalse(isValidSemVer('1.0.0.a.1'));
  });

  it('should be false if pre part contains leading 0 integer', () => {
    assert.isFalse(isValidSemVer('1.0.0-0.a.01'));
  });

  it('should be true even if pre part contains negative integer', () => {
    assert.isTrue(isValidSemVer('1.0.0-0.a.-1'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-a+1'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0-beta+exp.sha.5114f85'));
  });

  it('should be true', () => {
    assert.isTrue(isValidSemVer('1.0.0+20130313144700'));
  });

  it('should be true even if build contains leading 0 integer', () => {
    assert.isTrue(isValidSemVer('1.0.0-a+01'));
  });

  it('should be true even if build contains negative integer', () => {
    assert.isTrue(isValidSemVer('1.0.0-a+-1'));
  });
});

describe('Parse Version Part', () => {
  it('should be function', () => {
    assert.typeOf(parseVersionPart, 'function');
  });

  it('should throw', () => {
    assert.throws(
      () => parseVersionPart(),
      TypeError,
      'Expected String but got Undefined.'
    );
  });

  it('should throw', () => {
    const part = (Number.MAX_SAFE_INTEGER + 1).toString();
    assert.throws(
      () => parseVersionPart(part),
      RangeError,
      `${part} exceeds ${Number.MAX_SAFE_INTEGER}.`
    );
  });

  it('should throw', () => {
    assert.throws(
      () => parseVersionPart('-1'),
      Error,
      '-1 is not a stringified positive integer.'
    );
  });

  it('should throw', () => {
    assert.throws(
      () => parseVersionPart('01'),
      Error,
      '01 is not a stringified positive integer.'
    );
  });

  it('should throw', () => {
    assert.throws(
      () => parseVersionPart('a'),
      Error,
      'a is not a stringified positive integer.'
    );
  });

  it('should throw', () => {
    assert.throws(
      () => parseVersionPart('1e2'),
      Error,
      '1e2 is not a stringified positive integer.'
    );
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('0'), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('1'), 1);
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('10'), 10);
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('-1', true), '-1');
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('01', true), '01');
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('a', true), 'a');
  });

  it('should be equal', () => {
    assert.strictEqual(parseVersionPart('1e2', true), '1e2');
  });
});

describe('Compare SemVer', () => {
  it('should be function', () => {
    assert.typeOf(compareSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer());
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer(null, '1.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0.0.0.0', '1.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0', '1.0.0.0.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0a', '1.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0', '1.0a'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0.0', '1.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0.0', '1.0.9007199254740992'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0.9007199254740992', '1.0.0'));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0.0-1', '1.0.0-9007199254740992'));
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0', '1.0.0'), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0', '1.0.0', true), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('v1.0.0', '1.0.0'), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0', 'v1.0.0'), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('v1.0.0', 'v1.0.0'), 0);
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('v1.0.0', '1.0.0', true));
  });

  it('should throw', () => {
    assert.throws(() => compareSemVer('1.0.0', 'v1.0.0', true));
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0+1', '1.0.0'), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0', '1.0.0+1'), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0', '1.0.0+1', true), 0);
  });

  it('should be equal', () => {
    assert.strictEqual(compareSemVer('1.0.0+9007199254740992', '1.0.0+1'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('2.0.0', '1.0.0'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('2.0.0', '1.0.0', true), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.1.0', '1.0.0'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.1', '1.0.0'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.9007199254740991', '1.0.0'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.0', '1.0.0-a'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.0', '1.0.0-9007199254740992'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.0-a.1', '1.0.0-a'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.0-a.10', '1.0.0-a.9'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.0-a.b', '1.0.0-a.1'), 0);
  });

  it('should be greater than 0', () => {
    assert.isAbove(compareSemVer('1.0.0-a.-1', '1.0.0-a.1'), 0);
  });

  it('should be less than 0', () => {
    assert.isAbove(compareSemVer('1.0.0-beta.1.11', '1.0.0-beta.1.2'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0', '2.0.0'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0', '2.0.0', true), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0', '1.1.0'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0', '1.0.1'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-a', '1.0.0'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-a', '1.0.0', true), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-a', '1.0.0-alpha'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-alpha', '1.0.0-b'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-b', '1.0.0-beta'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-beta', '1.0.0-pre'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-pre', '1.0.0-rc'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-rc', '1.0.0'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-alpha', '1.0.0-alpha.1'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-alpha', '1.0.0-alpha.1', true), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-alpha.1', '1.0.0-alpha.beta'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-alpha.beta', '1.0.0-beta'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-beta', '1.0.0-beta.2'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-beta.2', '1.0.0-beta.11'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-beta.1.2', '1.0.0-beta.1.11'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-beta.11', '1.0.0-rc.1'), 0);
  });

  it('should be less than 0', () => {
    assert.isBelow(compareSemVer('1.0.0-rc.1', '1.0.0'), 0);
  });
});

describe('Parse SemVer', () => {
  it('should be function', () => {
    assert.typeOf(parseSemVer, 'function');
  });

  it('should throw', () => {
    assert.throws(() => parseSemVer());
  });

  it('should throw', () => {
    assert.throws(() => parseSemVer('1.0.9007199254740992'));
  });

  it('should throw', () => {
    assert.throws(() => parseSemVer('1.0.0-9007199254740992'));
  });

  it('should throw', () => {
    assert.throws(() => parseSemVer('1.0.0+9007199254740992'));
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0'), {
      version: '1.0.0',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('0.0.0'), {
      version: '0.0.0',
      matches: true,
      major: 0,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('v1.0.0'), {
      version: 'v1.0.0',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('v1.0.0', true), {
      version: 'v1.0.0',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.9007199254740991'), {
      version: '1.0.9007199254740991',
      matches: true,
      major: 1,
      minor: 0,
      patch: 9007199254740991,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1'), {
      version: '1',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0'), {
      version: '1.0',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0.0'), {
      version: '1.0.0.0',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.01'), {
      version: '1.0.01',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.-1'), {
      version: '1.0.-1',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('.0.1'), {
      version: '.0.1',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.'), {
      version: '1.0.',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0-a.0'), {
      version: '1.0.0-a.0',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: ['a', 0],
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0-0.a'), {
      version: '1.0.0-0.a',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: [0, 'a'],
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0-0.a.9007199254740991'), {
      version: '1.0.0-0.a.9007199254740991',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: [0, 'a', 9007199254740991],
      build: undefined
    });
  });

  it('should equal, negative integer in pre is parsed as string', () => {
    assert.deepEqual(parseSemVer('1.0.0-0.a.-1'), {
      version: '1.0.0-0.a.-1',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: [0, 'a', '-1'],
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0a'), {
      version: '1.0.0a',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0.a.1'), {
      version: '1.0.0.a.1',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0+1.x'), {
      version: '1.0.0+1.x',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: [1, 'x']
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0-a.0+1.x'), {
      version: '1.0.0-a.0+1.x',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: ['a', 0],
      build: [1, 'x']
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('1.0.0-a.0+1.x.9007199254740991'), {
      version: '1.0.0-a.0+1.x.9007199254740991',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: ['a', 0],
      build: [1, 'x', 9007199254740991]
    });
  });

  it('should equal, leading 0 integer in build is parsed as string', () => {
    assert.deepEqual(parseSemVer('1.0.0-a.0+001'), {
      version: '1.0.0-a.0+001',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: ['a', 0],
      build: ['001']
    });
  });

  it('should equal, negative integer in build is parsed as string', () => {
    assert.deepEqual(parseSemVer('1.0.0-a.0+-1.1'), {
      version: '1.0.0-a.0+-1.1',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: ['a', 0],
      build: ['-1', 1]
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('0.1.12dev-cb31c51'), {
      version: '0.1.12dev-cb31c51',
      matches: false,
      major: undefined,
      minor: undefined,
      patch: undefined,
      pre: undefined,
      build: undefined
    });
  });

  it('should equal', () => {
    assert.deepEqual(parseSemVer('2.0.1-signed.1-signed'), {
      version: '2.0.1-signed.1-signed',
      matches: true,
      major: 2,
      minor: 0,
      patch: 1,
      pre: ['signed', '1-signed'],
      build: undefined
    });
  });
});

describe('promises', () => {
  it('should be functions', () => {
    const keys = Object.keys(promises);
    for (const key of keys) {
      assert.strictEqual(typeof promises[key], 'function');
    }
  });
});

describe('Compare SemVer (async)', () => {
  const func = promises.compareSemVer;
  it('should be function', () => {
    assert.strictEqual(typeof func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
    });
  });

  it('should throw', async () => {
    await func('v1.0.0').catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
    });
  });

  it('should throw', async () => {
    await func('v1.0.0', 'v1.0.1', true).catch(e => {
      assert.instanceOf(e, Error, 'error');
      assert.strictEqual(e.message, 'v1.0.0 is not valid version string.',
        'message');
    });
  });

  it('should be greater than 0', async () => {
    const res = await func('1.0.1', '1.0.0');
    assert.isAbove(res, 0);
  });
});

describe('Is Valid SemVer String (async)', () => {
  const func = promises.isValidSemVer;
  it('should be function', () => {
    assert.strictEqual(typeof func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
    });
  });

  it('should be true', async () => {
    const res = await func('1.0.0');
    assert.isTrue(res);
  });

  it('should be false', async () => {
    const res = await func('v1.0.0', true);
    assert.isFalse(res);
  });
});

describe('Parse SemVer String (async)', () => {
  const func = promises.parseSemVer;
  it('should be function', () => {
    assert.strictEqual(typeof func, 'function');
  });

  it('should throw', async () => {
    await func().catch(e => {
      assert.instanceOf(e, TypeError, 'error');
      assert.strictEqual(e.message, 'Expected String but got Undefined.',
        'message');
    });
  });

  it('should equal', async () => {
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

  it('should equal', async () => {
    const res = await func('1.0.0', true);
    assert.deepEqual(res, {
      version: '1.0.0',
      matches: true,
      major: 1,
      minor: 0,
      patch: 0,
      pre: undefined,
      build: undefined
    });
  });
});
