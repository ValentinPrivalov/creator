import {AbstractView} from "../../../../lib/mvc/view";

export class LoadingView extends AbstractView {
    public doSomething(): void {
        console.warn('doSomething');
    }
}
