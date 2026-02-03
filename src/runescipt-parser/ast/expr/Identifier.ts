import { AstVisitor } from "../AstVisitor";
import { NodeSourceLocation } from "../NodeSourceLocation";
import { Expression } from "./Expression";

/**
 * Represent some kind of identifier within code.
 * 
 * Examples: `abyssal_whip`, `smithing:arrowheads`
 */
export class Identifier extends Expression {
    public readonly text: string;

    constructor(source: NodeSourceLocation, text: string) {
        super(source);
        this.text = text;
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitIdentifier(this);
    }
}