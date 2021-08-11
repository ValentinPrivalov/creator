import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";
import {ISceneData, ITile, ITileSet} from "../static/loading-interfaces";
import {Collection} from "../../../../util/collection";

export class LoadingModel extends AbstractModel {
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

        return Promise.resolve(this.assets);
    }

    protected async loadScene(): Promise<ISceneData> {
        const path: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        const fileName: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.SCENE);
        const response: any = await fetch(path + fileName);
        const sceneData: ISceneData = await response.json();
        return Promise.resolve(sceneData);
    }

    protected async loadLevels(): Promise<Array<ISceneData>> {
        const path: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        const levels: Array<string> = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.LEVELS);

        const promises: Array<Promise<ISceneData>> = await levels.map(async (levelName: string) => {
            const response: any = await fetch(path + levelName);
            const sceneData: ISceneData = await response.json();
            return sceneData;
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

        imagesSrc.forEach((imagePath: string) => {
            promises.push(this.loadImage(imagePath));
        });

        return Promise.all(promises);
    }

    protected loadImage(imagePath: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const path: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
            const image: HTMLImageElement = new Image();
            image.src = path + imagePath;
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
