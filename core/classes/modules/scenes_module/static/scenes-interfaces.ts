export interface ILayer {
    id: number;
    name: string;
    opacity: number;
    visible: boolean;
    x: number;
    y: number;
    layers: Array<ILayer>;
}
