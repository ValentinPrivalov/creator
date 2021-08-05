import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {ILayer} from "../static/scenes-interfaces";
import {IEventData} from "../../../../lib/services/event-manager";
import {ScenesView} from "../view/scenes-view";
import {Signals} from "../../../../global/signals";
import {Container} from "pixi.js";

export class ScenesController extends AbstractController {
    get view(): ScenesView {
        return this._view as ScenesView;
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
