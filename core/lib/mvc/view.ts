import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Services} from "../services";
import {Names} from "../../global/names";
import {Container} from "pixi.js";

export class AbstractView extends MvcEntity implements IAbstractView {
    public display: Container;
    protected eventManager: EventManager;

    constructor(name: string) {
        super(name);
        this.eventManager = Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    raiseSignal(signalName: string, body?: any): void {
        this.eventManager.raise({name: signalName, body});
    }
}

export interface IAbstractView extends IMvcEntity {
    display: any;

    raiseSignal(signalName: string, body: any): void;
}
