export class Configs implements IConfigs {
    private _configs: { [key: string]: any } = {};
    public gameName: string;
    public gameVersion: string;

    addProperty(key: string, propertyName: string, propertyValue: any): void {
        if (!this._configs[key]) {
            this._configs[key] = {};
        }

        this._configs[key][propertyName] = propertyValue;
    }

    getProperty(key: string, propertyName: string): any {
        return this._configs[key][propertyName];
    }

    get GAME_NAME(): string {
        return this.gameName.toUpperCase().replace(/ /g, '_')
    }
}

export interface IConfigs {
    addProperty(key: string, propertyName: string, propertyValue: any): void;

    getProperty(key: string, propertyName: string): any;
}
