import { NodeSourceLocation } from '../../NodeSourceLocation';
import { Expression } from '../Expression';
import { Identifier } from '../Identifier';
import { Symbol } from '../../../../runescript-compiler/symbol/Symbol';

/**
 * A base representation of a variable being used as an [Expression].
 */
// base class for a variable reference, all have an identifier
export abstract class VariableExpression extends Expression {
  public readonly name: Identifier;

  /**
   * The symbol that the variable references.
   */
  public reference: Symbol | null = null;

  protected constructor(source: NodeSourceLocation, name: Identifier) {
    super(source);
    this.name = name;

    this.addChild(name);
  }
}