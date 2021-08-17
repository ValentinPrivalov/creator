import {Container} from "pixi.js";
import {ImageObject} from "./layer-object";

export class Button {
    private _button: Container;
    private views: IButtonViews = {
        idle: null,
        active: null,
        disabled: null,
        pressed: null
    };

    constructor(group: Container) {
        this._button = group;
        this.initializeStates(group);
    }

    protected initializeStates(group: Container): void {
        this._button.buttonMode = true;
        this._button.interactive = true;
    }

    set enable(state: boolean) {
        this._button.interactive = state;
    }

    public on(eventName: string, handler: any): void {
        this._button.on(eventName, handler);
    }
}

export interface IButtonViews {
    idle: ImageObject,
    active: ImageObject,
    disabled: ImageObject,
    pressed: ImageObject
}
