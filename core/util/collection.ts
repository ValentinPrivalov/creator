export class Collection<T> {
    protected _items: ICollectionItem<T> = {};
    protected _itemId: number = 0;

    constructor(items?: ICollectionItem<T>) {
        this._items = items ?? {};
    }

    add(id: string, implementation: T): void {
        this._items[id] = implementation;
    }

    push(implementation: T): void {
        while (this.has(this._itemId.toString())) {
            this._itemId++;
        }
        this._items[this._itemId] = implementation;
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

    forEach(func: (item: T, id: string) => void): void {
        for (const id in this._items) {
            if (this._items.hasOwnProperty(id)) {
                const item = this._items[id];
                func(item, id);
            }
        }
    }
}

export interface ICollectionItem<T> {
    [key: string]: T;
}
