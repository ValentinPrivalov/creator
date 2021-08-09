import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";
import {ISceneData} from "../static/loading-interfaces";

export class LoadingModel extends AbstractModel {
    public async loadScene(): Promise<ISceneData> {
        const path: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.SCENES);
        const response: any = await fetch('assets' + path);
        return await response.json() as ISceneData;
    }
}
