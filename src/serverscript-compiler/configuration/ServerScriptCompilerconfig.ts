import { ServerScriptWriterConfig } from './ServerScriptWriterConfig';

/**
 * Main compiler configuration holder.
 */
export class ServerScriptCompilerConfig {
    readonly sourcePaths: string[];
    readonly symbolPaths: string[];
    readonly excludePaths: string[];
    readonly checkPointers: boolean;
    readonly writers: ServerScriptWriterConfig;

    constructor({
        sourcePaths = ['src/'],
        symbolPaths = ['symbols/'],
        excludePaths = [],
        checkPointers = true,
        writers = {},
    }: Partial<ServerScriptCompilerConfig> = {}) {
        this.sourcePaths = sourcePaths;
        this.symbolPaths = symbolPaths;
        this.excludePaths = excludePaths;
        this.checkPointers = checkPointers;
        this.writers = writers;
    }
}