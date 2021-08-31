export interface IWindowEventData {
    eventName: string;
    data?: any;
    handler: any;
    states?: Array<string>;
    allStates?: boolean;
}

export interface IWindowMouseWheelEventData {
    deltaX: number;
    deltaY: number;
}

export interface IKeyboardEvent {
    keyCode: number;
    key: string;
    code: string;
}
