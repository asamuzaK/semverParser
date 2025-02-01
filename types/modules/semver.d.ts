export function isValidSemVer(version: string, strict?: boolean): boolean;
export function parseVersionPart(part: string, nonPosInt?: boolean): string | number;
export function compareSemVer(version: string, base: string, strict?: boolean): number;
export function parseSemVer(version: string, strict?: boolean): SemVerObject;
export namespace promises {
    export { compareSemVerAsync as compareSemVer };
    export { isValidSemVerAsync as isValidSemVer };
    export { parseSemVerAsync as parseSemVer };
}
export type SemVerObject = {
    version: string;
    matches: boolean;
    major: number | undefined;
    minor: number | undefined;
    patch: number | undefined;
    pre: Array<string | number> | undefined;
    build: Array<string | number> | undefined;
};
declare function compareSemVerAsync(version: string, base: string, strict?: boolean): Promise<number>;
declare function isValidSemVerAsync(version: string, strict?: boolean): Promise<boolean>;
declare function parseSemVerAsync(version: string, strict?: boolean): Promise<SemVerObject>;
export {};
