import {AbstractFactory} from "./abstract-factory";

export class ViewFactory extends AbstractFactory {
    private static _instance: ViewFactory;

    static instance(): ViewFactory {
        if (!this._instance) {
            this._instance = new ViewFactory();
        }
        return this._instance;
    }
}
