import { Node } from './Node';
import { Identifier } from './expr/Identifier';
import { NodeSourceLocation } from './NodeSourceLocation';
import { Token } from './Token';
import { AstVisitor } from './AstVisitor';

/**
 * Represent a single parameter in a [Script].
 * 
 * Example:
 * ```
 * int $some_name
 * ```
 */
export class Parameter extends Node {
    public readonly typeToken: Token;
    public readonly name: Identifier;

    constructor(source: NodeSourceLocation, typeToken: Token, name: Identifier) {
        super(source);
        this.typeToken = typeToken;
        this.name = name;

        this.addChild(typeToken);
        this.addChild(name);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitParameter(this);
    }
}