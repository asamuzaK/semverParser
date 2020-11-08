/**
 * common.js
 */
'use strict';
/* constants */
const TYPE_FROM = 8;
const TYPE_TO = -1;

/**
 * throw error
 *
 * @param {!object} e - Error
 * @throws - Error
 */
const throwErr = e => {
  throw e;
};

/**
 * log error
 *
 * @param {!object} e - Error
 * @returns {boolean} - false
 */
const logErr = e => {
  console.error(e);
  return false;
};

/**
 * log warn
 *
 * @param {*} msg - message
 * @returns {boolean} - false
 */
const logWarn = msg => {
  msg && console.warn(msg);
  return false;
};

/**
 * log message
 *
 * @param {*} msg - message
 * @returns {*} - message
 */
const logMsg = msg => {
  msg && console.log(msg);
  return msg;
};

/**
 * get type
 *
 * @param {*} o - object to check
 * @returns {string} - type of object
 */
const getType = o =>
  Object.prototype.toString.call(o).slice(TYPE_FROM, TYPE_TO);

/**
 * is string
 *
 * @param {*} o - object to check
 * @returns {boolean} - result
 */
const isString = o => typeof o === 'string' || o instanceof String;

/**
 * stringify positive integer
 *
 * @param {number} i - integer
 * @param {boolean} [zero] - treat 0 as a positive integer
 * @returns {?string} - stringified integer
 */
const stringifyPositiveInt = (i, zero = false) =>
  Number.isSafeInteger(i) && ((zero && i >= 0) || i > 0) ? `${i}` : null;

/**
 * parse stringified integer
 *
 * @param {string} i - stringified integer
 * @param {boolean} [zero] - accept leading zero
 * @returns {number} - integer
 */
const parseStringifiedInt = (i, zero = false) => {
  if (!isString(i)) {
    throw new TypeError(`Expexted String but got ${getType(i)}`);
  }
  if (!zero && !/^-?(?:0|[1-9]\d*)$/.test(i)) {
    throw new Error(`${i} is not a stringified integer.`);
  }
  return parseInt(i);
};

/**
 * escape matching char
 *
 * @param {string} str - argument
 * @param {RegExp} re - RegExp
 * @returns {?string} - string
 */
const escapeChar = (str, re) =>
  isString(str) && re && re.global ? str.replace(re, (m, c) => `\\${c}`) : null;

/**
 * strip HTML tags and decode HTML entities
 *
 * @param {string} v - value
 * @returns {string} - converted value
 */
const stripHtmlTags = v => {
  while (/^\n*<(?:[^>]+:)?[^>]+?>|<\/(?:[^>]+:)?[^>]+>\n*$/.test(v)) {
    v = v.replace(/^\n*<(?:[^>]+:)?[^>]+?>/, '')
      .replace(/<\/(?:[^>]+:)?[^>]+>\n*$/, '\n');
  }
  return v.replace(/<\/(?:[^>]+:)?[^>]+>\n*<!--.*-->\n*<(?:[^>]+:)?[^>]+>/g, '\n\n')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
};

module.exports = {
  escapeChar,
  getType,
  isString,
  logErr,
  logMsg,
  logWarn,
  parseStringifiedInt,
  stringifyPositiveInt,
  stripHtmlTags,
  throwErr
};
