import { SymbolTable } from '../../../runescript-compiler/symbol/SymbolTable';
import { AstVisitor } from '../AstVisitor';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Statement } from './Statement';

/**
 * Represents a block of statements.
 *
 * Example:
 * ```
 * {
 *    <code here>
 * }
 * ```
 */
export class BlockStatement extends Statement {
    public readonly statements: Statement[];
    public scope: SymbolTable;

    constructor(source: NodeSourceLocation, statements: Statement[]) {
        super(source);
        this.statements = statements;

        this.addChildren(statements);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitBlockStatement(this);
    }
}