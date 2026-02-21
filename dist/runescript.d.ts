/* tslint:disable */
/* eslint-disable */

export declare function CompileServerScript(config?: {
    sourcePaths?: string[];
    symbolPaths?: string[];
    excludePaths?: string[];
    checkPointers?: boolean;
    writer?: {
        jag?: {
            output: string;
        };
        js5?: {
            output: string;
        };
    };
}): void;
