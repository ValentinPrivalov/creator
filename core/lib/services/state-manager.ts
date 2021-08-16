import {Collection} from "../../util/collection";
import {States} from "../../global/states";
import {Log} from "../../util/log";
import {Mvc} from "./mvc";
import {Names} from "../../global/names";
import {Services} from "../services";
import {Notifications} from "../../global/notifications";

export class StateManager {
    private _states: Collection<IStateParams> = new Collection();
    private _currentState: string = States.INIT;

    get mvc(): Mvc {
        return Services.instance().get(Names.Services.MVC) as Mvc;
    }

    public registerState(id: string, stateParams: IStateParams): void {
        this._states.add(id, stateParams);
    }

    public setState(id: string): void {
        const stateParams: IStateParams = this._states.get(id);

        if (!stateParams) {
            Log.warn(`Unregistered state ${id}`);
            return;
        }

        if (stateParams.from.includes(this._currentState)) {
            Log.info(`State: ${id} (from ${this._currentState})`)
            const previous: string = this._currentState;
            this._currentState = id;
            this.mvc.sendNotification(Notifications.STATE_CHANGED, {current: id, previous} as IStateFlow);
        } else {
            Log.warn(`Restricted state change (from: ${this._currentState} to: ${id})`);

        }
    }

    public getCurrent(): string {
        return this._currentState;
    }
}

export interface IStateParams {
    from: Array<string>;
}

export interface IStateFlow {
    current: string;
    previous: string;
}
