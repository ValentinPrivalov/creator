import 'pixi-spine';
import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";
import {Collection} from "../../../../util/collection";
import {ISceneData, ITile, ITileSet} from "../../../../lib/tiled/tiled-interfaces";
import {ILevelData, IMapData} from "../static/loading-interfaces";
import {Loader, LoaderResource} from "pixi.js";
import {Signals} from "../../../../global/signals";
import {TiledUtils} from "../../../../lib/tiled/tiled-utils";
import {TiledProperties} from "../../../../lib/tiled/tiled-names";

export class LoadingModel extends AbstractModel {
    protected data: Collection<IMapData> = new Collection();
    protected loader: Loader;
    protected spineDirectory: string = 'spine/';
    public loaderResourceIdSeparator: string = ':';

    public onRegister(): void {
        super.onRegister();
        this.loader = Loader.shared;
    }

    public async loadMaps(): Promise<Collection<IMapData>> {
        await this.loadScene();
        await this.loadLevels();

        return Promise.resolve(this.getData());
    }

    public async loadAssets(): Promise<Collection<IMapData>> {
        this.addToLoadMapsImages(this.getData());
        this.addToLoadMapsSpines(this.getData());
        this.loader.onLoad.add(this.onItemLoaded.bind(this));

        return new Promise(resolve => {
            this.loader.load(() => resolve(this.getData()));
        });
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
        return {sceneData, objects: []} as IMapData;
    }

    protected addToLoadMapsImages(maps: Collection<IMapData>): void {
        const assetsPath: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        maps.forEach((map: IMapData, mapName: string) => {
            map.sceneData.tilesets.forEach((tileset: ITileSet) => {
                tileset.tiles
                    .sort((tile: ITile, nextTile: ITile) => {
                        const getPriority = (tile: ITile) => TiledUtils.getPropertyValue(tile, TiledProperties.PRIORITY) ?? 0;
                        return getPriority(nextTile) - getPriority(tile);
                    })
                    .forEach((tile: ITile) => {
                        const id: string = mapName + this.loaderResourceIdSeparator + tile.id;
                        const path: string = assetsPath + tile.image;
                        this.loader.add(id, path);
                    });
            });
        });
    }

    protected addToLoadMapsSpines(maps: Collection<IMapData>): void {
        const assetsPath: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        maps.forEach((map: IMapData) => {
            map.sceneData.spines?.forEach((spineName: string) => {
                const path: string = assetsPath + this.spineDirectory + spineName + '.json';
                this.loader.add(spineName, path);
            });
        });
    }

    protected onItemLoaded(loader: Loader, resource: LoaderResource): void {
        this.raiseSignal(Signals.ASSET_LOADED, resource);
        this.raiseSignal(Signals.LOAD_PROGRESS, loader.progress);
    }
}
