import {AbstractFactory} from "./abstract-factory";

export class ModelFactory extends AbstractFactory {
    private static _instance: ModelFactory;

    static instance(): ModelFactory {
        if (!this._instance) {
            this._instance = new ModelFactory();
        }
        return this._instance;
    }
}
