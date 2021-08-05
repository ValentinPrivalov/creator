import {Log} from "../lib/log";
import {AbstractFactory} from "./abstract-factory";

export class ModelFactory extends AbstractFactory {
    private static _instance: ModelFactory;

    static instance(): ModelFactory {
        if (!this._instance) {
            this._instance = new ModelFactory();
        }
        return this._instance;
    }

    addItem(id: string, view: any): void {
        super.addItem(id, view);
        Log.info('Register model: ' + id);
        this._items[id].onRegister();
    }
}
