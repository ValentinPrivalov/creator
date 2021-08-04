import {Log} from "../log";

export class EventManager implements IEventManager {
    private static _instance: IEventManager;
    protected events: { [key: string]: IEvent } = {};

    static instance(): IEventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    raise(eventData: IEventData): void {
        if (this.events[eventData.name] && this.events[eventData.name].listeners.length !== 0) {
            this.events[eventData.name].listeners.forEach((listener: any): void => listener(eventData));
        } else {
            Log.warn('Empty event: ' + eventData.name);
        }
    }

    addEventListener(eventName: string, listener: any): void {
        if (!this.events[eventName]) {
            this.events[eventName] = {name: eventName, listeners: []} as IEvent;
        }
        this.events[eventName].listeners.push(listener);
    }
}

export interface IEventManager {
    raise(eventData: IEventData): void;

    addEventListener(eventName: string, listener: any): void;
}

export interface IEvent {
    name: string;
    listeners: Array<any>;
}

export interface IEventData {
    name: string;
    body: any;
}
