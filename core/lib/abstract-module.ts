import {IAbstractController} from "./mvc/controller";
import {IAbstractModel} from "./mvc/model";
import {IAbstractView} from "./mvc/view";
import {Mvc} from "./services/mvc";
import {Services} from "./services";
import {Names} from "../global/names";
import {ViewFactory} from "../util/view-factory";
import {ControllerFactory} from "../util/controller-factory";
import {IAbstractFactory} from "../util/abstract-factory";
import {IMvcEntity, MvcEntity} from "./mvc/mvc-entity";

export class AbstractModule extends MvcEntity implements IAbstractModule {
    protected controllerFactory: IAbstractFactory;
    protected viewFactory: IAbstractFactory;

    get mvc(): Mvc {
        return Services.instance().get(Names.Services.MVC) as Mvc;
    }

    constructor(name: string) {
        super(name);
        this.controllerFactory = ControllerFactory.instance();
        this.viewFactory = ViewFactory.instance();
    }

    onRegister(): void {
        this.registerCommands();
        this.registerModels();
        this.registerViews();
        this.registerControllers();
    }

    registerCommands(): void {
    }

    registerModels(): void {
    }

    registerViews(): void {
    }

    registerControllers(): void {
    }

    addController(viewId: string, controller: any): void {
        this.controllerFactory.addItem(viewId, controller);
    }

    addModel(id: string, model: any): void {
        this.mvc.registerModel(id, model);
    }

    addView(id: string, view: any): void {
        this.viewFactory.addItem(id, view);
    }
}

export interface IAbstractModule extends IMvcEntity {
    // addCommand(commandName: string, command: IController): void;
    //
    // deleteCommand(commandName: string): void;
    //
    // replaceCommand(commandName: string, command: any): void;
    //
    addModel(id: string, model: IAbstractModel): void;

    //
    // deleteProxy(proxyName: string): void;
    //
    // replaceProxy(proxyName: string, proxy: any): void;
    //
    addView(id: string, view: IAbstractView): void;

    //
    // replaceView(identifier: string, newClass: any, type: number): void;
    //
    // deleteView(identifier: string, type: number): void;
    //
    addController(viewId: string, controller: IAbstractController): void;

    //
    // replaceController(identifierView: string, newClass: any, type: number): void;
    //
    // deleteController(identifier: string, type: number): void;
}
