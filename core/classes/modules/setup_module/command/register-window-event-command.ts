import {AbstractCommand} from "../../../../lib/mvc/command";
import {IEventData} from "../../../../lib/services/event-manager";
import {WindowModel} from "../model/window-model";
import {Names} from "../../../../global/names";
import {IWindowEventData} from "../static/setup-interfaces";

export class RegisterWindowEventCommand extends AbstractCommand {
    execute(notification: IEventData) {
        super.execute(notification);
        const windowModel: WindowModel = this.getModel(Names.Views.WINDOW);
        windowModel.add(notification.body as IWindowEventData);
    }
}
