import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { Node } from '../ast/Node';
import { ParserRuleContext } from 'antlr4ts';
import { Token as AntlrToken } from 'antlr4ts';
import { NodeSourceLocation } from '../ast/NodeSourceLocation';
import { start } from 'node:repl';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { BlockStatementContext, ExpressionListContext, IfStatementContext, NullLiteralContext, ParameterContext, ParenthesisContext, ReturnStatementContext, ScriptContext, ScriptFileContext, SwitchCaseContext, SwitchStatementContext, WhileStatementContext } from '../../../antlr/out/RuneScriptParser';
import { Expression } from '../ast/expr/Expression';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { Token } from '../ast/Token'
import { ScriptFile } from '../ast/ScriptFile';
import { Script } from '../ast/Scripts';
import { Parameter } from '../ast/Parameter';
import { Statement } from '../ast/statement/Statement';
import { BlockStatement } from '../ast/statement/BlockStatement';
import { NullLiteral } from '../ast/expr/literal/NullLiteral';
import { ReturnStatement } from '../ast/statement/ReturnStatement';
import { IfStatement } from '../ast/statement/IfStatement';
import { WhileStatement } from '../ast/statement/WhileStatement';
import { SwitchStatement } from '../ast/statement/SwitchStatement';
import { SwitchCase } from '../ast/statement/SwitchCase';

/**
 * A visitor that converts an antlr parse tree into an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree). See
 * [Node] implementations for all possible pieces of the tree.
 */
export class AstBuilder implements ParseTreeVisitor<Node> {
        private source: string;
        private lineOffset = 0;
        private columnOffset = 0
    constructor(
        source: string,
        lineoffset: number,
        columnOffset: number
    ) {
        this.source = source;
        this.lineOffset = lineoffset;
        this.columnOffset = columnOffset;
    }

    /**
     * Helper to compute location 
     */
    private getLocationFromNode(node: ParserRuleContext | AntlrToken | TerminalNode): NodeSourceLocation {
        let token: AntlrToken;
        if ('symbol' in node) {
            // TerminalNode
            token = node.symbol;
        } else if ('line' in node) {
            // Token
            token = node as AntlrToken;
        } else {
            // ParserRuleContext
            token = (node as ParserRuleContext).start;
        }

        const columnOffset = token.line === 1 ? this.columnOffset : 0;
        return new NodeSourceLocation(
            this.source,
            token.line + this.lineOffset,
            token.charPositionInLine + columnOffset + 1
        );
    }

    /**
     * Convert an ANTLR token into a NodeSourceLocation
     */
    tokenLocation(token: AntlrToken): NodeSourceLocation {
        return new NodeSourceLocation(
            this.source,
            token.line,
            token.charPositionInLine + 1
        );
    }

    /**
     * Convert an ANTLR token into a AST token.
     */
    antlrTokenToAstToken(token: AntlrToken): any {
        return { location: this.getLocationFromNode(token), text: token.text };
    }

    /**
     * Helpers to visit children 
     */
    public visit<T extends Node>(ctx: ParserRuleContext |TerminalNode | null): T | null {
        if (!ctx) return null;
        return (ctx as any).accept(this) as T;
    }

    public visistList<T extends Node>(ctxs: ParserRuleContext[] | null): T[] {
        if (!ctxs) return [];
        return ctxs.map((c) => this.visit<T>(c)!);
    }

    public visitExpressions(ctx: ExpressionListContext | null): Expression[] {
        if (!ctx) return [];
        return ctx.expression().map((e) => this.visit<Expression>(e)!);
    }

    public visitStatements(ctx: ParserRuleContext[]): Statement[] {
        return ctx.map(c => c.accept(this) as Statement);
    }

    public visitParenthesis(ctx: ParenthesisContext): Expression {
        return this.visit<Expression>(ctx.expression())!;
    }

    /**
     * Replaces escape sequences in a string.
     *
     * @return The string with all escape sequences replaced.
     */
    private unescape(str: string): string {
        return str.replace(/\\(.)/g, (_match, char) => {
            switch (char) {
                case '\\':
                case '"':
                case "'":
                case '<':
                    return char;
                default:
                    throw new Error(`Unsupported escape sequence: \\${char}`);
            }
        });
    }

    /**
     * Default visitors
     */
    visitChildren(node: RuleNode): Node {
        let result: Node | null = null;
        for (let i = 0; i < node.childCount; i++) {
            const child =  node.getChild(i);
            const childResult = child.accept(this);
        }
        return result!;
    }

    visitTerminal(node: TerminalNode): Node {
        return new Token(this.tokenLocation(node.symbol), node.text);
    }

    visitErrorNode(node: ErrorNode): Node {
        throw new Error(`Error node encountered: ${node.text}`);
    }

    /**
     * Visitor methods
     */
    visitScriptFile(ctx: ScriptFileContext): ScriptFile {
        return new ScriptFile(
            this.getLocationFromNode(ctx),
            ctx.script().map(s => s.accept(this) as Script)
        );
    }

    visitScript(ctx: ScriptContext): Script {
        const returns = ctx.typeList()?.IDENTIFIER()?.map(t => this.antlrTokenToAstToken(t.symbol));

        return new Script(
            this.getLocationFromNode(ctx),
            ctx._trigger.accept(this) as any, // cast to Identifier
            ctx._name.accept(this) as any,
            !!ctx.MUL(),
            ctx.parameterList()?.parameter().map(p => p.accept(this) as Parameter),
            returns,
            ctx.statement().map(s => s.accept(this) as Statement)
        );
    }

    visitParameter(ctx: ParameterContext): Parameter {
        return new Parameter(
            this.getLocationFromNode(ctx),
            this.antlrTokenToAstToken(ctx._type),
            ctx.advancedIdentifier().accept(this) as any
        );
    }

    visitBlockStatement(ctx: BlockStatementContext): BlockStatement {
        return new BlockStatement(this.getLocationFromNode(ctx), this.visitStatements(ctx.statement()))
    }

    visitRetrunStatemant(ctx: ReturnStatementContext): ReturnStatement {
        return new ReturnStatement(this.getLocationFromNode(ctx), this.visitExpressions(ctx.expressionList()));
    }

    visitIfStatement(ctx: IfStatementContext): IfStatement {
        return new IfStatement(
            this.getLocationFromNode(ctx),
            ctx.condition().accept(this) as Expression,
            ctx.statement(0).accept(this) as Statement,
            ctx.statement(1)?.accept(this) as Statement | null
        );
    }

    visitWhileStatement(ctx: WhileStatementContext): WhileStatement {
        return new WhileStatement(
            this.getLocationFromNode(ctx),
            ctx.condition().accept(this) as Expression,
            ctx.statement().accept(this) as Statement
        );
    }

    visitSwitchStatement(ctx: SwitchStatementContext): SwitchStatement {
        return new SwitchStatement(
            this.getLocationFromNode(ctx),
            this.antlrTokenToAstToken(ctx.SWITCH_TYPE().symbol),
            ctx.parenthesis().accept(this) as Expression,
            ctx.switchCase().map(c => c.accept(this) as SwitchCase)
        );
    }

    visitSwitchCase(ctx: SwitchCaseContext): SwitchCase {
        return new SwitchCase(
            this.getLocationFromNode(ctx),
            this.visitExpressions(ctx.expressionList()),
            ctx.statement()?.map(s => s.accept(this) as Statement) ?? []
        );
    }

    visitNullLiteral(ctx: NullLiteralContext): NullLiteral {
        return new NullLiteral(this.getLocationFromNode(ctx));
    }
}