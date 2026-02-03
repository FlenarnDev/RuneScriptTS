import { AstVisitor } from '../AstVisitor';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Expression } from './Expression';
import { StringPart } from './StringPart';

/**
 * Represents an interpolated string that contains multiple [parts] to make it up.
 *
 * Example:
 * ```
 * "The value of $var is <$var>."
 * ```
 */
export class JoinedStringExpression extends Expression {
    public readonly parts: StringPart[];

    constructor(source: NodeSourceLocation, parts: StringPart[]) {
        super(source);
        this.parts = parts;

        this.addChildren(parts);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitJoinedStringExpression(this);
    }
}