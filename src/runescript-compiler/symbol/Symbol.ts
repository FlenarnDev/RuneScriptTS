import { Type } from '../type/Type';

/**
 * A basic representation of a symbol for RuneScript. A symbol can represent
 * anything that is able to be referenced within a script or config file.
 *
 * @see SymbolTable
 */
export type Symbol =
    | LocalVariableSymbol
    | BasicSymbol
    | ConstantSymbol;

/**
 * Script local variables
 */
export interface LocalVariableSymbol {
    kind: 'LocalVariableSymbol';
    name: string;
    type: Type;
}

/**
 * Symbols with constant values, new ones sohuld also be included in TypeChecking.isConstantSymbol
 */
export interface BasicSymbol {
    kind: 'BasicSymbol';
    name: string;
    type: Type;
    protected?: boolean;
}

export interface ConstantSymbol {
    kind: 'ConstantSymbol';
    name: string;
    value: string;
}