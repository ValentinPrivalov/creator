import {IAbstractModule} from "../abstract-module";
import {Log} from "../log";
import {Services} from "../services";
import {Names} from "../../global/names";
import {AbstractController} from "../mvc/controller";
import {AbstractModel} from "../mvc/model";
import {AbstractView} from "../mvc/view";
import {AbstractFactory} from "../../util/abstract-factory";

export class Mvc implements IMvc {
    private static _instance: IMvc;
    private modules: { [key: string]: IAbstractModule } = {};
    protected controllerFactory: AbstractFactory;
    protected viewFactory: AbstractFactory;
    protected modelFactory: AbstractFactory;

    static instance(): IMvc {
        if (!this._instance) {
            this._instance = new Mvc();
        }
        return this._instance;
    }

    constructor() {
        this.controllerFactory = new AbstractFactory();
        this.viewFactory = new AbstractFactory();
        this.modelFactory = new AbstractFactory();
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

    public registerModel(id: string, implementation: any): void {
        Log.info('Register model: ' + id);
        this.modelFactory.addItem(id, implementation);
        const model: AbstractModel = this.modelFactory.getItem(id);
        model.onRegister();
    }

    public registerView(id: string, implementation: any): void {
        Log.info('Register view: ' + id);
        this.viewFactory.addItem(id, implementation);
        const view: AbstractView = this.viewFactory.getItem(id);
        view.onRegister();
    }

    public registerController(viewId: string, implementation: any): void {
        Log.info('Register controller: ' + viewId);
        this.controllerFactory.addItem(viewId, implementation);
        const controller: AbstractController = this.controllerFactory.getItem(viewId);
        controller.onRegister();
        controller.bindView(this.viewFactory.getItem(viewId));
        controller.bindModel(this.modelFactory.getItem(viewId));
    }
}

export interface IMvc {
    registerModule(id: string, module: any): void;

    replaceModule(id: string, module: any): void;

    sendNotification(notificationName: string, body?: any): void;
}
