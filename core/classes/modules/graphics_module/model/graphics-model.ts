import {AbstractModel} from "../../../../lib/mvc/model";
import {ISceneData} from "../../loading_module/static/loading-interfaces";
import {ISceneSize} from "../static/graphics-interfaces";

export class GraphicsModel extends AbstractModel {
    protected _sceneSize: ISceneSize = {} as ISceneSize;

    public setSceneSize(data: ISceneData): ISceneSize {
        this._sceneSize.width = data.tilewidth * data.width;
        this._sceneSize.height = data.tileheight * data.height;
        return this.getSceneSize();
    }

    public getSceneSize(): ISceneSize {
        return this._sceneSize;
    }
}
