import { AstVisitor } from '../AstVisitor';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { CallExpression } from './call/CallExpression';
import { Expression } from './Expression';
import { Identifier } from './Identifier';

/**
 * A parsed ClientScript reference.
 *
 * Example:
 * ```
 * some_handler(){var1}
 * ```
 */
export class ClientScriptExpression extends CallExpression  {
  public readonly transmitList: Expression[];

  constructor(
    source: NodeSourceLocation,
    name: Identifier,
    argumentsList: Expression[],
    transmitList: Expression[]
  ) {
    super(source, name, argumentsList);
    this.transmitList = transmitList;

    this.addChildren(transmitList);
  }

  accept<R>(visitor: AstVisitor<R>): R {
    return visitor.visitClientScriptExpression(this);
  }
}
