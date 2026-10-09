export type SemVerObject = {
    version: string;
    matches: boolean;
    major: number | undefined;
    minor: number | undefined;
    patch: number | undefined;
    pre: Array<string | number> | undefined;
    build: Array<string | number> | undefined;
};
export declare const isValidSemVer: (version: string, strict?: boolean) => boolean;
export declare const parseVersionPart: (part: string, nonPosInt?: boolean) => string | number;
export declare const compareSemVer: (version: string, base: string, strict?: boolean) => number;
export declare const parseSemVer: (version: string, strict?: boolean) => SemVerObject;
declare const compareSemVerAsync: (version: string, base: string, strict?: boolean) => Promise<number>;
declare const isValidSemVerAsync: (version: string, strict?: boolean) => Promise<boolean>;
declare const parseSemVerAsync: (version: string, strict?: boolean) => Promise<SemVerObject>;
export declare const promises: {
    compareSemVer: typeof compareSemVerAsync;
    isValidSemVer: typeof isValidSemVerAsync;
    parseSemVer: typeof parseSemVerAsync;
};
export {};
