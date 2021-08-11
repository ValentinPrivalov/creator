import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";
import {ISceneData, ITile, ITileSet} from "../static/loading-interfaces";
import {Collection} from "../../../../util/collection";

export class LoadingModel extends AbstractModel {
    protected _assetsRoot: string = 'assets/';
    protected assets: IAssets = {
        scene: null,
        levels: [],
        images: new Collection()
    };

    public async loadAssets(): Promise<any> {
        const scene: ISceneData = await this.loadScene();
        const levels: Array<ISceneData> = await this.loadLevels();
        await this.loadTileSetImages(levels);

        this.assets.scene = scene;
        this.assets.levels = levels;

        return Promise.resolve(scene);
    }

    protected async loadScene(): Promise<ISceneData> {
        const path: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.SCENE);
        const response: any = await fetch(this._assetsRoot + path);
        const sceneData: ISceneData = await response.json();
        return Promise.resolve(sceneData);
    }

    protected loadLevels(): Promise<Array<ISceneData>> {
        const promises: Array<Promise<any>> = [];
        const levels: Array<string> = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.LEVELS);
        levels.forEach(async (levelName: string) => {
            const response: any = await fetch(this._assetsRoot + levelName);
            promises.push(response.json());
        });

        return Promise.all(promises);
    }

    protected loadTileSetImages(levels: Array<ISceneData>): Promise<Array<HTMLImageElement>> {
        const promises: Array<Promise<any>> = [];

        const imagesSrc: Array<string> = [];
        levels.forEach((level: ISceneData) => {
            level.tilesets.forEach((tileset: ITileSet) => {
                tileset.tiles.forEach((tile: ITile) => {
                    imagesSrc.push(tile.image)
                });
            });
        });

        imagesSrc.forEach((path: string) => {
            promises.push(this.loadImage(path));
        });

        return Promise.all(promises);
    }

    protected loadImage(path: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const image: HTMLImageElement = new Image();
            image.src = this._assetsRoot + path;
            image.addEventListener('load', () => {
                this.assets.images.add(path, image);
                resolve(image);
            });
        });
    }
}

export interface IAssets {
    scene: ISceneData;
    levels: Array<ISceneData>;
    images: Collection;
}
