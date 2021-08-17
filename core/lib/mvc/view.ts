import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Services} from "../services";
import {Names} from "../../global/names";
import {Container, DisplayObject, Ticker} from "pixi.js";
import {SceneManager} from "../services/scene-manager";

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

    onResize(): void {

    }

    public showLayer(): void {
        this.display.visible = true;
    }

    public hideLayer(): void {
        this.display.visible = false;
    }

    protected findChildByName(name: string, container: Container = this.display): DisplayObject {
        let result: DisplayObject = null;
        container.children?.forEach((child: DisplayObject) => {
            result = child.name === name ? child : this.findChildByName(name, child as Container);
        });
        return result;
    }
}

export interface IAbstractView extends IMvcEntity {
    display: Container;

    raiseSignal(signalName: string, body: any): void;

    onResize(): void;
}
