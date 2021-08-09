import {AbstractCollection} from "../../util/abstract-collection";

export class WindowEvents {
    private _handlers: AbstractCollection = new AbstractCollection();

    public add(eventName: string, handler: any): void {
        this._handlers.addItem(eventName, handler, false);
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
