import {LevelView} from "../../../../../core/classes/modules/level_module/view/level-view";
import {IWindowMouseWheelEventData, WindowEventNames} from "../../../../../core/lib/services/window-events";
import {IZoomEdges} from "../global/tanks-level-interfaces";
import gsap from "gsap";

export class TanksLevelView extends LevelView {
    protected zoomTween: GSAPTween;
    protected zoomScaleStep: number = 1000;
    protected zoomEdges: IZoomEdges = {
        minScale: 0.3,
        maxScale: 1
    }

    public enableUI(): void {
        this.windowEvents.add(WindowEventNames.MOUSE_WHEEL, this.onZoom.bind(this));
    }

    protected onZoom(data: IWindowMouseWheelEventData): void {
        const scaleValue: number = data.deltaY / this.zoomScaleStep;
        const currentScale: number = this.display.scale.x;
        const newScaleValue: number = currentScale - scaleValue;

        if (newScaleValue > this.zoomEdges.minScale && newScaleValue < this.zoomEdges.maxScale) {
            this.zoomTween?.kill();
            this.zoomTween = gsap.to(this.display.scale, {
                duration: 0.3,
                x: newScaleValue,
                y: newScaleValue,
            })
        }
    }
}
