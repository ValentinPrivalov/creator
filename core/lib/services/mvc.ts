import {IAbstractModule} from "../abstract-module";
import {Log} from "../log";
import {Services} from "../services";
import {Names} from "../../global/names";

export class Mvc implements IMvc {
    private static _instance: IMvc;
    private modules: { [key: string]: IAbstractModule } = {};

    static instance(): IMvc {
        if (!this._instance) {
            this._instance = new Mvc();
        }
        return this._instance;
    }

    registerModule(id: string, module: any): void {
        if (this.modules[id]) {
            Log.warn('Module already registered: ' + id);
        } else {
            Log.info('Register module: ' + id);
            this.modules[id] = new module(id);
            this.modules[id].onRegister();
        }
    }

    replaceModule(id: string, module: any): void {
        if (!this.modules[id]) {
            Log.warn('Module not found for replacement: ' + id);
        } else {
            Log.info('Replace module: ' + id);
            this.modules[id] = new module(id);
            this.modules[id].onRegister();
        }
    }

    sendNotification(notificationName: string, body?: any): void {
        Services.instance().get(Names.Services.EVENT_MANAGER).raise({name: notificationName, body});
    }
}

export interface IMvc {
    registerModule(id: string, module: any): void;

    replaceModule(id: string, module: any): void;

    sendNotification(notificationName: string, body?: any): void;
}
