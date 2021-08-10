export class Collection implements ICollection {
    protected _items: { [key: string]: any } = {};

    add(id: string, implementation: any): any {
        this._items[id] = implementation;
        return this._items[id];
    }

    get(id: string): any {
        if (this.has(id)) {
            return this._items[id];
        }
    }

    remove(id: string): void {
        delete this._items[id];
    }

    has(id: string): boolean {
        return this._items[id] !== undefined;
    }

    getAll(): any {
        return this._items;
    }
}

export interface ICollection {
    add(id: string, item: any, isConstructor: boolean): any;

    get(id: string): any;

    remove(id: string): void;

    has(id: string): boolean;

    getAll(): any;
}
