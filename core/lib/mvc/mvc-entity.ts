import { Configs } from '../services/configs';
import { Services } from '../services';
import { Names } from '../../global/names';
import { Mvc } from '../services/mvc';

export class MvcEntity {
    public NAME: string;
    protected configs: Configs;

    protected get services(): Services {
        return Services.instance() as Services;
    }

    protected get mvc(): Mvc {
        return this.services.get(Names.Services.MVC) as Mvc;
    }

    constructor(name: string) {
        this.NAME = name;
        this.configs = this.services.get(Names.Services.CONFIGS);
    }

    public onRegister(): void {}

    protected getModel(id: string): any {
        return this.mvc.getModel(id);
    }
}
