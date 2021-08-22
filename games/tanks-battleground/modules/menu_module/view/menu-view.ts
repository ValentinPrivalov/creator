import {AbstractView, ITransitionSettings} from "../../../../../core/lib/mvc/view";
import {Button} from "../../../../../core/classes/modules/layers_module/view/button";
import {Container} from "pixi.js";
import {PointerEvents} from "../../../../../core/global/pointer-events";
import {MenuNames} from "../global/menu-names";
import {MenuSignals} from "../global/menu-signals";

export class MenuView extends AbstractView {
    protected transitionSettings: ITransitionSettings = {
        fadeOutTime: 0.3
    }

    public enableUI(): void {
        const button = new Button(this.findChildByName(MenuNames.startButtonName) as Container);
        button.on(PointerEvents.DOWN, () => {
            this.raiseSignal(MenuSignals.START_PRESSED);
        });
    }
}
