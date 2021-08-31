import {AbstractModule} from "../../../lib/mvc/module";
import {Notifications} from "../../../global/notifications";
import {Names} from "../../../global/names";
import {WindowModel} from "./model/window-model";
import {RegisterWindowEventCommand} from "./command/register-window-event-command";

export class SetupModule extends AbstractModule {
    protected registerCommands() {
        super.registerCommands();
        this.addCommand(Notifications.REGISTER_WINDOW_EVENT, RegisterWindowEventCommand);
    }

    protected registerModels() {
        super.registerModels();
        this.addModel(Names.Views.WINDOW, WindowModel);
    }
}
