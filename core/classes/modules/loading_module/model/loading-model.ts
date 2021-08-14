import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";
import {Collection} from "../../../../util/collection";
import {ISceneData, ITile, ITileSet} from "../../../../lib/tiled/tiled-interfaces";
import {ILevelData, IMapData} from "../static/loading-interfaces";
import {Loader, LoaderResource} from "pixi.js";

export class LoadingModel extends AbstractModel {
    protected data: Collection<IMapData> = new Collection();
    protected loader: Loader;
    protected loaderResourceIdSeparator: string = ':';

    onRegister(): void {
        super.onRegister();
        this.loader = Loader.shared;
    }

    public async loadAssets(): Promise<Collection<IMapData>> {
        await this.loadScene();
        await this.loadLevels();
        await this.loadMapsImages(this.getData());

        return Promise.resolve(this.getData());
    }

    protected async loadScene(): Promise<IMapData> {
        const assetsPath: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        const fileName: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.SCENE);

        const mapData: IMapData = await this.loadMap(assetsPath + fileName);
        this.data.add(LoadingNames.SCENE, mapData);
        return mapData;
    }

    protected async loadLevels(): Promise<Array<IMapData>> {
        const assetsPath: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        const levels: Array<ILevelData> = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.LEVELS);

        const promises: Array<Promise<IMapData>> = await levels.map(async (levelData: ILevelData) => {
            const mapData: IMapData = await this.loadMap(assetsPath + levelData.path);
            this.data.add(levelData.name, mapData);
            return mapData;
        });

        return Promise.all(promises);
    }

    protected async loadMap(path: string): Promise<IMapData> {
        const response: Response = await fetch(path);
        const sceneData: ISceneData = await response.json();
        return {sceneData, images: new Collection<LoaderResource>()} as IMapData;
    }

    protected loadMapsImages(maps: Collection<IMapData>): Promise<Collection<IMapData>> {
        const assetsPath: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);

        maps.forEach((mapName: string, map: IMapData) => {
            map.sceneData.tilesets.forEach((tileset: ITileSet) => {
                tileset.tiles.forEach((tile: ITile) => {
                    const id: string = mapName + this.loaderResourceIdSeparator + tile.id;
                    const path: string = assetsPath + tile.image;
                    this.loader.add(id, path);
                });
            });
        });

        return new Promise(resolve => {
            this.loader.load((loader: Loader, resources: any) => {
                new Collection<LoaderResource>(resources).forEach((resourceId: string, item: LoaderResource) => {
                    const [mapName, id] = resourceId.split(this.loaderResourceIdSeparator);
                    const map: IMapData = maps.get(mapName);
                    map.images.add(id, item);
                });
                resolve(maps);
            });
        });
    }
}
