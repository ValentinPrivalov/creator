import {IMvcEntity, MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Services} from "../services";
import {Names} from "../../global/names";
import {Container, DisplayObject, Ticker} from "pixi.js";
import {SceneManager} from "../services/scene-manager";
import gsap from "gsap";
import {Layer} from "../pixi/layer";

export class AbstractView extends MvcEntity implements IAbstractView {
    public display: Layer;
    protected eventManager: EventManager;
    protected sceneManager: SceneManager;
    protected ticker: Ticker;
    protected transitionSettings: ITransitionSettings = {};

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

    public onCreated(): void {
    }

    public layerTransitionInStart(callback?: Function): void {
        if (this.transitionSettings.fadeInTime) {
            gsap.to(this.display, {
                alpha: 1,
                onComplete: () => {
                    callback?.();
                }
            });
        } else {
            callback?.();
        }
        this.showLayer();
    }

    public layerTransitionOutStart(callback?: Function): void {
        if (this.transitionSettings.fadeOutTime) {
            gsap.to(this.display, {
                alpha: 0,
                onComplete: () => {
                    this.hideLayer();
                    callback?.();
                }
            });
        } else {
            this.hideLayer();
        }
    }

    public showLayer(): void {
        this.display.visible = true;
    }

    public hideLayer(): void {
        this.display.visible = false;
    }

    public enableInteractive(): void {
        this.display.interactive = true;
        this.display.interactiveChildren = true;
    }

    public disableInteractive(): void {
        this.display.interactive = false;
        this.display.interactiveChildren = false;
    }

    protected findChildByName(name: string, container: Container = this.display): DisplayObject {
        let result: DisplayObject = null;
        container.children?.forEach((child: DisplayObject) => {
            if (!result) {
                result = child.name === name ? child : this.findChildByName(name, child as Container);
            }
        });
        return result;
    }
}

export interface IAbstractView extends IMvcEntity {
    display: Container;

    raiseSignal(signalName: string, body: any): void;

    onResize(): void;
}

export interface ITransitionSettings {
    fadeInTime?: number,
    fadeOutTime?: number
}
