import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Services} from "../services";
import {Names} from "../../global/names";
import {Container, Ticker} from "pixi.js";
import {SceneManager} from "../../classes/modules/graphics_module/view/scene-manager";

export class AbstractView extends MvcEntity implements IAbstractView {
    public display: Container;
    protected eventManager: EventManager;
    protected sceneManager: SceneManager;
    protected ticker: Ticker;

    constructor(name: string) {
        super(name);
        this.eventManager = Services.instance().get(Names.Services.EVENT_MANAGER) as EventManager;
        this.sceneManager = Services.instance().get(Names.Services.SCENE_MANAGER) as SceneManager;
        this.ticker = Ticker.shared;
    }

    raiseSignal(signalName: string, body?: any): void {
        this.eventManager.raise({name: signalName, body});
    }

    public onResize(): void {

    }
}

export interface IAbstractView extends IMvcEntity {
    display: Container;

    raiseSignal(signalName: string, body: any): void;
}
