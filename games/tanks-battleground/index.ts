import {Entry} from "../../core/classes/entry";
import {Names} from "../../core/global/names";
import {Configs} from "../../core/lib/services/configs";
import {LoadingNames} from "../../core/classes/modules/loading_module/static/loading-names";
import {ILevelData} from "../../core/classes/modules/loading_module/static/loading-interfaces";
import {MenuModule} from "./modules/menu_module/menu-module";

class TanksBattleground extends Entry {
    protected _gameVersion: string = '0.0.6';

    protected initModules() {
        super.initModules();
        this.addModule(Names.Modules.MENU_MODULE, MenuModule);
    }

    protected initGameConfigs(): void {
        super.initGameConfigs();
        const configs: Configs = this.services.get(Names.Services.CONFIGS);
        configs.gameName = 'Tanks Battleground';
        configs.addProperty(LoadingNames.ASSETS, LoadingNames.SCENE, 'scene.json');
        configs.addProperty(LoadingNames.ASSETS, LoadingNames.LEVELS, [{name: 'level_1', path: 'level.json'}] as Array<ILevelData>);
    }
}

window.onload = () => {
    (window as any).Entry = new TanksBattleground();
}
