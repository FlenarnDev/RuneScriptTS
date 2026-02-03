import { AstVisitor } from "../AstVisitor";
import { NodeSourceLocation } from "../NodeSourceLocation";
import { Expression } from "./Expression";

/**
 * An expression that allows doing math operations inside.
 * 
 * Example:
 * ```
 * calc(1 + 1 / 2)
 * ```
 */
export class CalcExpression extends Expression {
    public readonly expression: Expression;
    
    constructor(source: NodeSourceLocation, expression: Expression) {
        super(source);
        this.expression = expression;

        this.addChild(expression);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitCalcExpression(this);
    }
} 