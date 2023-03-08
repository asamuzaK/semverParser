[![build](https://github.com/asamuzaK/semverParser/workflows/build/badge.svg)](https://github.com/asamuzaK/semverParser/actions?query=workflow%3Abuild)
[![CodeQL](https://github.com/asamuzaK/semverParser/workflows/CodeQL/badge.svg)](https://github.com/asamuzaK/semverParser/actions?query=workflow%3ACodeQL)
[![npm](https://img.shields.io/npm/v/semver-parser)](https://www.npmjs.com/package/semver-parser)

# SemVer Parser

Parse, verify, compare [SemVer](https://semver.org/ "Semantic Versioning 2.0.0 | Semantic Versioning").

## Install

```console
npm install semver-parser
```

## API

APIs can be used either synchronously or asynchronously.
Async function returns Promise which resolves with the result.

sync:
```javascript
import { compareSemVer, isValidSemVer, parseSemVer } from 'semver-parser';
```

async:
```javascript
import { promises } from 'semver-parser';
const { compareSemVer, isValidSemVer, parseSemVer } = promises;
```

NOTE: [Is &quot;v1.2.3&quot; a semantic version?](https://github.com/mojombo/semver/blob/master/semver.md#is-v123-a-semantic-version "semver/semver.md at master · mojombo/semver")

> Is "v1.2.3" a semantic version?
>
> No, "v1.2.3" is not a semantic version. However, prefixing a semantic version with a "v" is a common way (in English) to indicate it is a version number.

For ease of use, this parser supports "v" prefixed string.
If you do not want to accept "v" prefix, set `strict` param to `true`.

### parseSemVer(version, strict)

Parses version string.

* @param {string} version - version string
* @param {boolean} [strict] - reject 'v' prefixed
* @returns {Object} - parsed result, contains properties below
  - version {string} - given version string
  - matches {boolean} - matches SemVer format
  - major {number|undefined} - major version
  - minor {number|undefined} - minor version
  - patch {number|undefined} - patch version
  - pre {Array&lt;string|number&gt;|undefined} - pre release version in array
  - build {Array&lt;string|number&gt;|undefined} - build ID in array

### isValidSemVer(version, strict)

Determine whether the given argument is a valid SemVer string.

* @param {string} version - version string
* @param {boolean} [strict] - reject 'v' prefixed
* @returns {boolean} - result

### compareSemVer(version, base, strict)

Compare versions in SemVer format.

* @param {string} version - version string
* @param {string} base - base version string to compare from
* @param {boolean} [strict] - reject 'v' prefixed
* @returns {number}
  - -1 or negative number, if version is less than base version
  - 0, if version is equal to base version
  - 1 or positive number, if version is greater than base version

## [Backus–Naur Form Grammar for Valid SemVer Versions](https://github.com/mojombo/semver/blob/master/semver.md#backusnaur-form-grammar-for-valid-semver-versions "semver/semver.md at master · mojombo/semver") to JavaScript RegExp

### valid semver
```bnf
<valid semver> ::= <version core>
                 | <version core> "-" <pre-release>
                 | <version core> "+" <build>
                 | <version core> "-" <pre-release> "+" <build>
```
```javascript
(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*)?(?:\+(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*)?
```

### version core
```bnf
<version core> ::= <major> "." <minor> "." <patch>
```
```javascript
(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}
```

### major
```bnf
<major> ::= <numeric identifier>
```
```javascript
0|[1-9]\d*
```

### minor
```bnf
<minor> ::= <numeric identifier>
```
```javascript
0|[1-9]\d*
```

### patch
```bnf
<patch> ::= <numeric identifier>
```
```javascript
0|[1-9]\d*
```

### pre-release
```bnf
<pre-release> ::= <dot-separated pre-release identifiers>
```
```javascript
(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*
```

### dot-separated pre-release identifiers
```bnf
<dot-separated pre-release identifiers> ::= <pre-release identifier>
                                          | <pre-release identifier> "." <dot-separated pre-release identifiers>
```
```javascript
(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*
```

### build
```bnf
<build> ::= <dot-separated build identifiers>
```
```javascript
(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*
```

### dot-separated build identifiers
```bnf
<dot-separated build identifiers> ::= <build identifier>
                                    | <build identifier> "." <dot-separated build identifiers>
```
```javascript
(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*
```

### pre-release identifier
```bnf
<pre-release identifier> ::= <alphanumeric identifier>
                           | <numeric identifier>
```
```javascript
0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*
```

### build identifier
```bnf
<build identifier> ::= <alphanumeric identifier>
                     | <digits>
```
```javascript
\d*[A-Za-z-][\dA-Za-z-]*|\d+
```

### alphanumeric identifier
```bnf
<alphanumeric identifier> ::= <non-digit>
                            | <non-digit> <identifier characters>
                            | <identifier characters> <non-digit>
                            | <identifier characters> <non-digit> <identifier characters>
```
```javascript
[\dA-Za-z-]*[A-Za-z-][\dA-Za-z-]*
```
optimized:
```javascript
\d*[A-Za-z-][\dA-Za-z-]*
```

### numeric identifier
```bnf
<numeric identifier> ::= "0"
                       | <positive digit>
                       | <positive digit> <digits>
```
```javascript
0|[1-9]\d*
```

### identifier characters
```bnf
<identifier characters> ::= <identifier character>
                          | <identifier character> <identifier characters>
```
```javascript
[\dA-Za-z-]+
```

### identifier character
```bnf
<identifier character> ::= <digit>
                         | <non-digit>
```
```javascript
[\dA-Za-z-]
```

### non-digit
```bnf
<non-digit> ::= <letter>
              | "-"
```
```javascript
[A-Za-z-]
```

### digits
```bnf
<digits> ::= <digit>
           | <digit> <digits>
```
```javascript
\d+
```

### digit
```bnf
<digit> ::= "0"
          | <positive digit>
```
```javascript
\d
```

### positive digit
```bnf
<positive digit> ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```
```javascript
[1-9]
```

### letter
```bnf
<letter> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J"
           | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T"
           | "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d"
           | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n"
           | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x"
           | "y" | "z"
```
```javascript
[A-Za-z]
```
