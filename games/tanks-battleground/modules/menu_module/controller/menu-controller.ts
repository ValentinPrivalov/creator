import {AbstractController} from "../../../../../core/lib/mvc/controller";
import {States} from "../../../../../core/global/states";
import {MenuView} from "../view/menu-view";
import {MenuSignals} from "../global/menu-signals";
import {TanksStates} from "../../global/tanks-states";

export class MenuController extends AbstractController {
    get view(): MenuView {
        return this._view as MenuView;
    }

    registerNotificationListeners(): void {
        super.registerNotificationListeners();
        this.addNotificationListener(States.MAIN_MENU, this.showMenu.bind(this));
        this.addNotificationListener(TanksStates.PAUSE_GAME, this.gamePaused.bind(this));
    }

    registerSignalListeners(): void {
        super.registerSignalListeners();
        this.addSignalListener(MenuSignals.START_PRESSED, this.closeMenu.bind(this));
    }

    protected showMenu(): void {
        this.view.layerTransitionInStart();
        this.view.enableInteractive();
    }

    protected gamePaused(): void {
        this.showMenu();
    }

    protected closeMenu(): void {
        this.view.disableInteractive();
        this.view.layerTransitionOutStart(() => {
            this.setState(TanksStates.LEVEL);
        });
    }
}
