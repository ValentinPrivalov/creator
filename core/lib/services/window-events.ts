import {Collection} from "../../util/collection";

export class WindowEvents {
    private _handlers: Collection = new Collection();

    public add(eventName: string, handler: any): void {
        this._handlers.add(eventName, handler);
        window.addEventListener(eventName, handler);
    }

    public remove(eventName: string): void {
        this._handlers.remove(eventName);
        window.removeEventListener(eventName, this._handlers.get(eventName));
    }
}

export class WindowEventNames {
    static RESIZE: string = 'resize';
}
