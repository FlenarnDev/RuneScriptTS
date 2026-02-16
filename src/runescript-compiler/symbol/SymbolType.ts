import { TriggerType } from '../trigger/TriggerType';
import { Type } from '../type/Type';
import { ScriptSymbol } from './ScriptSymbol';
import { BasicSymbol, ConstantSymbol, LocalVariableSymbol } from './Symbol';

export type SymbolType<T> =
    | { kind: "ServerScript"; type: TriggerType }
    | { kind: "ClientScript"; type: TriggerType }
    | { kind: "LocalVariable" }
    | { kind: "Basic"; type: Type }
    | { kind: "Constant"};

// Caches for singleton instances
const serverScriptCache = new WeakMap<TriggerType, SymbolType<ScriptSymbol>>();
const clientScriptCache = new WeakMap<TriggerType, SymbolType<ScriptSymbol>>();
const basicCache = new Map<Type, SymbolType<BasicSymbol>>();

const localVariableSingleton: SymbolType<LocalVariableSymbol> = { kind: "LocalVariable" };
const constantSingleton: SymbolType<ConstantSymbol> = { kind: "Constant" };

export const SymbolType = {
    serverScript: (type: TriggerType): SymbolType<ScriptSymbol> => {
        let cached = serverScriptCache.get(type);
        if (!cached) {
            cached = { kind: "ServerScript", type };
            serverScriptCache.set(type, cached);
        }
        return cached;
    },
    clientScript: (type: TriggerType): SymbolType<ScriptSymbol> => {
        let cached = clientScriptCache.get(type);
        if (!cached) {
            cached = { kind: "ClientScript", type };
            clientScriptCache.set(type, cached);
        }
        return cached;
    },
    localVariable: (): SymbolType<LocalVariableSymbol> => localVariableSingleton,
    basic: (type: Type): SymbolType<BasicSymbol> => {
        let cached = basicCache.get(type);
        if (!cached) {
            cached = { kind: "Basic", type };
            basicCache.set(type, cached);
        }
        return cached;
    },
    constant: (): SymbolType<ConstantSymbol> => constantSingleton,
}