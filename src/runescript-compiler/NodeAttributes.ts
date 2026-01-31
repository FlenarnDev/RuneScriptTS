import { CallExpression } from '../runescipt-parser/ast/expr/call/CallExpression';
import { Expression } from '../runescipt-parser/ast/expr/Expression';
import { Identifier } from '../runescipt-parser/ast/expr/Identifier';
import { StringLiteral } from '../runescipt-parser/ast/expr/literal/StringLiteral';
import { ConstantVariableExpression } from '../runescipt-parser/ast/expr/variable/ConstantVariableExpression';
import { VariableExpression } from '../runescipt-parser/ast/expr/variable/VariableExpression';
import { Node } from '../runescipt-parser/ast/Node';
import { Parameter } from '../runescipt-parser/ast/Parameter';
import { Script } from '../runescipt-parser/ast/Scripts';
import { ArrayDeclarationStatement } from '../runescipt-parser/ast/statement/ArrayDeclarationStatement';
import { BlockStatement } from '../runescipt-parser/ast/statement/BlockStatement';
import { DeclarationStatement } from '../runescipt-parser/ast/statement/DeclarationStatement ';
import { SwitchCase } from '../runescipt-parser/ast/statement/SwitchCase';
import { SwitchStatement } from '../runescipt-parser/ast/statement/SwitchStatement';
import { ScriptSymbol } from './symbol/ScriptSymbol';
import { BasicSymbol, LocalVariableSymbol } from './symbol/Symbol';
import { SymbolTable } from './symbol/SymbolTable';
import { TriggerType } from './trigger/TriggerType';
import { Type } from './type/Type';

/**
 * ==================
 * Scripts Extensions
 * ==================
 */

/**
 * Get the [ScriptSymbol] associated with the script.
 */
export function getScriptSymbol(script: Script): ScriptSymbol {
    return Node.attribute<ScriptSymbol>('symbol').get(script);
}

/**
 * Set the [ScriptSymbol] associated with the script.
 */
export function setScriptSymbol(script: Script, value: ScriptSymbol) {
    Node.attribute<ScriptSymbol>('symbol').set(script, value);
}

/**
 * Get the scripts defined trigger type.
 */
export function getScriptTriggerType(script: Script): TriggerType {
    return Node.attribute<TriggerType>('triggerType').get(script);
}

/**
 * Set the scripts defined trigger type.
 */
export function setScriptTriggerType(script: Script, value: TriggerType) {
    Node.attribute<TriggerType>('triggerType').set(script, value);
}

/**
 * Get the symbol that is associated with the subject of the script.
 */
export function getScriptSubjectReference(script: Script): BasicSymbol | null {
    return Node.attributeOrNull<BasicSymbol>('subjectReference').get(script);
}

/**
 * Set the symbol that is associated with the subject of the script.
 */
export function setScriptSubjectReference(script: Script, value: BasicSymbol | null) {
    Node.attributeOrNull<BasicSymbol>('subjectReference').set(script, value);
}

/**
 * Ghe script parameter type(s) if it returns any.
 */
export function getScriptParameterType(script: Script): Type {
    return Node.attribute<Type>('parameterType').get(script);
}

/**
 * She script parameter type(s).
 */
export function setScriptParameterType(script: Script, value: Type) {
    Node.attribute<Type>('parameterType').set(script, value);
}

/**
 * Get the script return type(s) if it returns any.
 */
export function getScriptReturnType(script: Script): Type {
    return Node.attribute<Type>('returnType').get(script);
}

/**
 * Set the script return type(s).
 */
export function setScriptReturnType(script: Script, value: Type) {
    Node.attribute<Type>('returnType').set(script, value);
}

/**
 * Get the root [SymbolTable] of the script.
 */
export function getScriptScope(script: Script): SymbolTable {
    return Node.attribute<SymbolTable>('block').get(script);
}

/**
 * Set the root [SymbolTable] of the script.
 */
export function setScriptScope(script: Script, value: SymbolTable) {
    Node.attribute<SymbolTable>('block').set(script, value);
}

/**
 * ====================
 * Parameter Extensions
 * ====================
 */

/**
 * Get the symbol that the parameter declares.
 */
export function getParameterSymbol(param: Parameter): LocalVariableSymbol {
    return Node.attribute<LocalVariableSymbol>('symbol').get(param);
}

/**
 * Set the symbol that the parameter declares.
 */
export function setParameterSymbol(param: Parameter, value: LocalVariableSymbol) {
    Node.attribute<LocalVariableSymbol>('symbol').set(param, value);
}

/**
 * ================
 * Block Extensions
 * ================
 */

/**
 * Get the [SymbolTable] of the block.
 */
export function getBlockScope(block: BlockStatement): SymbolTable {
    return Node.attribute<SymbolTable>('scope').get(block);
}

/**
 * Set the [SymbolTable] of the block.
 */
export function setBlockScope(block: BlockStatement, value: SymbolTable) {
    Node.attribute<SymbolTable>('scope').set(block, value);
}

/**
 * ==========================
 * SwitchStatement Extensions
 * ==========================
 */

/**
 * Get the type the switch statement accepts.
 */
export function getSwitchType(sw: SwitchStatement): Type {
    return Node.attribute<Type>('type').get(sw);
}

/**
 * Set the type the switch statement accepts.
 */
