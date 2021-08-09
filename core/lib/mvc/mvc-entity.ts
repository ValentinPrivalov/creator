import {Configs} from "../services/configs";
import {Services} from "../services";
import {Names} from "../../global/names";
import {Mvc} from "../services/mvc";
import {WindowEvents} from "../services/window-events";

export class MvcEntity implements IMvcEntity {
    public NAME: string;
    protected configs: Configs;
    protected windowEvents: WindowEvents;

    get mvc(): Mvc {
        return Services.instance().get(Names.Services.MVC) as Mvc;
    }

    constructor(name: string) {
        this.NAME = name;
        this.configs = Services.instance().get(Names.Services.CONFIGS);
        this.windowEvents = Services.instance().get(Names.Services.WINDOW_EVENTS);
    }

    onRegister(): void {
    }

    protected getModel(id: string): any {
        return this.mvc.getModel(id);
    }
}

export interface IMvcEntity {
    NAME: string;

    onRegister(): void;
}
