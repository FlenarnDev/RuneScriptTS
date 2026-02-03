import { AstVisitor } from '../AstVisitor';
import { Expression } from '../expr/Expression';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Statement } from './Statement';

/**
 * Represents an [Expression] that is being called as a statement.
 *
 * Example:
 * ```
 * <cc_settext("Example text")>;
 * ```
 */
export class ExpressionStatement extends Statement {
    public readonly expression: Expression;

    constructor(source: NodeSourceLocation, expression: Expression) {
        super(source);
        this.expression = expression;

        this.addChild(expression);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitExpressionStatement(this);
    }
}