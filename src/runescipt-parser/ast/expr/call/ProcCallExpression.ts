import { AstVisitor } from "../../AstVisitor";
import { CallExpression } from "./CallExpression";

/**
 * A CallExpression for calling other (proc) scripts.
 */
export class ProcCallExpression extends CallExpression {
  accept<R>(visitor: AstVisitor<R>): R {
    return visitor.visitProcCallExpression(this);
  }
}