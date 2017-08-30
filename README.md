[![Build Status](https://travis-ci.org/asamuzaK/semverParser.svg?branch=master)](https://travis-ci.org/asamuzaK/semverParser)
[![devDependency Status](https://david-dm.org/asamuzaK/semverParser/dev-status.svg)](https://david-dm.org/asamuzaK/semverParser#info=devDependencies)

# SemVer Parser

Parse, determine, compare [SemVer](http://semver.org/ "Semantic Versioning 2.0.0 | Semantic Versioning").

## Install

```
npm install semver-parser
```

## API

NOTE: [Is &quot;v1.2.3&quot; a semantic version?](https://github.com/mojombo/semver/blob/master/semver.md#is-v123-a-semantic-version "semver/semver.md at master · mojombo/semver")

> Is "v1.2.3" a semantic version?
>
> No, "v1.2.3" is not a semantic version. However, prefixing a semantic version with a "v" is a common way (in English) to indicate it is a version number.

For ease of use, this parser supports "v" prefix.

### parseSemVer(version)

Parses version string.

* @param {string} version - version string
* @returns {Object} - parsed result, contains properties below
  - version {string} - given version string
  - matches {boolean} - matches SemVer format
  - major {number|undefined} - major version
  - minor {number|undefined} - minor version
  - patch {number|undefined} - patch version
  - pre {Array&lt;string|number&gt;|undefined} - pre release version in array
  - build {Array&lt;string|number&gt;|undefined} - build ID in array

### isValidSemVer(version)

Determine whether the given argument is a valid SemVer string.

* @param {string} version - version string
* @returns {boolean} - result

### compareSemVer(version, base)

Compare versions in SemVer format.

* @param {string} version - version string
* @param {string} base - base version string to compare from
* @returns {number}
  - -1 or negative number, if version is less than base version
  - 0, if version is equal to base version
  - 1 or positive number, if version is greater than base version
