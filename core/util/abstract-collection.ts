export class AbstractCollection implements IAbstractCollection {
    protected _items: {[key: string]: any} = {};

    addItem(id: string, implementation: any): any {
        this._items[id] = new implementation(id);
        return this._items[id];
    }

    getItem(id: string): any {
        return this._items[id];
    }

    getAll(): any {
        return this._items;
    }
}

export interface IAbstractCollection {
    addItem(id: string, item: any): any;
    getItem(id: string): any;
    getAll(): any;
}
