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

export const SymbolType = {
    serverScript: (type: TriggerType): SymbolType<ScriptSymbol> => ({ kind: "ServerScript", type }),
    clientScript: (type: TriggerType): SymbolType<ScriptSymbol> => ({ kind: "ClientScript", type }),
    localVariable: (): SymbolType<LocalVariableSymbol> => ({ kind: "LocalVariable" }),
    basic: (type: Type): SymbolType<BasicSymbol> => ({ kind: "Basic", type }),
    constant: (): SymbolType<ConstantSymbol> => ({ kind: "Constant" }),
}