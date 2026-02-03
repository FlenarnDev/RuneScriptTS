import { AstVisitor } from '../AstVisitor';
import { Node } from '../Node';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Expression } from './Expression';

/**
 * Represents a piece of a [JoinedStringExpression]
 */
export abstract class StringPart extends Node {
    constructor(source: NodeSourceLocation) {
        super(source);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitJoinedStringPart(this);
    }
}

/**
 * A basic part that contains only text.
 */
export class BasicStringPart extends StringPart {
    public readonly value: string;

    constructor(source: NodeSourceLocation, value: string) {
        super(source);
        this.value = value;
    }
}

/**
 * A basic part that contains a `<p,name>` tag.
 */
export class PTagStringPart extends BasicStringPart {
    constructor(source: NodeSourceLocation, text: string) {
    super(source, text);
  }
}

/**
 * A part that contains an [Expression] that will be executed.
 */
export class ExpressionStringPart extends StringPart {
    public readonly expression: Expression;

    constructor(source: NodeSourceLocation, expression: Expression) {
        super(source);
        this.expression = expression;

        this.addChild(expression);
    }
}