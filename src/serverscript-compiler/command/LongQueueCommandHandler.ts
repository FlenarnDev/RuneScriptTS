import { DynamicCommandHandler } from "../../runescript-compiler/configuration/command/DynamicCommandHandler";
import { TypeCheckingContext } from "../../runescript-compiler/configuration/command/TypeCheckingContext";
import { MetaType } from "../../runescript-compiler/type/MetaType";
import { PrimitiveType } from "../../runescript-compiler/type/PrimitiveType";
import { TupleType } from "../../runescript-compiler/type/TupleType";
import { Type } from "../../runescript-compiler/type/Type";

export class LongQueueCommandHandler implements DynamicCommandHandler {
    private readonly queueType: InstanceType<typeof MetaType.Script>;

    constructor(queueType: Type) {
        this.queueType = queueType as InstanceType<typeof MetaType.Script>;
    }

    typeCheck(context: TypeCheckingContext): void {
        context.checkArgument(0, this.queueType);
        context.checkArgument(1, PrimitiveType.INT);
        context.checkArgument(2, PrimitiveType.INT);
        context.checkArgument(3, PrimitiveType.INT);

        const expectedTypesList: Type[] = [
            this.queueType,
            PrimitiveType.INT,
            PrimitiveType.INT,
            PrimitiveType.INT,
        ];

        context.checkArgumentTypes(TupleType.fromList(expectedTypesList));
        context.expression.type = MetaType.Unit;
    }
}