import {Log} from "../util/log";
import {AbstractCollection} from "../util/abstract-collection";

export class Services implements IServices {
    private static _instance: IServices;
    private registryCollection: AbstractCollection = new AbstractCollection();

    static instance(): IServices {
        if (!this._instance) {
            this._instance = new Services();
        }
        return this._instance;
    }

    public register(id: string, implementation: any): void {
        if (this.registryCollection.has(id)) {
            Log.warn('Service already registered: ' + id);
        } else {
            Log.info('Register service: ' + id);
            this.registryCollection.addItem(id, implementation);
        }
    }

    public get(id: string): any {
        if (this.registryCollection.has(id)) {
            return this.registryCollection.getItem(id);
        } else {
            Log.warn('Service not found: ' + id);
        }
    }
}

export interface IServices {
    register(id: string, implementation: any): void;

    get(id: string): any;
}
