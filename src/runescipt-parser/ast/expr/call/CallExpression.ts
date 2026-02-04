import { NodeSourceLocation } from '../../NodeSourceLocation';
import { Expression } from '../Expression';
import { Identifier } from '../Identifier';
import { Symbol } from '../../../../runescript-compiler/symbol/Symbol';

/**
 * The base expression for all types of call expressions.
 */
export abstract class CallExpression extends Expression {
  public readonly name: Identifier;
  public readonly arguments: Expression[];

  public symbol: Symbol | null;

  constructor(source: NodeSourceLocation, name: Identifier, args: Expression[]) {
    super(source);
    this.name = name;
    this.arguments = args;

    this.addChild(name);
    this.addChildren(args);
  }
}