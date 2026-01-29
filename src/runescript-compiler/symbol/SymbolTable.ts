import { Symbol } from './Symbol';
import { SymbolType } from './SymbolType';

/**
 * A table that contains [Symbol]s. The table provides helper functions for inserting and looking up symbols.
 *
 * The table may or may not have a [parent]. To create a symbol table with a `parent`, see [createSubTable].
 *
 * See Also: [Symbol table](https://en.wikipedia.org/wiki/Symbol_table)
 * @see createSubTable
 */
export class SymbolTable {
   /**
     * Table of all symbols defined in the table. This does not include symbols
     * defined in a parent.
     */
    private symbols: Map<string, Map<string, Symbol>> = new Map();
    private parent: SymbolTable | null;

    // Default constructor that just defines null parent.
    constructor(parent: SymbolTable | null = null) {
        this.parent = null;
    }

    /**
     * Inserts [symbol] into the table and indicates if the insertion was
     * successful.
     */
    insert<T extends Symbol>(type: SymbolType<T>, symbol: T): boolean {
        // Prevent shadowing of symbols with the same type by traversing up
        // the tree to check if the symbol exists in any of them
        let current: SymbolTable | null = this;
        while (current) {
            const typeMap = current.symbols.get(type.kind);
            if (typeMap && typeMap.has(symbol.name)) {
                return false; // Symbol already exists
            }
            current = current.parent;
        }

        // Insert in current table
        let typeMap = this.symbols.get(type.kind);
        if (!typeMap) {
            typeMap = new Map<string, Symbol>();
            this.symbols.set(type.kind, typeMap);
        }
        typeMap.set(symbol.name, symbol);
        return true;
    }

   /**
     * Searches for a symbol with [name] and [type]. If one is not found the
     * search it applied to the parent table recursively.
     */
    find<T extends Symbol>(type: SymbolType<T>, name: string): T | undefined {
        const typeMap = this.symbols.get(type.kind);
        if (typeMap && typeMap.has(name)) {
            return typeMap.get(name) as T;
        }
        return this.parent?.find(type, name);
    }

    /**
     * Searches for all symbols in the table and all parent tables with the name of [name],
     * and optionally a [type].
     */
    findAll<T extends Symbol>(
        name: string,
        typeKind?: SymbolType<T>['kind']
    ): T[] {
        const results: T[] = [];

        for (const [kind, typeMap] of this.symbols) {
            if (!typeKind || kind === typeKind) {
                const symbol = typeMap.get(name);
                if (symbol && (!typeKind || (symbol as any).kind === typeKind)) {
                    results.push(symbol as T);
                }
            }
        }

        if (this.parent) {
            results.push(...(this.parent.findAll(name, typeKind) as T[]));
        }

        return results;
    }

    /**
     * Creates a new [SymbolType] with `this` as the parent.
     */
    createSubTable(): SymbolTable {
        return new SymbolTable(this);
    }
}