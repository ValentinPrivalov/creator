import {IWindowMouseWheelEventData, WindowEventNames} from "../../../../../core/lib/services/window-events";
import {IZoomEdges} from "../global/tanks-level-interfaces";
import gsap from "gsap";
import {AbstractView} from "../../../../../core/lib/mvc/view";
import {TanksLevelNames} from "../global/tanks-level-names";
import {Layer} from "../../../../../core/lib/pixi/layer";

export class TanksLevelView extends AbstractView {
    protected map: Layer;
    protected zoomTween: GSAPTween;
    protected zoomScaleStep: number = 1000;
    protected zoomEdges: IZoomEdges = {
        minScale: 0.3,
        maxScale: 1
    }

    public insertLevel(levelName: string): void {
        this.map = this.findChildByName(TanksLevelNames.MAP, this.display) as Layer;
        this.map.addChild(this.sceneManager.get(levelName) as Layer);
    }

    public enableUI(): void {
        this.windowEvents.add(WindowEventNames.MOUSE_WHEEL, this.onZoom.bind(this));
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
}
