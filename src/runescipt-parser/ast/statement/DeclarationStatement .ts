import { AstVisitor } from '../AstVisitor';
import { Expression } from '../expr/Expression';
import { Identifier } from '../expr/Identifier';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Token } from '../Token';
import { Statement } from './Statement';

/**
 * Represents a local variable declaration statement that defines the variables [typeToken], [name], and an optional
 * [initializer].
 *
 * Example:
 * ```
 * def_int $var1 = 0;
 * ```
 */
export class DeclarationStatement extends Statement {
    public readonly typeToken: Token;
    public readonly name: Identifier;
    public readonly initializer?: Expression;

    constructor(
        source: NodeSourceLocation,
        typeToken: Token,
        name: Identifier,
        initializer?: Expression
    ) {
        super(source);
        this.typeToken = typeToken;
        this.name = name;
        this.initializer = initializer;

        this.addChild(typeToken);
        this.addChild(name);
        if (initializer) {
            this.addChild(initializer);
        }
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitDeclarationStatement(this);
    }
}