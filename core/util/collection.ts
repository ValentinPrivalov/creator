export class Collection<T> implements ICollection {
    protected _items: ICollectionItem<T> = {};

    constructor(items?: ICollectionItem<T>) {
        this._items = items ?? {};
    }

    add(id: string, implementation: T): T {
        this._items[id] = implementation;
        return this._items[id];
    }

    get(id: string): T {
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

    forEach(func: (id: string, item: any) => void) {
        for (const id in this._items) {
            if (this._items.hasOwnProperty(id)) {
                const item = this._items[id];
                func(id, item);
            }
        }
    }
}

export interface ICollection {
    add(id: string, item: any, isConstructor: boolean): any;

    get(id: string): any;

    remove(id: string): void;

    has(id: string): boolean;

    getAll(): any;

    forEach(func: Function): void;
}

export interface ICollectionItem<T> {
    [key: string]: T;
}
