import {Log} from "../../util/log";
import {Services} from "../services";
import {Names} from "../../global/names";
import {AbstractController} from "../mvc/controller";
import {AbstractModel} from "../mvc/model";
import {AbstractView} from "../mvc/view";
import {Collection} from "../../util/collection";
import {Container} from "pixi.js";
import {EventManager} from "./event-manager";
import {AbstractModule} from "../abstract-module";

export class Mvc implements IMvc {
    private modulesCollection: Collection = new Collection();
    private controllerCollection: Collection = new Collection();
    private viewCollection: Collection = new Collection();
    private modelCollection: Collection = new Collection();

    get eventManager(): EventManager {
        return Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    registerModule(id: string, implementation: any): void {
        if (this.modulesCollection.has(id)) {
            Log.warn('Module already registered: ' + id);
        } else {
            Log.info('Register module: ' + id);
            const module: AbstractModule = new implementation(id);
            module.onRegister();
            this.modulesCollection.addItem(id, module);
        }
    }

    replaceModule(id: string, implementation: any): void {
        if (!this.modulesCollection.has(id)) {
            Log.warn('Module not found for replacement: ' + id);
        } else {
            Log.info('Replace module: ' + id);
            const module: AbstractModule = new implementation(id);
            module.onRegister();
            this.modulesCollection.addItem(id, module);
        }
    }

    sendNotification(notificationName: string, body?: any): void {
        this.eventManager.raise({name: notificationName, body});
    }

    public registerModel(id: string, implementation: any): void {
        Log.info('Register model: ' + id);
        const model: AbstractModel = new implementation(id);
        model.onRegister();
        this.modelCollection.addItem(id, model);
    }

    public registerView(id: string, implementation: any): void {
        Log.info('Register view: ' + id);
        const view: AbstractView = new implementation(id);
        view.onRegister();
        this.viewCollection.addItem(id, view);
    }

    public registerController(viewId: string, implementation: any): void {
        Log.info('Register controller: ' + viewId);
        const controller: AbstractController = new implementation(viewId);
        controller.onRegister();
        controller.bindView(this.viewCollection.getItem(viewId))
        controller.bindModel(this.modelCollection.getItem(viewId));
        this.controllerCollection.addItem(viewId, controller);
    }

    public bindLayer(layer: Container): void {
        if (this.viewCollection.has(layer.name)) {
            this.viewCollection.getItem(layer.name).display = layer;
        }
    }

    public getModel(id: string): any {
        return this.modelCollection.getItem(id);
    }
}

export interface IMvc {
    registerModule(id: string, module: any): void;

    replaceModule(id: string, module: any): void;

    sendNotification(notificationName: string, body?: any): void;
}
