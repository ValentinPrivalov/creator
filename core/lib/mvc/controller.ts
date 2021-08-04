import {AbstractView, IAbstractView} from "./view";
import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {Mvc} from "../services/mvc";
import {Services} from "../services";
import {Names} from "../../global/names";
import {EventManager, IEventData} from "../services/event-manager";

export class AbstractController extends MvcEntity implements IAbstractController {
    protected viewComponent: IAbstractView;
    protected eventManager: EventManager;

    get mvc(): Mvc {
        return Services.instance().get(Names.Services.MVC) as Mvc;
    }

    get view(): AbstractView {
        return this.viewComponent as AbstractView;
    }

    constructor(name: string) {
        super(name);
        this.eventManager = Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    execute(): void {
    }

    bindView(viewComponent: IAbstractView): void {
        this.viewComponent = viewComponent;
    }

    onRegister(): void {
        this.addNotificationListeners();
        this.addSignalListeners();
    }

    addNotificationListeners(): void {
    }

    addSignalListeners(): void {
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
}

export interface IAbstractController extends IMvcEntity {
    execute(): void;

    bindView(viewComponent: IAbstractView): void;

    raiseNotification(notificationName: string, body?: any): void;

    addNotificationListener(notificationName: string, listener: any): void;

    sendNotification(notificationName: string, body?: any): void;

    addSignalListener(signalName: string, listener: any): void;
}
