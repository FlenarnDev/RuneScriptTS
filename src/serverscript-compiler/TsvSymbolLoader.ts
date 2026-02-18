import { SymbolLoader } from "../runescript-compiler/configuration/SymbolLoader";
import { ScriptCompiler } from "../runescript-compiler/ScriptCompiler";
import { SymbolTable } from "../runescript-compiler/symbol/SymbolTable";
import { MetaType } from "../runescript-compiler/type/MetaType";
import { TupleType } from "../runescript-compiler/type/TupleType";
import { Type } from "../runescript-compiler/type/Type";
import { SymbolMapper } from "./SymbolMapper";
import { readFileSync } from "fs";

export class TsvSymbolLoader extends SymbolLoader {
    private readonly mapper: SymbolMapper;
    private readonly path: string;
    private readonly typeSupplier: (subTypes: Type) => Type;

    constructor(
        mapper: SymbolMapper,
        path: string,
        typeSupplier: (subType: Type) => Type
    ) {
        super();
        this.mapper = mapper;
        this.path = path;
        this.typeSupplier = typeSupplier;
    }

    static withType(
        mapper: SymbolMapper,
        path: string,
        type: Type
    ): TsvSymbolLoader {
        return new TsvSymbolLoader(mapper, path, () => type);
    }

    override load(table: SymbolTable, compiler: ScriptCompiler): void {
        const content = readFileSync(this.path, 'utf-8');
        const lines = content.split(/\r?\n/);

        for (const line of lines) {
            if (!line) continue;

            const split = line.split("\t");
            if (split.length < 2) {
                continue;
            }

            const id = Number(split[0]);
            const name = split[1];

            const subTypes = split.length >= 3 ? TupleType.fromList(split[2].split(",").map(typeName => compiler.types.find(typeName) ?? MetaType.Error)) : MetaType.Unit;

            const type = this.typeSupplier(subTypes);

            const symbol = this.addBasic(table, type, name);
            this.mapper.putSymbol(id, symbol);
        }
    }
}