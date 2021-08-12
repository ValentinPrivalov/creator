import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {IEventData} from "../../../../lib/services/event-manager";
import {LayersView} from "../view/layers-view";
import {Signals} from "../../../../global/signals";
import {Container} from "pixi.js";
import {Collection} from "../../../../util/collection";

export class LayersController extends AbstractController {
    get view(): LayersView {
        return this._view as LayersView;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(Notifications.SCENES_LOADED, this.onScenesLoaded.bind(this));
    }

    registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(Signals.LAYER_CREATED, this.onLayerCreated.bind(this));
    }

    protected onScenesLoaded(notification: IEventData): void {
        const assets: Collection = notification.body;
        this.view.createLayers(assets);
    }

    protected onLayerCreated(notification: IEventData): void {
        this.mvc.bindLayer(notification.body as Container);
    }
}
