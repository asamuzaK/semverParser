/**
 * index.js
 */
"use strict";
{
  /* api */
  const {getType, isString} = require("./modules/common");

  /* constants */
  const BASE = 10;
  const PART_INT = "(?:0|[1-9]\\d*)";
  const PART_OPT =
    "(?:0(?:[A-z-]+[A-z\\d-]*)?|[1-9]\\d*(?:[A-z\\d-]*)?|[A-z-]+(?:[A-z\\d-]*)?)";
  const SEMVER =
    `(${PART_INT}(?:\\.${PART_INT}){2})(?:-(${PART_OPT}(?:\\.${PART_OPT})*))?(?:\\+(${PART_OPT}(?:\\.${PART_OPT})*))?`;
  const REGEXP_INT = new RegExp(`^${PART_INT}$`);
  const REGEXP_SEMVER = new RegExp(`^(?:${SEMVER})$`);

  /**
   * is valid SemVer string
   * @param {string} version - version string
   * @returns {boolean} - result
   */
  const isValidSemVer = version => {
    if (!isString(version)) {
      throw new TypeError(`Expected String but got ${getType(version)}`);
    }
    return REGEXP_SEMVER.test(version);
  };

  /**
   * compare SemVer
   * @param {string} version - version string
   * @param {string} base - base version string to compare from
   * @returns {number}
   *   - -1 or negative number, if version is less than base version
   *     0, if version is equal to base version
   *     1 or positive number, if version is greater than base version
   */
  const compareSemVer = (version, base) => {
    if (!isString(version)) {
      throw new TypeError(`Expected String but got ${getType(version)}`);
    }
    if (!isString(base)) {
      throw new TypeError(`Expected String but got ${getType(base)}`);
    }
    if (!isValidSemVer(version)) {
      throw new Error(`${version} is not valid version string.`);
    }
    if (!isValidSemVer(base)) {
      throw new Error(`${base} is not valid version string.`);
    }
    let result;
    if (version === base) {
      result = 0;
    } else {
      const [, vRel, vPre] = version.match(REGEXP_SEMVER);
      const [, bRel, bPre] = base.match(REGEXP_SEMVER);
      const [vMajor, vMinor, vPatch] =
        vRel.split(".").map(part => parseInt(part, BASE));
      const [bMajor, bMinor, bPatch] =
        bRel.split(".").map(part => parseInt(part, BASE));
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
        const vPreParts = vPre.split(".").map(part => {
          if (REGEXP_INT.test(part)) {
            part = parseInt(part, BASE);
          }
          return part;
        });
        const bPreParts = bPre.split(".").map(part => {
          if (REGEXP_INT.test(part)) {
            part = parseInt(part, BASE);
          }
          return part;
        });
        const l = Math.max(vPreParts.length, bPreParts.length);
        let i = 0;
        while (i < l) {
          const vPart = vPreParts[i];
          const bPart = bPreParts[i];
          if (vPart && !bPart || isString(vPart) && Number.isInteger(bPart)) {
            result = 1;
          } else if (!vPart && bPart ||
                     Number.isInteger(vPart) && isString(bPart)) {
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
    if (!Number.isInteger(result)) {
      throw new Error(`Failed to compare ${version} with ${base}.`);
    }
    return result;
  };

  /**
   * parse SemVer string
   * @param {string} version - version string
   * @returns {Object}
   *   - result which contains properties below
   *     version {string} - given version string
   *     matches {boolean} - matches SemVer format
   *     major {number} - major version
   *     minor {number|undefined} - minor version
   *     patch {number|undefined} - patch version
   *     pre {Array<string|number>|undefined} - pre release version in array
   *     build {Array<string|number>|undefined} - build ID in array
   */
  const parseSemVer = version => {
    if (!isString(version)) {
      throw new TypeError(`Expected String but got ${getType(version)}`);
    }
    const matches = isValidSemVer(version);
    let major, minor, patch, pre, build;
    if (matches) {
      const [, vRel, vPre, vBuild] = version.match(REGEXP_SEMVER);
      [major, minor, patch] = vRel.split(".").map(part => parseInt(part, BASE));
      if (vPre) {
        pre = vPre.split(".").map(part => {
          if (REGEXP_INT.test(part)) {
            part = parseInt(part, BASE);
          }
          return part;
        });
      }
      if (vBuild) {
        build = vBuild.split(".").map(part => {
          if (REGEXP_INT.test(part)) {
            part = parseInt(part, BASE);
          }
          return part;
        });
      }
    }
    return {
      version, matches, major, minor, patch, pre, build,
    };
  };

  module.exports = {
    compareSemVer,
    isValidSemVer,
    parseSemVer,
  };
}
