/**
 * semver.js
 * @see {@link http://semver.org/|Semantic Versioning}
 * @see {@link https://github.com/mojombo/semver/|mojombo/semver}
 */

/* api */
import { getType, isString } from './common.js';

/* constants */
const BASE = 10;
const INT = '0|[1-9]\\d*';
const ALPHA_NUM = '\\d*[A-Za-z-][A-Za-z\\d-]*';
const PRE_PART = `(?:${ALPHA_NUM}|${INT})`;
const PRE = `${PRE_PART}(?:\\.${PRE_PART})*`;
const BUILD_PART = `(?:${ALPHA_NUM}|\\d+)`;
const BUILD = `${BUILD_PART}(?:\\.${BUILD_PART})*`;
const SEMVER =
  `((?:${INT})(?:\\.(?:${INT})){2})(?:-(${PRE}))?(?:\\+(${BUILD}))?`;
const REGEXP_INT = new RegExp(`^(?:${INT})$`);
const REGEXP_SEMVER = new RegExp(`^v?${SEMVER}$`);
const REGEXP_SEMVER_STRICT = new RegExp(`^${SEMVER}$`);

/**
 * parsed SemVer object
 * @typedef {object} SemVerObject
 * @property {string} version - version string
 * @property {boolean} matches - matches SemVer format
 * @property {number|undefined} major - major version
 * @property {number|undefined} minor - minor version
 * @property {number|undefined} patch - patch version
 * @property {Array<string|number>|undefined} pre - pre-release version in array
 * @property {Array<string|number>|undefined} build - build ID in array
 */

/**
 * is valid SemVer string
 * @param {string} version - version string
 * @param {boolean} [strict] - reject 'v' prefixed
 * @returns {boolean} - result
 */
export const isValidSemVer = (version, strict = false) => {
  if (!isString(version)) {
    throw new TypeError(`Expected String but got ${getType(version)}.`);
  }
  const reg = strict ? REGEXP_SEMVER_STRICT : REGEXP_SEMVER;
  return reg.test(version);
};

/**
 * parse version part
 * @param {string} part - version part
 * @param {boolean} [nonPosInt] - accept non positive integer
 * @returns {string|number} - parsed version part
 */
export const parseVersionPart = (part, nonPosInt = false) => {
  if (!isString(part)) {
    throw new TypeError(`Expected String but got ${getType(part)}.`);
  }
  if (!(nonPosInt || REGEXP_INT.test(part))) {
    throw new Error(`${part} is not a stringified positive integer.`);
  }
  let parsedPart;
  if (REGEXP_INT.test(part)) {
    parsedPart = parseInt(part, BASE);
    if (!Number.isSafeInteger(parsedPart)) {
      throw new RangeError(`${parsedPart} exceeds ${Number.MAX_SAFE_INTEGER}.`);
    }
  } else {
    parsedPart = part;
  }
  return parsedPart;
};

/**
 * compare SemVer
 * @param {string} version - version string
 * @param {string} base - base version string to compare from
 * @param {boolean} [strict] - reject 'v' prefixed
 * @returns {number}
 *   - -1 or negative number, if version is less than base version
 *     0, if version is equal to base version
 *     1 or positive number, if version is greater than base version
 */
