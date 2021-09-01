import {Collection} from "../../../../util/collection";
import {AbstractModel} from "../../../../lib/mvc/model";
import {WindowEventNames} from "../static/window-event-names";
import {IKeyboardEvent, IWindowEventData} from "../static/setup-interfaces";
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
        window.addEventListener(WindowEventNames.KEY_DOWN, this.onKeyEvent.bind(this));
        window.addEventListener(WindowEventNames.KEY_UP, this.onKeyEvent.bind(this));
    }

    public add(data: IWindowEventData): void {
        this._handlers.push(data);
    }

    public remove(eventName: string): void {
        if (this._handlers.has(eventName)) {
            this._handlers.remove(eventName);
        }
    }

    protected onWindowEvent(event: Event, handler?: Function): void {
        const currentState: string = this.stateManager.getCurrent();

        this._handlers.forEach((item: IWindowEventData) => {
            if (item.eventName === event.type && (item.allStates || item.states.includes(currentState))) {
                handler ?
                    handler(item, event) :
                    item.handler(event);
            }
        });
    }

    protected onResize(event: Event): void {
        this.onWindowEvent(event);
    }

    protected onMouseWheel(event: WheelEvent): void {
        this.onWindowEvent(event);
    }

    protected onKeyEvent(event: IKeyboardEvent): void {
        this.onWindowEvent(event, (item: IWindowEventData, event: IKeyboardEvent) => {
            if (item.data?.includes(event.keyCode)) {
                item.handler?.(event);
            }
        });
    }
}
