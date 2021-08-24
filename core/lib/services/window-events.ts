import {Collection} from "../../util/collection";

export class WindowEvents {
    private _handlers: Collection<any> = new Collection();

    public add(eventName: string, handler: any): void {
        this._handlers.add(eventName, handler);
        window.addEventListener(eventName, handler);
    }

    public remove(eventName: string): void {
        if (this._handlers.has(eventName)) {
            window.removeEventListener(eventName, this._handlers.get(eventName));
            this._handlers.remove(eventName);
        }
    }
}

export class WindowEventNames {
    static RESIZE: string = 'resize';
    static MOUSE_WHEEL: string = 'mousewheel';
}

export interface IWindowMouseWheelEventData {
    deltaX: number;
    deltaY: number;
}
