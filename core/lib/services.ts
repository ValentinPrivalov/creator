import {Log} from "./log";

export class Services implements IServices {
    private static _instance: IServices;
    private _registry: { [key: string]: any } = {};

    static instance(): IServices {
        if (!this._instance) {
            this._instance = new Services();
        }
        return this._instance;
    }

    public register(id: string, implementation: any): void {
        if (this.has(id)) {
            Log.warn('Service already registered: ' + id);
        } else {
            Log.info('Register service: ' + id);
            this._registry[id] = implementation;
        }
    }

    public get(id: string): any {
        if (this.has(id)) {
            return this._registry[id];
        }
    }

    public has(id: string): boolean {
        return this._registry[id] !== undefined;
    }
}

export interface IServices {
    register(id: string, implementation: any): void;

    get(id: string): any;

    has(id: string): boolean;
}
