import {AbstractFactory} from "./abstract-factory";

export class ControllerFactory extends AbstractFactory {
    private static _instance: ControllerFactory;

    static instance(): ControllerFactory {
        if (!this._instance) {
            this._instance = new ControllerFactory();
        }
        return this._instance;
    }
}
