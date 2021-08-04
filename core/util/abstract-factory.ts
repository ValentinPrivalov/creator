export class AbstractFactory implements IAbstractFactory {
    protected _items: {[key: string]: any} = {};

    addItem(id: string, implementation: any): void {
        this._items[id] = new implementation(id);
    }

    getItem(id: string): any {
        return this._items[id];
    }

    getAll(): any {
        return this._items;
    }
}

export interface IAbstractFactory {
    addItem(id: string, item: any): void;
    getItem(id: string): any;
    getAll(): any;
}
