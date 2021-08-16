import {AbstractView} from "../../../../lib/mvc/view";

export class LoadingView extends AbstractView {
    public showProgress(progress): void {
        console.warn(progress, this.display)
    }
}
