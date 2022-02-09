import { MvcEntity } from './mvc-entity';

export class AbstractModule extends MvcEntity {
    public onRegister(): void {
        this.registerCommands();
        this.registerModels();
        this.registerViews();
        this.registerControllers();
    }

    protected registerCommands(): void {}

    protected registerModels(): void {}

    protected registerViews(): void {}

    protected registerControllers(): void {}

    protected addCommand(id: string, command: any): void {
        this.mvc.registerCommand(id, command);
    }

    protected addModel(id: string, model: any): void {
        this.mvc.registerModel(id, model);
    }

    protected addView(id: string, view: any): void {
        this.mvc.registerView(id, view);
    }

    protected replaceView(id: string, newClass: any): void {
        this.mvc.registerView(id, newClass);
    }

    protected addController(viewId: string, controller: any): void {
        this.mvc.registerController(viewId, controller);
    }
}
