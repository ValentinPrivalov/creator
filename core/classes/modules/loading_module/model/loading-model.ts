import 'pixi-spine';
import {AbstractModel} from "../../../../lib/mvc/model";
import {LoadingNames} from "../static/loading-names";
import {Collection} from "../../../../util/collection";
import {ISceneData, ITile, ITileSet} from "../../../../lib/tiled/tiled-interfaces";
import {IMapPath, IMapData} from "../static/loading-interfaces";
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
        const assetsPath: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH);
        const mapsPath: Array<IMapPath> = this.getMaps();
        const promises: Array<Promise<IMapData>> = mapsPath.map((mapPath: IMapPath) => {
            return this.loadMap(mapPath.name, assetsPath + mapPath.path);
        });

        await Promise.all(promises);
        return this.data;
    }

    public async loadAssets(): Promise<Collection<IMapData>> {
        this.addToLoadMapsImages(this.getData());
        this.addToLoadMapsSpines(this.getData());
        this.loader.onLoad.add(this.onItemLoaded.bind(this));

        return new Promise(resolve => {
            this.loader.load(() => resolve(this.getData()));
        });
    }

    protected getMaps(): Array<IMapPath> {
        const mapsPath: Array<IMapPath> = [];
        const scene: string = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.SCENE);
        const levels: Array<IMapPath> = this.configs.getProperty(LoadingNames.ASSETS, LoadingNames.LEVELS);
        mapsPath.push({name: LoadingNames.SCENE, path: scene} as IMapPath);
        mapsPath.push(...levels);

        return mapsPath;
    }

    protected async loadMap(mapName: string, path: string): Promise<IMapData> {
        const response: Response = await fetch(path);
        const sceneData: ISceneData = await response.json();
        const mapData: IMapData = {sceneData, objects: []};
        this.data.add(mapName, mapData);
        return mapData;
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
