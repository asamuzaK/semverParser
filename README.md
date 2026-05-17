[![build](https://github.com/asamuzaK/semverParser/workflows/build/badge.svg)](https://github.com/asamuzaK/semverParser/actions?query=workflow%3Abuild)
[![CodeQL](https://github.com/asamuzaK/semverParser/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/asamuzaK/semverParser/actions/workflows/github-code-scanning/codeql)
[![npm](https://img.shields.io/npm/v/semver-parser)](https://www.npmjs.com/package/semver-parser)

# SemVer Parser

A lightweight parser to parse, verify, and compare [Semantic Versioning 2.0.0](https://semver.org/).

## Features

* **Strict Specification Compliance**: Strictly complies with SemVer 2.0.0 specifications
* **Safe Parsing**: Prevents `MAX_SAFE_INTEGER` overflow issues
* **Zero Dependencies**
* **Pure ESM with TypeScript Support**

## Install

``` console
npm i semver-parser
```

## Usage

```javascript
import { compareSemVer, isValidSemVer, parseSemVer } from 'semver-parser';
```

### WARNING: Deprecation Notice for Async APIs

The asynchronous wrappers (e.g., `import { promises } from 'semver-parser'`) are deprecated and will be removed in a future major release.
Since the underlying implementation is purely synchronous, the async wrappers provide no performance benefit.
Please use the synchronous APIs.

### About the "v" prefix

According to the SemVer specification, [Is &quot;v1.2.3&quot; a semantic version?](https://github.com/mojombo/semver/blob/master/semver.md#is-v123-a-semantic-version):

> Is "v1.2.3" a semantic version?
>
> No, "v1.2.3" is not a semantic version. However, prefixing a semantic version with a "v" is a common way (in English) to indicate it is a version number.

For ease of use, this parser accepts the "v" prefix by default.
If you want to strictly reject the "v" prefix, set the `strict` parameter to `true` in any of the APIs.

## API Reference

### parseSemVer(version, [strict])

Parses a version string.

* `version` **{string}** The version string to parse.
* `[strict]` **{boolean}**  If `true`, strict mode is enabled (rejects 'v' prefix).
* **Returns** **{object}** Parsed result containing the following properties:
  - `version` **{string}** The given version string
  - `matches` **{boolean}** Whether it matches the SemVer format
  - `major` **{number|undefined}** Major version
  - `minor` **{number|undefined}** Minor version
  - `patch` **{number|undefined}** Patch version
  - `pre` **{Array&lt;string|number&gt;|undefined}** Pre-release version parts
  - `build` **{Array&lt;string|number&gt;|undefined}** Build ID parts

### isValidSemVer(version, [strict])

Determine whether the given argument is a valid SemVer string.

* `version` **{string}** The version string to verify.
* `[strict]` **{boolean}**  If `true`, strict mode is enabled (rejects 'v' prefix).
* **Returns** **{boolean}** `true` if valid, `false` otherwise.

### compareSemVer(version, base, [strict])

Compares two versions in SemVer format.

* `version` **{string}** The version string to evaluate.
* `base` **{string}** The base version string to compare against.
* `[strict]` **{boolean}**  If `true`, strict mode is enabled (rejects 'v' prefix).
* **Returns** **{number}**
  - -1 or negative number, if `version` is **less than** `base` version
  - 0, if `version` is **equal to** `base` version
  - 1 or positive number, if `version` is **greater than** `base` version

## Grammer

The regular expressions used in this parser are translated from the [Backus–Naur Form Grammar for Valid SemVer Versions](https://github.com/mojombo/semver/blob/master/semver.md#backusnaur-form-grammar-for-valid-semver-versions)

### valid semver
``` ebnf
<valid semver> ::= <version core>
                 | <version core> "-" <pre-release>
                 | <version core> "+" <build>
                 | <version core> "-" <pre-release> "+" <build>
```
``` javascript
(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*)?(?:\+(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*)?
```

### version core
``` ebnf
<version core> ::= <major> "." <minor> "." <patch>
```
``` javascript
(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}
```

### major / minor / patch
``` ebnf
<major> ::= <numeric identifier>
```
``` javascript
0|[1-9]\d*
```

### pre-release
``` ebnf
<pre-release> ::= <dot-separated pre-release identifiers>
```
``` javascript
(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*
```

### dot-separated pre-release identifiers
``` ebnf
<dot-separated pre-release identifiers> ::= <pre-release identifier>
                                          | <pre-release identifier> "." <dot-separated pre-release identifiers>
```
``` javascript
(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*
```

### build
``` ebnf
<build> ::= <dot-separated build identifiers>
```
``` javascript
(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*
```

### dot-separated build identifiers
``` ebnf
<dot-separated build identifiers> ::= <build identifier>
                                    | <build identifier> "." <dot-separated build identifiers>
```
``` javascript
(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*
```

### pre-release identifier
``` ebnf
<pre-release identifier> ::= <alphanumeric identifier>
                           | <numeric identifier>
```
``` javascript
0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*
```

### build identifier
``` ebnf
<build identifier> ::= <alphanumeric identifier>
                     | <digits>
```
``` javascript
\d*[A-Za-z-][\dA-Za-z-]*|\d+
```

### alphanumeric identifier
``` ebnf
<alphanumeric identifier> ::= <non-digit>
                            | <non-digit> <identifier characters>
                            | <identifier characters> <non-digit>
                            | <identifier characters> <non-digit> <identifier characters>
```
``` javascript
[\dA-Za-z-]*[A-Za-z-][\dA-Za-z-]*
```
optimized:
``` javascript
\d*[A-Za-z-][\dA-Za-z-]*
```

### numeric identifier
``` ebnf
<numeric identifier> ::= "0"
                       | <positive digit>
                       | <positive digit> <digits>
```
``` javascript
0|[1-9]\d*
```

### identifier characters
``` ebnf
<identifier characters> ::= <identifier character>
                          | <identifier character> <identifier characters>
```
``` javascript
[\dA-Za-z-]+
```

### identifier character
``` ebnf
<identifier character> ::= <digit>
                         | <non-digit>
```
``` javascript
[\dA-Za-z-]
```

### non-digit
``` ebnf
<non-digit> ::= <letter>
              | "-"
```
``` javascript
[A-Za-z-]
```

### digits
``` ebnf
<digits> ::= <digit>
           | <digit> <digits>
```
``` javascript
\d+
```

### digit
``` ebnf
<digit> ::= "0"
          | <positive digit>
```
``` javascript
\d
```

### positive digit
``` ebnf
<positive digit> ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```
``` javascript
[1-9]
```

### letter
``` ebnf
<letter> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J"
           | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T"
           | "U" | "V" | "W" | "X" | "Y" | "Z" | "a" | "b" | "c" | "d"
           | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n"
           | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x"
           | "y" | "z"
```
``` javascript
[A-Za-z]
```
