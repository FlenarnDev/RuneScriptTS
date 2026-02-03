import { AstVisitor } from '../AstVisitor';
import { Expression } from '../expr/Expression';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Token } from '../Token';
import { Statement } from './Statement';
import { SwitchCase } from './SwitchCase';

/**
 * Represents a switch statement for a given [typeToken]. Switch statements contain a single [condition] (what to switch on)
 * and a list of [cases].
 *
 * Example:
 * ```
 * switch_int ($var) {
 *     case 1 : mes("matched 1");
 *     case 2 : mes("matched 2");
 *     case default : mes("unmatched: <tostring($var)>");
 * }
 * ```
 */
export class SwitchStatement extends Statement {
    public readonly typeToken: Token;
    public readonly condition: Expression;
    public readonly cases: SwitchCase[];

    constructor(
        source: NodeSourceLocation,
        typeToken: Token,
        condition: Expression,
        cases: SwitchCase[]
    ) {
        super(source);
        this.typeToken = typeToken;
        this.condition = condition;
        this.cases = cases;

        this.addChild(typeToken);
        this.addChild(condition);
        this.addChildren(cases);
    }
    
    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitSwitchStatement(this);
    }
}