export function setSwitchType(sw: SwitchStatement, value: Type) {
    Node.attribute<Type>('type').set(sw, value);
}

/**
 * Get the default case assigned to the statement.
 */
export function getSwitchDefaultCase(sw: SwitchStatement): SwitchCase | null {
    return Node.attributeOrNull<SwitchCase>('defaultCase').get(sw);
}

/**
 * Set the default case assigned to the statement.
 */
export function setSwitchDefaultCase(sw: SwitchStatement, value: SwitchCase | null) {
    Node.attributeOrNull<SwitchCase>('defaultCase').set(sw, value);
}

/**
 * =====================
 * SwitchCase Extensions
 * =====================
 */

/**
 * Get the [SymbolTable] of the case block.
 */
export function getSwitchCaseScope(swCase: SwitchCase): SymbolTable {
    return Node.attribute<SymbolTable>('scope').get(swCase);
}

/**
 * Set the [SymbolTable] of the case block.
 */
export function setSwitchCaseScope(swCase: SwitchCase, value: SymbolTable) {
    Node.attribute<SymbolTable>('scope').set(swCase, value);
}

/**
 * ======================
 * Declaration Extensions
 * ======================
 */

/**
 * Get the symbol that the statement declared.
 */
export function getDeclarationSymbol(decl: DeclarationStatement | ArrayDeclarationStatement): LocalVariableSymbol {
    return Node.attribute<LocalVariableSymbol>('symbol').get(decl);
}

/**
 * Set the symbol that the statement declared.
 */
export function setDeclarationSymbol(decl: DeclarationStatement | ArrayDeclarationStatement, value: LocalVariableSymbol) {
    Node.attribute<LocalVariableSymbol>('symbol').set(decl, value);
}

/**
 * =====================
 * Expression Extensions
 * =====================
 */

/**
 * Get the symbol that the variable references.
 */
export function getVariableReference(expr: VariableExpression): Symbol | null {
    return Node.attributeOrNull<Symbol>('reference').get(expr);
}

/**
 * Set the symbol that the variable references.
 */
export function setVariableReference(expr: VariableExpression, value: Symbol | null) {
    Node.attributeOrNull<Symbol>('reference').set(expr, value);
}

/**
 * Get the symbol that the expression references.
 */
export function getCallReference(expr: CallExpression): Symbol | null {
    return Node.attributeOrNull<Symbol>('symbol').get(expr);
}

/**
 * Set the symbol that the expression references.
 */
export function setCallReference(expr: CallExpression, value: Symbol | null) {
    Node.attributeOrNull<Symbol>('symbol').set(expr, value);
}

/**
 * Get the optional symbol assigned to [StringLiteral]s if the string is meant to represent some other reference.
 */
export function getStringReference(expr: StringLiteral): Symbol | null {
    return Node.attributeOrNull<Symbol>('symbol').get(expr);
}

/**
 * Set the optional symbol assigned to [StringLiteral]s if the string is meant to represent some other reference.
 */
export function setStringReference(expr: StringLiteral, value: Symbol | null) {
    Node.attributeOrNull<Symbol>('symbol').set(expr, value);
}

/**
 * Get the optional expression that was parsed from within the string literal.
 */
export function getStringSubExpression(expr: StringLiteral): Expression | null {
    return Node.attributeOrNull<Expression>('subExpression').get(expr);
}

/**
 * Set the optional expression that was parsed from within the string literal.
 */
export function setStringSubExpression(expr: StringLiteral, value: Expression | null) {
    Node.attributeOrNull<Expression>('subExpression').set(expr, value);
}

/**
 * Get the symbol the identifier references.
 */
export function getIdentifierReference(expr: Identifier): Symbol | null {
    return Node.attributeOrNull<Symbol>('reference').get(expr);
}

/**
 * Set the symbol the identifier references.
 */
export function setIdentifierReference(expr: Identifier, value: Symbol | null) {
    Node.attributeOrNull<Symbol>('reference').set(expr, value);
}

/**
 * An optional expression that was parsed from within the string literal.
 */
export function getConstantSubExpression(expr: ConstantVariableExpression): Expression | null {
    return Node.attributeOrNull<Expression>('subExpression').get(expr);
}

export function setConstantSubExpression(expr: ConstantVariableExpression, value: Expression | null) {
    Node.attributeOrNull<Expression>('subExpression').set(expr, value);
}

/**
 * The type that the expression would evaluate to.
 *
 * @see Expression.nullableType
 */
export function getExpressionType(expr: Expression): Type {
    return Node.attribute<Type>('type').get(expr);
}

export function setExpressionType(expr: Expression, value: Type) {
    Node.attribute<Type>('type').set(expr, value);
}

/**
 * The type that the expression would evaluate to, or `null`.
 *
 * @see Expression.type
 */
export function getExpressionNullableType(expr: Expression): Type | null {
    return Node.attributeOrNull<Type>('type').get(expr);
}

export function setExpressionNullableType(expr: Expression, value: Type | null) {
    Node.attributeOrNull<Type>('type').set(expr, value);
}

/**
 * Allows parents of a node to define the expected type to help with identifier ambiguity.
 */
export function getExpressionTypeHint(expr: Expression): Type | null {
    return Node.attributeOrNull<Type>('typeHint').get(expr);
}

export function setExpressionTypeHint(expr: Expression, value: Type | null) {
    Node.attributeOrNull<Type>('typeHint').set(expr, value);
}