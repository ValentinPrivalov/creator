import {Log} from "../../util/log";
import {Collection} from "../../util/collection";

export class EventManager {
    private eventCollection: Collection<IEvent> = new Collection();

    public raise(eventData: IEventData): void {
        if (this.eventCollection.has(eventData.name)) {
            this.eventCollection.get(eventData.name).listeners.forEach((listener: any): void => listener(eventData));
        } else {
            Log.warn(eventData.name + `: event isn't listened by any entity`);
        }
    }

    public addEventListener(eventName: string, listener: any): void {
        if (!this.eventCollection.has(eventName)) {
            const event: IEvent = {name: eventName, listeners: []};
            this.eventCollection.add(eventName, event);
        }
        this.eventCollection.get(eventName).listeners.push(listener);
    }
}

export interface IEvent {
    name: string;
    listeners: Array<any>;
}

export interface IEventData {
    name: string;
    body: any;
}
