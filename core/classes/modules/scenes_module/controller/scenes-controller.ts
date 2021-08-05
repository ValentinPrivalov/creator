import {AbstractController} from "../../../../lib/mvc/controller";
import {Notifications} from "../../../../global/notifications";
import {ILayer} from "../static/scenes-interfaces";
import {IEventData} from "../../../../lib/services/event-manager";
import {ScenesView} from "../view/scenes-view";

export class ScenesController extends AbstractController {
    get view(): ScenesView {
        return this._view as ScenesView;
    }

    addNotificationListeners() {
        super.addNotificationListeners();
        this.addNotificationListener(Notifications.SCENES_LOADED, this.onScenesLoaded.bind(this));
    }

    protected onScenesLoaded(notification: IEventData): void {
        const layers: Array<ILayer> = notification.body.layers;
        this.view.createLayers(layers);
    }
}
