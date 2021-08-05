import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";

export class LoadingModel extends AbstractModel {
    public async loadScene(): Promise<Object> {
        const path: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.SCENES);
        const response: any = await fetch('assets' + path);
        const data: Object = await response.json();
        return data;
    }
}
