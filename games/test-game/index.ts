import {Entry} from "../../core/classes/entry";
import {Names} from "../../core/global/names";
import {Configs} from "../../core/lib/services/configs";

class TestEntry extends Entry {
    protected initGameConfigs(): void {
        const configs = this.services.get(Names.Services.CONFIGS) as Configs;
        configs.gameName = 'Test Game';
    }
}

window.onload = () => {
    (window as any).Entry = new TestEntry();
}
