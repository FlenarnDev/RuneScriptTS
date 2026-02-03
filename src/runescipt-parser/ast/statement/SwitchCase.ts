import { AstVisitor } from '../AstVisitor';
import { Expression } from '../expr/Expression';
import { Node } from '../Node';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Statement } from './Statement';

/**
 * Represents a single [SwitchStatement] case. Contains the [keys] and the [statements] to run when the switch
 * statements condition matches one of the keys.
 *
 * See [SwitchStatement] for example.
 */
export class SwitchCase extends Node {
    public readonly keys: Expression[];
    public readonly statements: Statement[];

    constructor(
        source: NodeSourceLocation,
        keys: Expression[],
        statements: Statement[]
    ) {
        super(source);
        this.keys = keys;
        this.statements = statements;

        this.addChildren(keys);
        this.addChildren(statements);
    }

    /**
     * Whether or not this switch case qualifies as the default case.
     */
    get isDefault(): boolean {
        return this.keys.length === 0;
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitSwitchCase(this);    
    }
}