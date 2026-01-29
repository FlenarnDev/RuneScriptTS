import { TriggerType } from '../trigger/TriggerType';
import { Type } from '../type/Type';
import { Symbol } from './Symbol';

/**
 * A script symbol is a type of symbol that defines any type of script. Each script
 * must define its trigger type, name, parameter type(s), and return type(s).
 */
export interface ScriptSymbol extends Symbol {
    readonly trigger: TriggerType;
    readonly parameters: Type;
    readonly returns: Type;
}

/**
 * A [ScriptSymbol] type specific for server sided scripts.
 */
export class ServerScriptSymbol implements ScriptSymbol {
    constructor(
        public readonly trigger: TriggerType,
        public readonly name: string,
        public readonly parameters: Type,
        public readonly returns: Type
    ) {}
}
    
/**
 * A [ScriptSymbol] type specific for client sided scripts.
 */
export class ClientScriptSymbol implements ScriptSymbol {
    constructor(
        public readonly trigger: TriggerType,
        public readonly name: string,
        public readonly parameters: Type,
        public readonly returns: Type
    ) {}
}