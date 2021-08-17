import {Log} from "../util/log";
import {Names} from "../global/names";
import {IServices, Services} from "../lib/services";
import {Mvc} from "../lib/services/mvc";
import {GraphicsModule} from "./modules/graphics_module/graphics-module";
import {LoadingModule} from "./modules/loading_module/loading-module";
import {EventManager} from "../lib/services/event-manager";
import {Configs} from "../lib/services/configs";
import {LayersModule} from "./modules/layers_module/layers-module";
import {SceneManager} from "../lib/services/scene-manager";
import {WindowEvents} from "../lib/services/window-events";
import {LoadingNames} from "./modules/loading_module/static/loading-names";
import {LevelModule} from "./modules/level_module/level-module";
import {StateManager} from "../lib/services/state-manager";
import {States} from "../global/states";

export class Entry {
    private _engineVersion: string = '0.1.6';
    protected _gameVersion: string; // should be redefined in each game

    constructor() {
        requestAnimationFrame(this.init.bind(this));
    }

    protected init(): void {
        this.initServices();
        this.initModules();
        this.initGameConfigs();
        this.initStates();
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
        this.services.register(Names.Services.WINDOW_EVENTS, WindowEvents);
        this.services.register(Names.Services.STATE_MANAGER, StateManager);
    }

    protected initModules(): void {
        Log.info('Init modules');
        this.addModule(Names.Modules.GRAPHICS_MODULE, GraphicsModule);
        this.addModule(Names.Modules.LOADING_MODULE, LoadingModule);
        this.addModule(Names.Modules.LAYERS_MODULE, LayersModule);
        this.addModule(Names.Modules.LEVEL_MODULE, LevelModule);
    }

    protected startEngine(): void {
        Log.info('Engine version: ' + this._engineVersion);
        Log.info('Game version: ' + this._gameVersion);
        const configs: Configs = this.services.get(Names.Services.CONFIGS);
        document.title = configs.gameName;
        const stateManager: StateManager = this.services.get(Names.Services.STATE_MANAGER);
        stateManager.setState(States.LOADING);
    }

    protected initGameConfigs(): void {
        const configs: Configs = this.services.get(Names.Services.CONFIGS);
        configs.gameName = 'Abstract Game';
        configs.gameVersion = this._gameVersion;
        configs.addProperty(LoadingNames.ASSETS, LoadingNames.ASSETS_PATH, 'assets/');
    }

    protected initStates(): void {
        const stateManager: StateManager = this.services.get(Names.Services.STATE_MANAGER);
        stateManager.registerState(States.LOADING, {from: [States.INIT]});
        stateManager.registerState(States.MAIN_MENU, {from: [States.LOADING]});
    }

    protected addModule(id: string, module: any): void {
        this.mvc.registerModule(id, module);
    }

    protected replaceModule(id: string, module: any): void {
        this.mvc.replaceModule(id, module);
    }
}
