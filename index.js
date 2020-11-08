/**
 * index.js
 *
 * @see {@link http://semver.org/ Semantic Versioning}
 * @see {@link https://github.com/semver/semver/ Specification}
 */
'use strict';
/* api */
const {
  compareSemVer, isValidSemVer, parseSemVer, promises
} = require('./modules/semver');

module.exports = {
  compareSemVer,
  isValidSemVer,
  parseSemVer,
  promises
};
