import { LocalVariableSymbol, Symbol } from './Symbol';
import { TriggerType } from '../trigger/TriggerType';
import { Type } from '../type/Type';

export type SymbolType<T extends Symbol> =
    // Script-specific
    | { kind: 'ServerScript'; type: TriggerType; __symbol?: never } // replace never with your ServerScriptSymbol if you define one
    | { kind: 'ClientScript'; type: TriggerType; __symbol?: never }
    // Script-local variable
    | { kind: 'LocalVariable' } // corresponds to LocalVariableSymbol
    // Global symbols
    | { kind: 'Basic'; type: Type } // corresponds to BasicSymbol
    | { kind: 'Constant' };        // corresponds to ConstantSymbol