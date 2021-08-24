import {IWindowMouseWheelEventData, WindowEventNames} from "../../../../../core/lib/services/window-events";
import {IZoomEdges} from "../global/tanks-level-interfaces";
import gsap from "gsap";
import {AbstractView} from "../../../../../core/lib/mvc/view";
import {TanksLevelNames} from "../global/tanks-level-names";
import {Layer} from "../../../../../core/lib/pixi/layer";
import {Button} from "../../../../../core/lib/pixi/button";
import {PointerEvents} from "../../../../../core/global/pointer-events";
import {TanksLevelSignals} from "../global/tanks-level-signals";
import {InteractionEvent, Point} from "pixi.js";
import {Names} from "../../../../../core/global/names";
import {GraphicsModel} from "../../../../../core/classes/modules/graphics_module/model/graphics-model";
import {ISceneSize} from "../../../../../core/classes/modules/graphics_module/static/graphics-interfaces";

export class TanksLevelView extends AbstractView {
    protected map: Layer;
    protected interface: Layer;
    protected menuButton: Button;
    protected zoomTween: GSAPTween;
    protected zoomScaleStep: number = 1000;
    protected zoomEdges: IZoomEdges = {
        minScale: 0.3,
        maxScale: 1
    }
    protected dragging: boolean = false;
    protected pointerPos: Point = null;
    protected beforeDragMapPos: Point = null;

    public onCreated(): void {
        super.onCreated();
        this.map = this.findChildByName(TanksLevelNames.MAP, this.display) as Layer;
        this.map.interactive = true;
        this.map.on(PointerEvents.DOWN, this.startDrag.bind(this));
        this.map.on(PointerEvents.MOVE, this.onDrag.bind(this));
        this.map.on(PointerEvents.UP, this.endDrag.bind(this));
        this.map.on(PointerEvents.OUT, this.endDrag.bind(this));
        this.interface = this.findChildByName(TanksLevelNames.INTERFACE, this.display) as Layer;
        this.menuButton = new Button(this.findChildByName(TanksLevelNames.MENU_BUTTON, this.display) as Layer);
        this.menuButton.on(PointerEvents.DOWN, () => {
            this.raiseSignal(TanksLevelSignals.PAUSE_GAME);
        });
    }

    public insertLevel(levelName: string): void {
        this.interface.visible = false;
        this.map.addChild(this.sceneManager.get(levelName) as Layer);
    }

    public enableInteractive(): void {
        super.enableInteractive();
        this.menuButton.enable = true;
        this.windowEvents.add(WindowEventNames.MOUSE_WHEEL, this.onZoom.bind(this));
    }

    public showInterface(): void {
        this.interface.visible = true;
        this.interface.alpha = 0;
        gsap.to(this.interface, {
            duration: 0.3,
            alpha: 1
        });
    }

    public hideInterface(): void {
        gsap.to(this.interface, {
            duration: 0.3,
            alpha: 0,
            onComplete: () => {
                this.interface.visible = false;
            }
        });
    }

    public disableInteractive() {
        super.disableInteractive();
        this.menuButton.enable = false;
        this.windowEvents.remove(WindowEventNames.MOUSE_WHEEL);
    }

    protected onZoom(data: IWindowMouseWheelEventData): void {
        const scaleValue: number = data.deltaY / this.zoomScaleStep;
        const currentScale: number = this.map.scale.x;
        const newScaleValue: number = currentScale - scaleValue;

        if (newScaleValue >= this.zoomEdges.maxScale) {
            this.startZoom(this.zoomEdges.maxScale);
        } else if (newScaleValue <= this.zoomEdges.minScale) {
            this.startZoom(this.zoomEdges.minScale);
        } else {
            this.startZoom(newScaleValue);
        }
    }

    protected startZoom(scale: number): void {
        this.zoomTween?.kill();
        this.zoomTween = gsap.to(this.map.scale, {
            duration: 0.3,
            x: scale,
            y: scale,
        });
    }

    protected startDrag(event: InteractionEvent): void {
        this.dragging = true;
        this.pointerPos = new Point(event.data.global.x, event.data.global.y);
        this.beforeDragMapPos = new Point(this.map.position.x, this.map.position.y);
    }

    protected onDrag(event: InteractionEvent): void {
        if (this.dragging) {
            const graphicsModel: GraphicsModel = this.getModel(Names.Views.MAIN_SCENE)
            const sceneSize: ISceneSize = graphicsModel.getData();
            const offsetX = this.pointerPos.x - event.data.global.x;
            const offsetY = this.pointerPos.y - event.data.global.y;
            const posX = this.beforeDragMapPos.x - offsetX;
            const posY = this.beforeDragMapPos.y - offsetY;

            if (posX < sceneSize.width / 2 && (this.map.width + posX) > sceneSize.width / 2) {
                this.map.position.x = posX;
            }
            if (posY < sceneSize.height / 2 && (this.map.height + posY) > sceneSize.height / 2) {
                this.map.position.y = posY;
            }
        }
    }

    protected endDrag(): void {
        this.dragging = false;
        this.pointerPos = null;
        this.beforeDragMapPos = null;
    }
}
