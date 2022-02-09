import { AbstractController } from '../../../../lib/mvc/controller';
import { Notifications } from '../../../../global/notifications';
import { IEventData } from '../../../../lib/services/event-manager';
import { LayersView } from '../view/layers-view';
import { Signals } from '../../../../global/signals';
import { LoaderResource } from 'pixi.js';
import { Collection } from '../../../../util/collection';
import { IMapData } from '../../loading_module/static/loading-interfaces';
import { Layer } from '../../../../lib/pixi/layer';

export class LayersController extends AbstractController {
    protected get view(): LayersView {
        return this._view as LayersView;
    }

    protected registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.MAIN_SCENE_INITIALIZED, this.onMainSceneInitialized.bind(this));
        this.addNotificationListener(Notifications.ASSET_LOADED, this.onAssetLoaded.bind(this));
    }

    protected registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(Signals.MAIN_SCENE_CREATED, this.onSceneCreated.bind(this));
        this.addSignalListener(Signals.LAYER_CREATED, this.onLayerCreated.bind(this));
    }

    protected onMainSceneInitialized(notification: IEventData): void {
        const maps: Collection<IMapData> = notification.body;
        this.view.createLayers(maps);
    }

    protected onAssetLoaded(notification: IEventData): void {
        const resource: LoaderResource = notification.body;
        this.view.updateObjects(resource);
    }

    protected onLayerCreated(notification: IEventData): void {
        this.mvc.bindLayer(notification.body as Layer);
    }

    protected onSceneCreated(): void {
        this.sendNotification(Notifications.MAIN_SCENE_CREATED);
    }
}
