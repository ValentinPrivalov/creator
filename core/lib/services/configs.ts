export class Configs implements IConfigs {
    private _configs: { [key: string]: any } = {};
    public gameName: string;
    public gameVersion: string;

    public addProperty(key: string, propertyName: string, propertyValue: any): void {
        if (!this._configs[key]) {
            this._configs[key] = {};
        }

        this._configs[key][propertyName] = propertyValue;
    }

    public getProperty(key: string, propertyName: string): any {
        return this._configs[key][propertyName];
    }

    public get GAME_NAME(): string {
        return this.gameName.toUpperCase().replace(/ /g, '_');
    }
}

export interface IConfigs {
    addProperty(key: string, propertyName: string, propertyValue: any): void;

    getProperty(key: string, propertyName: string): any;
}
