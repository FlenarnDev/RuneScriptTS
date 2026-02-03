import { AstVisitor } from '../../AstVisitor';
import { NodeSourceLocation } from '../../NodeSourceLocation';
import { Expression } from '../Expression';
import { Identifier } from '../Identifier';
import { CallExpression } from './CallExpression';

/**
 * A CallExpression for command calls.
 */
export class CommandCallExpression extends CallExpression {
  public readonly arguments2?: Expression[];

  constructor(
    source: NodeSourceLocation,
    name: Identifier,
    args: Expression[],
    args2?: Expression[]
  ) {
    super(source, name, args);
    this.arguments2 = args2;

    if (args2) {
      this.addChildren(args2);
    }
  }

  get isStar(): boolean {
    return this.arguments2 != null;
  }

  get nameString(): string {
    return this.isStar ? `${this.name.text}*` : this.name.text;
  }

  accept<R>(visitor: AstVisitor<R>): R {
    return visitor.visitCommandCallExpression(this);
  }
}