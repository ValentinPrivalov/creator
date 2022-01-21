import {MvcEntity} from "./mvc-entity";
import {EventManager} from "../services/event-manager";
import {Names} from "../../global/names";
import {Container, DisplayObject, Ticker} from "pixi.js";
import {SceneManager} from "../services/scene-manager";
import gsap from "gsap";
import {Layer} from "../pixi/layer";
import {LoadingModel} from "../../classes/modules/loading_module/model/loading-model";

export class AbstractView extends MvcEntity {
    public display: Layer;
    protected eventManager: EventManager;
    protected sceneManager: SceneManager;
    protected ticker: Ticker;
    protected loadingModel: LoadingModel;
    protected transitionSettings: ITransitionSettings = {};

    constructor(name: string) {
        super(name);
        this.eventManager = this.services.get(Names.Services.EVENT_MANAGER) as EventManager;
        this.sceneManager = this.services.get(Names.Services.SCENE_MANAGER) as SceneManager;
        this.ticker = Ticker.shared;
        this.loadingModel = this.getModel(Names.Views.LOADING_SCREEN);
    }

    protected raiseSignal(signalName: string, body?: any): void {
        this.eventManager.raise({name: signalName, body});
    }

    public onResize(): void {
    }

    public onCreated(): void {
        this.ticker.add(this.onUpdate.bind(this));
    }

    protected onUpdate(): void {
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

export interface ITransitionSettings {
    fadeInTime?: number,
    fadeOutTime?: number
}
