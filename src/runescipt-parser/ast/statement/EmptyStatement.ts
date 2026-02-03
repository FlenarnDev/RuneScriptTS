import { AstVisitor } from '../AstVisitor';
import { NodeSourceLocation } from '../NodeSourceLocation';
import { Statement } from './Statement';

/**
 * Represents a statement with no code attached.
 *
 * Example:
 * ```
 * ;
 * ```
 */
export class EmptyStatement extends Statement {
    constructor(source: NodeSourceLocation) {
        super(source);
    }

    accept<R>(visitor: AstVisitor<R>): R {
        return visitor.visitEmptyStatement(this);
    }
}