export const compareSemVer = (version, base, strict = false) => {
  if (!isString(version)) {
    throw new TypeError(`Expected String but got ${getType(version)}.`);
  }
  if (!isString(base)) {
    throw new TypeError(`Expected String but got ${getType(base)}.`);
  }
  if (!isValidSemVer(version, !!strict)) {
    throw new Error(`${version} is not valid version string.`);
  }
  if (!isValidSemVer(base, !!strict)) {
    throw new Error(`${base} is not valid version string.`);
  }
  let result;
  if (version === base) {
    result = 0;
  } else {
    const reg = strict ? REGEXP_SEMVER_STRICT : REGEXP_SEMVER;
    const [, vRel, vPre] = version.match(reg);
    const [, bRel, bPre] = base.match(reg);
    const [vMajor, vMinor, vPatch] =
      vRel.split('.').map(part => parseVersionPart(part));
    const [bMajor, bMinor, bPatch] =
      bRel.split('.').map(part => parseVersionPart(part));
    if (vMajor > bMajor) {
      result = 1;
    } else if (vMajor < bMajor) {
      result = -1;
    } else if (vMinor > bMinor) {
      result = 1;
    } else if (vMinor < bMinor) {
      result = -1;
    } else if (vPatch > bPatch) {
      result = 1;
    } else if (vPatch < bPatch) {
      result = -1;
    } else if (vPre === bPre) {
      result = 0;
    } else if (!vPre && bPre) {
      result = 1;
    } else if (vPre && !bPre) {
      result = -1;
    } else {
      const vPreParts = vPre.split('.').map(part =>
        parseVersionPart(part, true)
      );
      const bPreParts = bPre.split('.').map(part =>
        parseVersionPart(part, true)
      );
      const l = Math.max(vPreParts.length, bPreParts.length);
      let i = 0;
      while (i < l) {
        const vPart = vPreParts[i];
        const bPart = bPreParts[i];
        if ((vPart && !bPart) || (isString(vPart) && Number.isInteger(bPart))) {
          result = 1;
        } else if ((!vPart && bPart) ||
                   (Number.isInteger(vPart) && isString(bPart))) {
          result = -1;
        } else if (vPart !== bPart && isString(vPart) && isString(bPart)) {
          result = vPart.localeCompare(bPart);
        } else if (Number.isInteger(vPart) && Number.isInteger(bPart)) {
          if (vPart > bPart) {
            result = 1;
          } else if (vPart < bPart) {
            result = -1;
          }
        }
        if (Number.isInteger(result)) {
          break;
        }
        i++;
      }
    }
  }
  return result;
};

/**
 * parse SemVer string
 * @param {string} version - version string
 * @param {boolean} [strict] - reject 'v' prefixed
 * @returns {SemVerObject} - result
 */
export const parseSemVer = (version, strict = false) => {
  if (!isString(version)) {
    throw new TypeError(`Expected String but got ${getType(version)}.`);
  }
  const matches = isValidSemVer(version, !!strict);
  let major, minor, patch, pre, build;
  if (matches) {
    const reg = strict ? REGEXP_SEMVER_STRICT : REGEXP_SEMVER;
    const [, vRel, vPre, vBuild] = version.match(reg);
    [major, minor, patch] = vRel.split('.').map(part => parseVersionPart(part));
    if (vPre) {
      pre = vPre.split('.').map(part => parseVersionPart(part, true));
    }
    if (vBuild) {
      build = vBuild.split('.').map(part => parseVersionPart(part, true));
    }
  }
  return {
    version, matches, major, minor, patch, pre, build
  };
};

/* async wrappers */
/**
 * compare SemVer (async)
 * @param {string} version - version string
 * @param {string} base - base version string to compare from
 * @param {boolean} [strict] - reject 'v' prefixed
 * @returns {Promise.<number>}
 *   - -1 or negative number, if version is less than base version
 *     0, if version is equal to base version
 *     1 or positive number, if version is greater than base version
 */
const compareSemVerAsync = async (version, base, strict = false) => {
  const res = compareSemVer(version, base, strict);
  return res;
};

/**
 * is valid SemVer string (async)
 * @param {string} version - version string
 * @param {boolean} [strict] - reject 'v' prefixed
 * @returns {Promise.<boolean>} - result
 */
const isValidSemVerAsync = async (version, strict = false) => {
  const res = isValidSemVer(version, strict);
  return res;
};

/**
 * parse SemVer string (async)
 * @param {string} version - version string
 * @param {boolean} [strict] - reject 'v' prefixed
 * @returns {Promise.<SemVerObject>} - result
 */
const parseSemVerAsync = async (version, strict = false) => {
  const res = parseSemVer(version, strict);
  return res;
};

/* export async functions */
export const promises = {
  compareSemVer: compareSemVerAsync,
  isValidSemVer: isValidSemVerAsync,
  parseSemVer: parseSemVerAsync
};
