import {LevelController} from "../../../../../core/classes/modules/level_module/controller/level-controller";
import {TanksLevelView} from "../view/tanks-level-view";
import {TanksStates} from "../../global/tanks-states";
import {TanksLevelModel} from "../model/tanks-level-model";

export class TanksLevelController extends LevelController {
    get view(): TanksLevelView {
        return this._view as TanksLevelView;
    }

    get model(): TanksLevelModel {
        return this._model as TanksLevelModel;
    }

    protected onStateChanged(current: string, previous?: string) {
        super.onStateChanged(current, previous);
        if (current === TanksStates.LEVEL) {
            this.view.enableUI();
        }
    }
}
