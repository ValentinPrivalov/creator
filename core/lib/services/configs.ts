export class Configs implements IConfigs {
    private static _instance: IConfigs;
    private _configs: { [key: string]: any } = {};

    public gameName: string;

    static instance(): IConfigs {
        if (!this._instance) {
            this._instance = new Configs();
        }
        return this._instance;
    }

    addProperty(key: string, propertyName: string, propertyValue: any): void {
        if (!this._configs[key]) {
            this._configs[key] = {};
        }

        this._configs[key][propertyName] = propertyValue;
    }
}

export interface IConfigs {
    addProperty(key: string, propertyName: string, propertyValue: any): void;
}
