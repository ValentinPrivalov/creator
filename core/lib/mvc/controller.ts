import { AbstractView } from './view';
import { MvcEntity } from './mvc-entity';
import { Names } from '../../global/names';
import { EventManager } from '../services/event-manager';
import { AbstractModel } from './model';
import { Notifications } from '../../global/notifications';
import { StateManager } from '../services/state-manager';

export class AbstractController extends MvcEntity {
    protected _view: AbstractView;
    protected _model: AbstractModel;
    protected eventManager: EventManager;
    protected stateManager: StateManager;

    protected get view(): AbstractView {
        return this._view as AbstractView;
    }

    protected get model(): AbstractModel {
        return this._model as AbstractModel;
    }

    constructor(name: string) {
        super(name);
        this.eventManager = this.services.get(Names.Services.EVENT_MANAGER) as EventManager;
        this.stateManager = this.services.get(Names.Services.STATE_MANAGER) as StateManager;
    }

    public bindView(viewComponent: AbstractView): void {
        this._view = viewComponent;
    }

    public bindModel(modelComponent: AbstractModel): void {
        this._model = modelComponent;
    }

    public onRegister(): void {
        this.registerNotificationListeners();
        this.registerSignalListeners();
    }

    protected registerNotificationListeners(): void {
        this.addNotificationListener(Notifications.RESIZE, this.onResize.bind(this));
    }

    protected registerSignalListeners(): void {}

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
