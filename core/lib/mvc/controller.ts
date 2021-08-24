import {AbstractView, IAbstractView} from "./view";
import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {Services} from "../services";
import {Names} from "../../global/names";
import {EventManager} from "../services/event-manager";
import {AbstractModel, IAbstractModel} from "./model";
import {Notifications} from "../../global/notifications";
import {StateManager} from "../services/state-manager";

export class AbstractController extends MvcEntity implements IAbstractController {
    protected _view: IAbstractView;
    protected _model: IAbstractModel;
    protected eventManager: EventManager;
    protected stateManager: StateManager;

    get view(): AbstractView {
        return this._view as AbstractView;
    }

    get model(): AbstractModel {
        return this._model as AbstractModel;
    }

    constructor(name: string) {
        super(name);
        this.eventManager = Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
        this.stateManager = Services.instance().get(Names.Services.STATE_MANAGER) as StateManager;
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

    addNotificationListener(notificationName: string, listener: any): void {
        this.eventManager.addEventListener(notificationName, listener);
    }

    sendNotification(notificationName: string, body?: any): void {
        this.mvc.sendNotification(notificationName, body);
    }

    addSignalListener(signalName: string, listener: any): void {
        this.eventManager.addEventListener(signalName, listener);
    }

    protected setState(state: string): void {
        this.stateManager.setState(state);
    }

    protected onResize(): void {
        this.view.onResize();
    }
}

export interface IAbstractController extends IMvcEntity {
    execute(): void;

    bindView(viewComponent: IAbstractView): void;

    bindModel(modelComponent: IAbstractModel): void;

    addNotificationListener(notificationName: string, listener: any): void;

    sendNotification(notificationName: string, body?: any): void;

    addSignalListener(signalName: string, listener: any): void;
}
