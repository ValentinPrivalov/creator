import {Collection} from "../../util/collection";

export class WindowEvents {
    private _handlers: Collection = new Collection();

    public add(eventName: string, handler: any): void {
        this._handlers.addItem(eventName, handler);
        window.addEventListener(eventName, handler);
    }

    public remove(eventName: string): void {
        this._handlers.removeItem(eventName);
        window.removeEventListener(eventName, this._handlers.getItem(eventName));
    }
}

export class WindowEventNames {
    static RESIZE: string = 'resize';
}
