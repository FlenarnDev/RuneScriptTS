import { SubjectMode } from './SubjectMode';
import { TriggerType } from './TriggerType';

export const CommandTrigger: TriggerType = {
    id: -1,
    identifier: 'command',
    subjectMode: SubjectMode.Name,
    allowParameters: true,
    parameters: null,
    allowReturns: true,
    returns: null,
    pointers: null
}