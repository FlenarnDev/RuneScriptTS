import { SymbolLoader } from "../runescript-compiler/configuration/SymbolLoader";
import { ScriptCompiler } from "../runescript-compiler/ScriptCompiler";
import { SymbolTable } from "../runescript-compiler/symbol/SymbolTable";
import { MetaType } from "../runescript-compiler/type/MetaType";
import { TupleType } from "../runescript-compiler/type/TupleType";
import { Type } from "../runescript-compiler/type/Type";
import { SymbolMapper } from "./SymbolMapper";
import { readFileSync } from "fs";

export class TsvProtectedSymbolLoader extends SymbolLoader {
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
    ): TsvProtectedSymbolLoader {
        return new TsvProtectedSymbolLoader(mapper, path, () => type);
    }

    override load(table: SymbolTable, compiler: ScriptCompiler): void {
        const lines = readFileSync(this.path, "utf8").split("\n");

        for (const line of lines) {
            if (!line) continue;

            const split = line.split("\t");
            if (split.length < 2) {
                continue;
            }

            const id = Number(split[0]);
            const name = split[1];

            const subTypes = split.length >= 3 && split[2] !== "none" ? TupleType.fromList(split[2].split(",").map(typeName => compiler.types.find(typeName) ?? MetaType.Error)) : MetaType.Unit;

            const isProtected = split.length >= 4 ? split[3] === "true" : false;

            const type = this.typeSupplier(subTypes);

            const symbol = this.addBasic(table, type, name, isProtected);
            this.mapper.putSymbol(id, symbol);
        }
    }
}