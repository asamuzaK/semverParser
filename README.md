[![build](https://github.com/asamuzaK/semverParser/workflows/build/badge.svg)](https://github.com/asamuzaK/semverParser/actions?query=workflow%3Abuild)
[![devDependency Status](https://david-dm.org/asamuzaK/semverParser/dev-status.svg)](https://david-dm.org/asamuzaK/semverParser?type=dev)
[![npm version](https://badge.fury.io/js/semver-parser.svg)](https://badge.fury.io/js/semver-parser)

# SemVer Parser

Parse, determine, compare [SemVer](http://semver.org/ "Semantic Versioning 2.0.0 | Semantic Versioning").

## Install

```
npm install semver-parser
```

## API

APIs can be used either synchronously or asynchronously.
Async function returns Promise which resolves with the result.

sync:
```
const {
  compareSemVer, isValidSemVer, parseSemVer
} = require('semver-parser');
```

async:
```
const {
  promises: {
    compareSemVer, isValidSemVer, parseSemVer
  }
} = require('semver-parser');
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
```
<valid semver> ::= <version core>
                 | <version core> "-" <pre-release>
                 | <version core> "+" <build>
                 | <version core> "-" <pre-release> "+" <build>
```
```
(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}(?:-(?:(?:0|[1-9]\d*|\d*[A-z-][A-z\d-]*)(?:\.(?:0|[1-9]\d*|\d*[A-z-][A-z\d-]*))*))?(?:\+(?:\d*[A-z-][A-z\d-]*|\d+)(?:\.(?:\d*[A-z-][A-z\d-]*|\d+))*)?
```

### version core
```
<version core> ::= <major> "." <minor> "." <patch>
```
```
(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}
```

### major
```
<major> ::= <numeric identifier>
```
```
0|[1-9]\d*
```

### minor
```
<minor> ::= <numeric identifier>
```
```
0|[1-9]\d*
```

### patch
```
<patch> ::= <numeric identifier>
```
```
0|[1-9]\d*
```

### pre-release
```
<pre-release> ::= <dot-separated pre-release identifiers>
```
```
(?:0|[1-9]\d*|\d*[A-z-][A-z\d-]*)(?:\.(?:0|[1-9]\d*|\d*[A-z-][A-z\d-]*))*
```

### dot-separated pre-release identifiers
```
<dot-separated pre-release identifiers> ::= <pre-release identifier>
                                          | <pre-release identifier> "." <dot-separated pre-release identifiers>
```
```
(?:0|[1-9]\d*|\d*[A-z-][A-z\d-]*)(?:\.(?:0|[1-9]\d*|\d*[A-z-][A-z\d-]*))*
```

### build
```
<build> ::= <dot-separated build identifiers>
```
```
(?:\d*[A-z-][A-z\d-]*|\d+)(?:\.(?:\d*[A-z-][A-z\d-]*|\d+))*
```

### dot-separated build identifiers
```
<dot-separated build identifiers> ::= <build identifier>
                                    | <build identifier> "." <dot-separated build identifiers>
```
```
(?:\d*[A-z-][A-z\d-]*|\d+)(?:\.(?:\d*[A-z-][A-z\d-]*|\d+))*
```

### pre-release identifier
```
<pre-release identifier> ::= <alphanumeric identifier>
                           | <numeric identifier>
```
```
0|[1-9]\d*|\d*[A-z-][A-z\d-]*
```

### build identifier
```
<build identifier> ::= <alphanumeric identifier>
                     | <digits>
```
```
\d*[A-z-][A-z\d-]*|\d+
```

### alphanumeric identifier
```
<alphanumeric identifier> ::= <non-digit>
                            | <non-digit> <identifier characters>
                            | <identifier characters> <non-digit>
                            | <identifier characters> <non-digit> <identifier characters>
```
```
(?:[A-z\d-]+)?[A-z-](?:[A-z\d-]+)?
```
optimized:
```
\d*[A-z-][A-z\d-]*
```

### numeric identifier
```
<numeric identifier> ::= "0"
                       | <positive digit>
                       | <positive digit> <digits>
```
```
0|[1-9]\d*
```

### identifier characters
```
<identifier characters> ::= <identifier character>
                          | <identifier character> <identifier characters>
```
```
[A-z\d-]+
```

### identifier character
```
<identifier character> ::= <digit>
                         | <non-digit>
```
```
[A-z\d-]
```

### non-digit
```
<non-digit> ::= <letter>
              | "-"
```
```
[A-z-]
```

### digits
```
<digits> ::= <digit>
           | <digit> <digits>
```
```
\d+
```

### digit
```
<digit> ::= "0"
          | <positive digit>
```
```
\d
```

### positive digit
```
<positive digit> ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```
```
[1-9]
```

### letter
```
<letter> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J"
           | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T"
           | "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d"
           | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n"
           | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x"
           | "y" | "z"
```
```
[A-z]
```
