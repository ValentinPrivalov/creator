export const _namespace: string = 'SIGNAL_';

export class Signals {
    static MAIN_SCENE_CREATED: string = _namespace + 'MAIN_SCENE_CREATED';
    static LAYER_CREATED: string = _namespace + 'LAYER_CREATED';
    static ASSET_LOADED: string = _namespace + 'ASSET_LOADED';
    static LOAD_PROGRESS: string = _namespace + 'LOAD_PROGRESS';
    static RESIZE: string = _namespace + 'RESIZE';
}
