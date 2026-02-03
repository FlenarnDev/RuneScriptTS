import { AstVisitor } from '../AstVisitor';
import { Expression } from '../expr/Expression';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Statement } from './Statement';

/**
 * Represents a return statement that can have any number of [expressions].
 *
 * Example:
 * ```
 * return(1, 2, 3);
 * ```
 */
export class ReturnStatement extends Statement {
    public readonly expressions: Expression[];

    constructor(source: NodeSourceLocation, expressions: Expression[]) {
        super(source);
        this.expressions = expressions;

        this.addChildren(expressions);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitReturnStatement(this);
    }
}