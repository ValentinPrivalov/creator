import {AbstractView, IAbstractView} from "./view";
import {MvcEntity} from "./mvc-entity";
import {Services} from "../services";
import {Names} from "../../global/names";
import {EventManager} from "../services/event-manager";
import {AbstractModel, IAbstractModel} from "./model";
import {Notifications} from "../../global/notifications";
import {StateManager} from "../services/state-manager";

export class AbstractController extends MvcEntity {
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

    public bindView(viewComponent: IAbstractView): void {
        this._view = viewComponent;
    }

    public bindModel(modelComponent: IAbstractModel): void {
        this._model = modelComponent;
    }

    public onRegister(): void {
        this.registerNotificationListeners();
        this.registerSignalListeners();
    }

    protected registerNotificationListeners(): void {
        this.addNotificationListener(Notifications.RESIZE, this.onResize.bind(this));
    }

    protected registerSignalListeners(): void {
    }

    protected addNotificationListener(notificationName: string, listener: any): void {
        this.eventManager.addEventListener(notificationName, listener);
    }

    protected sendNotification(notificationName: string, body?: any): void {
        this.mvc.sendNotification(notificationName, body);
    }

    protected addSignalListener(signalName: string, listener: any): void {
        this.eventManager.addEventListener(signalName, listener);
    }

    protected setState(state: string): void {
        this.stateManager.setState(state);
    }

    protected onResize(): void {
        this.view.onResize();
    }
}
