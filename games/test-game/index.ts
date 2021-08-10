import {Entry} from "../../core/classes/entry";
import {Names} from "../../core/global/names";
import {Configs} from "../../core/lib/services/configs";
import {LoadingNames} from "../../core/classes/modules/loading_module/static/loading-names";

class TestEntry extends Entry {
    protected _gameVersion: string = '0.0.1';

    protected initGameConfigs(): void {
        super.initGameConfigs();
        const configs = this.services.get(Names.Services.CONFIGS) as Configs;
        configs.gameName = 'Test Game';
        configs.addProperty(LoadingNames.ASSETS, LoadingNames.SCENES, '/scenes.json');
    }
}

window.onload = () => {
    (window as any).Entry = new TestEntry();
}
