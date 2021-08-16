import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Services} from "../services";
import {Names} from "../../global/names";

export class AbstractModel extends MvcEntity implements IAbstractModel {
    protected data: any;
    protected eventManager: EventManager;

    constructor(name: string) {
        super(name);
        this.eventManager = Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    raiseSignal(signalName: string, body?: any): void {
        this.eventManager.raise({name: signalName, body});
    }

    public setData(data: any): any {
        this.data = data;
        return this.data;
    }

    public getData(): any {
        return this.data;
    }
}

export interface IAbstractModel extends IMvcEntity {
    setData(vo: any): void;

    getData(): any;
}
