/* eslint-disable no-unused-vars */
/**
 * File to check if regular expressions are optimized
 */

const validSemVer = /(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}(?:-(?:0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*))*)?(?:\+(?:\d*[A-Z-][\dA-Z-]*|\d+)(?:\.(?:\d*[A-Z-][\dA-Z-]*|\d+))*)?/i;

const versionCore = /(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){2}/;

const majorMinorPatch = /0|[1-9]\d*/;

const preRelease = /(?:0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*))*/i;

const dotSeparatedPreReleaseIdentifiers = /(?:0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*))*/i;

const build = /(?:\d*[A-Z-][\dA-Z-]*|\d+)(?:\.(?:\d*[A-Z-][\dA-Z-]*|\d+))*/i;

const dotSeparatedBuildIdentifiers = /(?:\d*[A-Z-][\dA-Z-]*|\d+)(?:\.(?:\d*[A-Z-][\dA-Z-]*|\d+))*/i;

const preReleaseIdentifier = /0|[1-9]\d*|\d*[A-Z-][\dA-Z-]*/i;

const buildIdentifier = /\d*[A-Z-][\dA-Z-]*|\d+/i;

const alphanumericIdentifier = /[\dA-Z-]*[A-Z-][\dA-Z-]*/i;

const alphanumericIdentifierOptimized = /\d*[A-Z-][\dA-Z-]*/i;

const numericIdentifier = /0|[1-9]\d*/;

const identifierCharacters = /[\dA-Z-]+/i;

const identifierCharacter = /[\dA-Z-]/i;

const nonDigit = /[A-Z-]/i;
