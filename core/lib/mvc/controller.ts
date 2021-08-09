import {AbstractView, IAbstractView} from "./view";
import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {Services} from "../services";
import {Names} from "../../global/names";
import {EventManager, IEventData} from "../services/event-manager";
import {AbstractModel, IAbstractModel} from "./model";
import {Notifications} from "../../global/notifications";

export class AbstractController extends MvcEntity implements IAbstractController {
    protected _view: IAbstractView;
    protected _model: IAbstractModel;
    protected eventManager: EventManager;

    get view(): AbstractView {
        return this._view as AbstractView;
    }

    get model(): AbstractModel {
        return this._model as AbstractModel;
    }

    constructor(name: string) {
        super(name);
        this.eventManager = Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    execute(): void {
    }

    bindView(viewComponent: IAbstractView): void {
        this._view = viewComponent;
    }

    bindModel(modelComponent: IAbstractModel): void {
        this._model = modelComponent;
    }

    onRegister(): void {
        this.registerNotificationListeners();
        this.registerSignalListeners();
    }

    registerNotificationListeners(): void {
        this.addNotificationListener(Notifications.RESIZE, this.onResize.bind(this));
    }

    registerSignalListeners(): void {
    }

    raiseNotification(notificationName: string, body?: any): void {
        this.eventManager.raise({name: notificationName, body} as IEventData);
    }

    addNotificationListener(notificationName: string, listener: any): void {
        this.eventManager.addEventListener(notificationName, listener);
    }

    sendNotification(notificationName: string, body?: any): void {
        this.mvc.sendNotification(notificationName, body);
    }

    addSignalListener(signalName: string, listener: any): void {
        this.eventManager.addEventListener(signalName, listener);
    }

    protected onResize(): void {
        this.view.onResize();
    }
}

export interface IAbstractController extends IMvcEntity {
    execute(): void;

    bindView(viewComponent: IAbstractView): void;

    raiseNotification(notificationName: string, body?: any): void;

    addNotificationListener(notificationName: string, listener: any): void;

    sendNotification(notificationName: string, body?: any): void;

    addSignalListener(signalName: string, listener: any): void;
}
