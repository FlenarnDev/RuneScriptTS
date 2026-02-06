import { AstVisitor } from "../../runescipt-parser/ast/AstVisitor";
import { BinaryExpression } from "../../runescipt-parser/ast/expr/BinaryExpression";
import { CalcExpression } from "../../runescipt-parser/ast/expr/CalcExpression";
import { CommandCallExpression } from "../../runescipt-parser/ast/expr/call/CommandCallExpression";
import { Identifier } from "../../runescipt-parser/ast/expr/Identifier";
import { JoinedStringExpression } from "../../runescipt-parser/ast/expr/JoinedStringExpression";
import { CharacterLiteral } from "../../runescipt-parser/ast/expr/literal/CharacterLiteral";
import { Literal } from "../../runescipt-parser/ast/expr/literal/Literal";
import { NullLiteral } from "../../runescipt-parser/ast/expr/literal/NullLiteral";
import { StringLiteral } from "../../runescipt-parser/ast/expr/literal/StringLiteral";
import { StringPart, BasicStringPart, ExpressionStringPart } from "../../runescipt-parser/ast/expr/StringPart";
import { ConstantVariableExpression } from "../../runescipt-parser/ast/expr/variable/ConstantVariableExpression";
import { GameVariableExpression } from "../../runescipt-parser/ast/expr/variable/GameVariableExpression";
import { LocalVariableExpression } from "../../runescipt-parser/ast/expr/variable/LocalVariableExpression";
import { Node } from "../../runescipt-parser/ast/Node";

export class ExpressionGenerator extends AstVisitor<string> {
    override visitBinaryExpression(expr: BinaryExpression): string {
        return `${this.visit(expr.left)} ${expr.operator.text} ${this.visit(expr.right)}`;
    }

    override visitCalcExpression(expr: CalcExpression): string {
        return `calc${this.visit(expr.expression)}`;
    }

    override visitCommandCallExpression(expr: CommandCallExpression): string {
        let result = '~' + this.visit(expr.name);

        if (expr.arguments.length > 0) {
            result += '(';
            result += expr.arguments.map(arg => this.visit(arg)).join('');
            result += ')';
        }

        return result;
    }

    override visitLocalVariableExpression(expr: LocalVariableExpression): string {
        return `$${this.visit(expr.name)}`;
    }
    
    override visitGameVariableExpression(expr: GameVariableExpression): string {
        return `%${this.visit(expr.name)}`;
    }
    
    override visitConstantVariableExpression(expr: ConstantVariableExpression): string {
        return `^${this.visit(expr.name)}`;
    }
    
    override visitCharacterLiteral(literal: CharacterLiteral): string {
        return `'${literal.value}'`;
    }
    
    override visitNullLiteral(_: NullLiteral): string {
        return 'null';
    }
    
    override visitStringLiteral(literal: StringLiteral): string {
        return `"${literal.value}"`;
    }

    override visitLiteral(literal: Literal<unknown>): string {
        return String(literal.value);
    }

    override visitJoinedStringExpression(expr: JoinedStringExpression): string {
        let result = '"';
        
        for (const part of expr.parts) {
            result += this.visit(part);
        }
    
        result += '"';
        return result;
    }
    
    override visitJoinedStringPart(part: StringPart): string {
        if (part instanceof BasicStringPart) {
            return part.value;
        }
    
        if (part instanceof ExpressionStringPart) {
            return `<${this.visit(part.expression)}>`;
        }
    
        throw new Error(`Unsupported StringPart: ${part}`);
    }

    override visitIdentifier(identifier: Identifier): string {
        return identifier.text;
    }

    /**
     * Calls [Node.accept] on all nodes in a list.
     */
    private visit(node: Node) {
        node.accept(this);
    }
}