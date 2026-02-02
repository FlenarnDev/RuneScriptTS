import { Node } from "../../runescipt-parser/ast/Node";
import { Diagnostic } from "./Diagnostic";
import { Diagnostics } from "./Diagnostics";
import { DiagnosticType } from "./DiagnosticType";

/**
 * Helper function to report a diagnostic with the type of [DiagnosticType.INFO].
 */
export function reportInfo(diagnostics: Diagnostics, node: Node, message: string, ...args: unknown[]) {
    diagnostics.report(new Diagnostic(DiagnosticType.INFO, node, message, ...args));
}
/**
 * Helper function to report a diagnostic with the type of [DiagnosticType.WARNING].
 */
export function reportWarning(diagnostics: Diagnostics, node: Node, message: string, ...args: unknown[]) {
    diagnostics.report(new Diagnostic(DiagnosticType.WARNING, node, message, ...args));
}
/**
 * Helper function to report a diagnostic with the type of [DiagnosticType.ERROR].
 */
export function reportError(diagnostics: Diagnostics, node: Node, message: string, ...args: unknown[]) {
    diagnostics.report(new Diagnostic(DiagnosticType.ERROR, node, message, ...args))
}