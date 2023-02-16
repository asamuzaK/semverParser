declare module 'semver-parser' {
  type SemVerObject = {
      version: string,
      matches: boolean,
      major?: number | undefined,
      minor?: number | undefined,
      patch?: number | undefined,
      pre?: Array<string | number> | undefined;
      build?: Array<string | number> | undefined;
  }

  export const compareSemVer: (version: string, base: string, strict?: boolean) => number;
  export const isValidSemVer: (version: string, strict?: boolean) => boolean;
  export const parseSemVer: (version: string, strict?: boolean) => SemVerObject;
  export const promises: {
    compareSemVer: (version: string, base: string, strict?: boolean) => number,
    isValidSemVer: (version: string, strict?: boolean) => boolean,
    parseSemVer: (version: string, strict?: boolean) => SemVerObject,
  };
}
