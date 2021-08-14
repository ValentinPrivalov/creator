import {Log} from "../util/log";
import {Collection} from "../util/collection";

export class Services implements IServices {
    private static _instance: IServices;
    private registryCollection: Collection<Object> = new Collection();

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
            const service: any = new implementation(id);
            this.registryCollection.add(id, service);
        }
    }

    public get(id: string): any {
        if (this.registryCollection.has(id)) {
            return this.registryCollection.get(id);
        } else {
            Log.warn('Service not found: ' + id);
        }
    }
}

export interface IServices {
    register(id: string, implementation: any): void;

    get(id: string): any;
}
