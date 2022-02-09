import { AbstractModule } from '../../../lib/mvc/module';
import { LoadingController } from './controller/loading-controller';
import { Names } from '../../../global/names';
import { LoadingView } from './view/loading-view';
import { LoadingModel } from './model/loading-model';

export class LoadingModule extends AbstractModule {
    protected registerModels(): void {
        super.registerModels();
        this.addModel(Names.Views.LOADING_SCREEN, LoadingModel);
    }

    protected registerViews(): void {
        super.registerViews();
        this.addView(Names.Views.LOADING_SCREEN, LoadingView);
    }

    protected registerControllers(): void {
        super.registerControllers();
        this.addController(Names.Views.LOADING_SCREEN, LoadingController);
    }
}
