/* eslint-disable no-unused-vars */
/**
 * File to check if regular expressions are optimized
 */

const validSemVer = /(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*)?(?:\+(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*)?/;

const versionCore = /(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}/;

const majorMinorPatch = /0|[1-9]\d*/;

const preRelease = /(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*/;

const dotSeparatedPreReleaseIdentifiers = /(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*/;

const build = /(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*/;

const dotSeparatedBuildIdentifiers = /(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+)(?:\.(?:\d*[A-Za-z-][\dA-Za-z-]*|\d+))*/;

const preReleaseIdentifier = /0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*/;

const buildIdentifier = /\d*[A-Za-z-][\dA-Za-z-]*|\d+/;

const alphanumericIdentifier = /[\dA-Za-z-]*[A-Za-z-][\dA-Za-z-]*/;

const alphanumericIdentifierOptimized = /\d*[A-Za-z-][\dA-Za-z-]*/;

const numericIdentifier = /0|[1-9]\d*/;

const identifierCharacters = /[\dA-Za-z-]+/;

const identifierCharacter = /[\dA-Za-z-]/;

const nonDigit = /[A-Za-z-]/;
