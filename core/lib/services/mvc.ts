import {Log} from "../../util/log";
import {Services} from "../services";
import {Names} from "../../global/names";
import {AbstractController} from "../mvc/controller";
import {AbstractModel} from "../mvc/model";
import {AbstractView} from "../mvc/view";
import {Collection} from "../../util/collection";
import {Container} from "pixi.js";
import {EventManager} from "./event-manager";
import {AbstractModule} from "../mvc/module";

export class Mvc {
    private modulesCollection: Collection<AbstractModule> = new Collection();
    private controllerCollection: Collection<AbstractController> = new Collection();
    private viewCollection: Collection<AbstractView> = new Collection();
    private modelCollection: Collection<AbstractModel> = new Collection();

    get eventManager(): EventManager {
        return Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    registerModule(id: string, implementation: any): void {
        if (this.modulesCollection.has(id)) {
            Log.warn('Module already registered: ' + id);
        } else {
            Log.info('Register module: ' + id);
            const module: AbstractModule = new implementation(id);
            this.modulesCollection.add(id, module);
        }
    }

    replaceModule(id: string, implementation: any): void {
        if (!this.modulesCollection.has(id)) {
            Log.warn('Module not found for replacement: ' + id);
        } else {
            Log.info('Replace module: ' + id);
            const module: AbstractModule = new implementation(id);
            this.modulesCollection.add(id, module);
        }
    }

    public start(): void {
        this.modulesCollection.forEach((module: AbstractModule) => module.onRegister());
        this.modelCollection.forEach((model: AbstractModel) => model.onRegister());
        this.viewCollection.forEach((view: AbstractView) => view.onRegister());
        this.controllerCollection.forEach((controller: AbstractController) => {
            controller.bindView(this.viewCollection.get(controller.NAME))
            controller.bindModel(this.modelCollection.get(controller.NAME));
            controller.onRegister();
        });
    }

    sendNotification(notificationName: string, body?: any): void {
        this.eventManager.raise({name: notificationName, body});
    }

    public registerModel(id: string, implementation: any): void {
        const model: AbstractModel = new implementation(id);
        this.modelCollection.add(id, model);
    }

    public registerView(id: string, implementation: any): void {
        const view: AbstractView = new implementation(id);
        this.viewCollection.add(id, view);
    }

    public registerController(viewId: string, implementation: any): void {
        const controller: AbstractController = new implementation(viewId);
        this.controllerCollection.add(viewId, controller);
    }

    public bindLayer(layer: Container): void {
        if (this.viewCollection.has(layer.name)) {
            layer.visible = false;
            this.viewCollection.get(layer.name).display = layer;
        }
    }

    public getModel(id: string): any {
        return this.modelCollection.get(id);
    }
}
