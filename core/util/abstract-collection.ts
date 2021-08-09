export class AbstractCollection implements IAbstractCollection {
    protected _items: { [key: string]: any } = {};

    addItem(id: string, implementation: any, isConstructor: boolean = true): any {
        this._items[id] = isConstructor ? new implementation(id) : implementation;
        return this._items[id];
    }

    getItem(id: string): any {
        if (this.has(id)) {
            return this._items[id];
        }
    }

    has(id: string): boolean {
        return this._items[id] !== undefined;
    }

    getAll(): any {
        return this._items;
    }
}

export interface IAbstractCollection {
    addItem(id: string, item: any, isConstructor: boolean): any;

    getItem(id: string): any;

    has(id: string): boolean;

    getAll(): any;
}