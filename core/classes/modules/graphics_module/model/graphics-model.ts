import { AbstractModel } from '../../../../lib/mvc/model';
import { ISceneSize } from '../static/graphics-interfaces';
import { ISceneData } from '../../../../lib/tiled/tiled-interfaces';

export class GraphicsModel extends AbstractModel {
    protected data: ISceneSize = {} as ISceneSize;

    public setSceneSize(data: ISceneData): ISceneSize {
        const sceneSize: ISceneSize = {
            width: data.tilewidth * data.width,
            height: data.tileheight * data.height
        };
        return this.setData(sceneSize);
    }
}
