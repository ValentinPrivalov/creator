import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {ILayer} from "../static/layers-interfaces";
import {IEventData} from "../../../../lib/services/event-manager";
import {LayersView} from "../view/layers-view";
import {Signals} from "../../../../global/signals";
import {Container} from "pixi.js";

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
        const layers: Array<ILayer> = notification.body.layers;
        this.view.createLayers(layers);
    }

    protected onLayerCreated(notification: IEventData): void {
        this.mvc.bindLayer(notification.body as Container);
    }
}
