/* api */
import { assert } from 'chai';
import { describe, it } from 'mocha';

/* test */
import { getType, isString } from '../modules/common.js';

describe('getType', () => {
  it('should get Undefined', () => {
    assert.strictEqual(getType(), 'Undefined');
  });

  it('should get Null', () => {
    assert.strictEqual(getType(null), 'Null');
  });

  it('should get Object', () => {
    assert.strictEqual(getType({}), 'Object');
  });

  it('should get Array', () => {
    assert.strictEqual(getType([]), 'Array');
  });

  it('should get Boolean', () => {
    assert.strictEqual(getType(true), 'Boolean');
  });

  it('should get Number', () => {
    assert.strictEqual(getType(1), 'Number');
  });

  it('should get String', () => {
    assert.strictEqual(getType('a'), 'String');
  });
});

describe('isString', () => {
  it('should get true if string is given', () => {
    assert.strictEqual(isString('a'), true);
  });

  it('should get false if given argument is not string', () => {
    assert.strictEqual(isString(1), false);
  });
});
