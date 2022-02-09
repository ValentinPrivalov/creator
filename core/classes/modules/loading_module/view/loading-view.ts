import { AbstractView, ITransitionSettings } from '../../../../lib/mvc/view';
import { ImageObject } from '../../../../lib/pixi/layer-object';

export class LoadingView extends AbstractView {
    protected static PROGRESS_BAR: string = 'progress-bar';
    protected progressBarFullWidth: number = 1280;
    protected transitionSettings: ITransitionSettings = {
        fadeOutTime: 0.5
    };

    public showProgress(progress: number): void {
        const progressBar: ImageObject = this.findChildByName(LoadingView.PROGRESS_BAR) as ImageObject;
        progressBar.width = (this.progressBarFullWidth / 100) * progress;
    }
}
