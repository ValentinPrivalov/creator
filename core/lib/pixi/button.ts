import { ImageObject } from './layer-object';
import { Layer } from './layer';
import { Log } from '../../util/log';

export class Button {
    private _button: Layer;
    private views: IButtonViews = {
        idle: null,
        active: null,
        disabled: null,
        pressed: null
    };

    constructor(group: Layer) {
        if (!group) {
            Log.warn(`Can't create button without layer`);
            return;
        }
        this._button = group;
        this.initializeStates(group);
    }

    protected initializeStates(group: Layer): void {
        this._button.buttonMode = true;
        this._button.interactive = false;
    }

    public set enable(state: boolean) {
        this._button.interactive = state;
    }

    public on(eventName: string, handler: any): void {
        this._button.on(eventName, handler);
    }
}

export interface IButtonViews {
    idle: ImageObject;
    active: ImageObject;
    disabled: ImageObject;
    pressed: ImageObject;
}
