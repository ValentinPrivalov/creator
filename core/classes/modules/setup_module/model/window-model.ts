import {Collection} from "../../../../util/collection";
import {AbstractModel} from "../../../../lib/mvc/model";
import {WindowEventNames} from "../static/window-event-names";
import {IKeyboardEvent, IWindowEventData, IWindowMouseWheelEventData} from "../static/setup-interfaces";
import {Names} from "../../../../global/names";
import {StateManager} from "../../../../lib/services/state-manager";

export class WindowModel extends AbstractModel {
    private _handlers: Collection<IWindowEventData> = new Collection();
    protected stateManager: StateManager;

    public onRegister() {
        super.onRegister();
        this.stateManager = this.services.get(Names.Services.STATE_MANAGER) as StateManager;
        window.addEventListener(WindowEventNames.RESIZE, this.onResize.bind(this));
        window.addEventListener(WindowEventNames.MOUSE_WHEEL, this.onMouseWheel.bind(this));
        window.addEventListener(WindowEventNames.KEY_DOWN, this.onKeyDown.bind(this));
    }

    public add(data: IWindowEventData): void {
        this._handlers.push(data);
    }

    public remove(eventName: string): void {
        if (this._handlers.has(eventName)) {
            this._handlers.remove(eventName);
        }
    }

    protected onResize(): void {
        const currentState: string = this.stateManager.getCurrent();

        this._handlers.forEach((item: IWindowEventData) => {
            if (item.eventName === WindowEventNames.RESIZE && (item.allStates || item.states.includes(currentState))) {
                item.handler?.();
            }
        });
    }

    protected onMouseWheel(data: IWindowMouseWheelEventData): void {
        const currentState: string = this.stateManager.getCurrent();

        this._handlers.forEach((item: IWindowEventData) => {
            if (item.eventName === WindowEventNames.MOUSE_WHEEL && (item.allStates || item.states.includes(currentState))) {
                item.handler?.(data);
            }
        });
    }

    protected onKeyDown(data: IKeyboardEvent): void {
        const currentState: string = this.stateManager.getCurrent();

        this._handlers.forEach((item: IWindowEventData) => {
            if (item.eventName === WindowEventNames.KEY_DOWN && (item.allStates || item.states.includes(currentState))) {
                if (item.data?.includes(data.keyCode)) {
                    item.handler?.(data);
                }
            }
        });
    }
}
