import {MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Names} from "../../global/names";

export class AbstractModel extends MvcEntity {
    protected data: any;
    protected eventManager: EventManager;

    constructor(name: string) {
        super(name);
        this.eventManager = this.services.get(Names.Services.EVENT_MANAGER) as EventManager;
    }

    protected raiseSignal(signalName: string, body?: any): void {
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
