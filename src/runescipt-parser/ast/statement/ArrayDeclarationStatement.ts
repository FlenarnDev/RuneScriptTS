import { LocalVariableSymbol } from '../../../runescript-compiler/symbol/Symbol';
import { AstVisitor } from '../AstVisitor';
import { Expression } from '../expr/Expression';
import { Identifier } from '../expr/Identifier';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Token } from '../Token';
import { Statement } from './Statement';

/**
 * Represents a local array variable declaration with the given [typeToken] and [name]. The [initializer] is what determines
 * the array size.
 *
 * Example:
 * ```
 * def_int $ints(50);
 * ```
 */
export class ArrayDeclarationStatement extends Statement {
    public readonly typeToken: Token;
    public readonly name: Identifier;
    public readonly initializer: Expression;
    public symbol: LocalVariableSymbol;

    constructor(
        source: NodeSourceLocation,
        typeToken: Token,
        name: Identifier,
        initializer: Expression
    ) {
        super(source);
        this.typeToken = typeToken;
        this.name = name;
        this.initializer = initializer;

    
        this.addChild(typeToken);
        this.addChild(name);
        this.addChild(initializer);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitArrayDeclarationStatement(this);
    }
}