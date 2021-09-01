export interface IWindowEventData {
    eventName: string;
    data?: any;
    handler: any;
    states?: Array<string>;
    allStates?: boolean;
}

export interface IKeyboardEvent extends KeyboardEvent {
    keyCode: number;
    key: string;
    code: string;
}
