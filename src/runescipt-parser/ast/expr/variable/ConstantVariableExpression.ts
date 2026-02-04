import { AstVisitor } from '../../AstVisitor';
import { NodeSourceLocation } from '../../NodeSourceLocation';
import { Expression } from '../Expression';
import { Identifier } from '../Identifier';
import { VariableExpression } from './VariableExpression';

/**
 * A [VariableExpression] implementation that represents a constant variable reference.
 *
 * Example:
 * ```
 * ^var
 * ```
 */
export class ConstantVariableExpression extends VariableExpression {
  public subExpression: Expression | null = null;

  constructor(source: NodeSourceLocation, name: Identifier) {
    super(source, name);
  }

  accept<R>(visitor: AstVisitor<R>): R {
    return visitor.visitConstantVariableExpression(this);
  }
}