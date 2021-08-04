import {IAbstractView} from "../lib/mvc/view";
import {Log} from "../lib/log";
import {ViewFactory} from "./view-factory";
import {AbstractFactory} from "./abstract-factory";

export class ControllerFactory extends AbstractFactory {
    private static _instance: ControllerFactory;

    static instance(): ControllerFactory {
        if (!this._instance) {
            this._instance = new ControllerFactory();
        }
        return this._instance;
    }

    addItem(viewId: string, controller: any): void {
        super.addItem(viewId, controller);
        Log.info('Register controller: ' + viewId);
        const viewComponent: IAbstractView = ViewFactory.instance().getItem(viewId);
        this._items[viewId].bindView(viewComponent);
        this._items[viewId].onRegister();
    }
}
