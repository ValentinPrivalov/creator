import {IAbstractController} from "./mvc/controller";
import {IAbstractModel} from "./mvc/model";
import {IAbstractView} from "./mvc/view";
import {IMvcEntity, MvcEntity} from "./mvc/mvc-entity";

export class AbstractModule extends MvcEntity implements IAbstractModule {
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

    addModel(id: string, model: any): void {
        this.mvc.registerModel(id, model);
    }

    addView(id: string, view: any): void {
        this.mvc.registerView(id, view);
    }

    replaceView(id: string, newClass: any): void {
        this.mvc.registerView(id, newClass);
    }

    addController(viewId: string, controller: any): void {
        this.mvc.registerController(viewId, controller);
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

    replaceView(id: string, newClass: any): void;

    //
    // deleteView(identifier: string, type: number): void;
    //
    addController(viewId: string, controller: IAbstractController): void;

    //
    // replaceController(identifierView: string, newClass: any, type: number): void;
    //
    // deleteController(identifier: string, type: number): void;
}
