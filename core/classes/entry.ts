import {Log} from "../lib/log";
import {Names} from "../global/names";
import {IServices, Services} from "../lib/services";
import {Mvc} from "../lib/services/mvc";
import {GraphicsModule} from "./modules/graphics_module/graphics-module";
import {LoadingModule} from "./modules/loading_module/loading-module";
import {EventManager} from "../lib/services/event-manager";
import {Notifications} from "../global/notifications";
import {Configs} from "../lib/services/configs";
import {ScenesModule} from "./modules/scenes_module/scenes-module";
import {SceneManager} from "./modules/graphics_module/view/scene-manager";
import * as PIXI from "pixi.js";
window.PIXI = PIXI; // pixiJS devtools dependence

export class Entry {
    constructor() {
        this.initServices();
        this.initModules();
        this.initGameConfigs();
        this.startEngine();
    }

    get services(): IServices {
        return Services.instance();
    }

    get mvc(): Mvc {
        return this.services.get(Names.Services.MVC) as Mvc;
    }

    protected initServices(): void {
        Log.info('Init Services');
        this.services.register(Names.Services.MVC, Mvc);
        this.services.register(Names.Services.EVENT_MANAGER, EventManager);
        this.services.register(Names.Services.CONFIGS, Configs);
        this.services.register(Names.Services.SCENE_MANAGER, SceneManager);
    }

    protected initModules(): void {
        Log.info('Init modules');
        this.addModule(Names.Modules.GRAPHICS_MODULE, GraphicsModule);
        this.addModule(Names.Modules.LOADING_MODULE, LoadingModule);
        this.addModule(Names.Modules.SCENES_MODULE, ScenesModule);
    }

    protected startEngine(): void {
        Log.info('Start engine');
        this.mvc.sendNotification(Notifications.INIT_ENGINE);
    }

    protected initGameConfigs(): void {
        const configs: Configs = this.services.get(Names.Services.CONFIGS);
        configs.gameName = 'Abstract Game';
    }

    protected addModule(id: string, module: any): void {
        this.mvc.registerModule(id, module);
    }

    protected replaceModule(id: string, module: any): void {
        this.mvc.replaceModule(id, module);
    }
}
