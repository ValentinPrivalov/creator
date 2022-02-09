import { AbstractController } from './controller';
import { IEventData } from '../services/event-manager';

export class AbstractCommand extends AbstractController {
    public execute(notification: IEventData): void {}
}
