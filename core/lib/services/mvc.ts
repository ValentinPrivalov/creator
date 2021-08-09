import {Log} from "../log";
import {Services} from "../services";
import {Names} from "../../global/names";
import {AbstractController} from "../mvc/controller";
import {AbstractModel} from "../mvc/model";
import {AbstractView} from "../mvc/view";
import {AbstractCollection} from "../../util/abstract-collection";
import {Container} from "pixi.js";
import {EventManager} from "./event-manager";

export class Mvc implements IMvc {
    private modulesCollection: AbstractCollection = new AbstractCollection();
    private controllerCollection: AbstractCollection = new AbstractCollection();
    private viewCollection: AbstractCollection = new AbstractCollection();
    private modelCollection: AbstractCollection = new AbstractCollection();

    get eventManager(): EventManager {
        return Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    registerModule(id: string, implementation: any): void {
        if (this.modulesCollection.has(id)) {
            Log.warn('Module already registered: ' + id);
        } else {
            Log.info('Register module: ' + id);
            const module: AbstractModel = this.modulesCollection.addItem(id, implementation);
            module.onRegister();
        }
    }

    replaceModule(id: string, implementation: any): void {
        if (!this.modulesCollection.has(id)) {
            Log.warn('Module not found for replacement: ' + id);
        } else {
            Log.info('Replace module: ' + id);
            const module: AbstractModel = this.modulesCollection.addItem(id, implementation);
            module.onRegister();
        }
    }

    sendNotification(notificationName: string, body?: any): void {
        this.eventManager.raise({name: notificationName, body});
    }

    public registerModel(id: string, implementation: any): void {
        Log.info('Register model: ' + id);
        const model: AbstractModel = this.modelCollection.addItem(id, implementation);
        model.onRegister();
    }

    public registerView(id: string, implementation: any): void {
        Log.info('Register view: ' + id);
        const view: AbstractView = this.viewCollection.addItem(id, implementation);
        view.onRegister();
    }

    public registerController(viewId: string, implementation: any): void {
        Log.info('Register controller: ' + viewId);
        const controller: AbstractController = this.controllerCollection.addItem(viewId, implementation);
        controller.onRegister();
        controller.bindView(this.viewCollection.getItem(viewId))
        controller.bindModel(this.modelCollection.getItem(viewId));
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
