import { AstVisitor } from "../../AstVisitor";
import { CallExpression } from "./CallExpression";

/**
 * A CallExpression for jumping to a label.
 */
export class JumpCallExpression extends CallExpression {
  accept<R>(visitor: AstVisitor<R>): R {
    return visitor.visitJumpCallExpression(this);
  }
}