import {AbstractView} from "../../../../lib/mvc/view";
import {ImageObject} from "../../layers_module/view/layer-object";

export class LoadingView extends AbstractView {
    protected static PROGRESS_BAR: string = 'progress-bar';
    protected progressBarFullWidth: number = 1280;

    public showProgress(progress): void {
        const progressBar: ImageObject = this.findChildByName(LoadingView.PROGRESS_BAR) as ImageObject;
        progressBar.width = this.progressBarFullWidth / 100 * progress;
    }
}
