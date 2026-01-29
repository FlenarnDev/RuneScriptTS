import { TriggerType } from '../trigger/TriggerType';
import { Type } from '../type/Type';

/**
 * A script symbol is a type of symbol that defines any type of script. Each script
 * must define its trigger type, name, parameter type(s), and return type(s).
 */
export type ScriptSymbol =
    /**
     * A [ScriptSymbol] type specific for server sided scripts.
     */
    | {
          kind: 'ServerScriptSymbol';
          trigger: TriggerType;
          name: string;
          parameters: Type;
          returns: Type;
      }
      
    /**
     * A [ScriptSymbol] type specific for client sided scripts.
     */
    | {
          kind: 'ClientScriptSymbol';
          trigger: TriggerType;
          name: string;
          parameters: Type;
          returns: Type;
      };