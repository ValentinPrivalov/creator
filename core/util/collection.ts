export class Collection implements ICollection {
    protected _items: { [key: string]: any } = {};

    constructor(items?: { [key: string]: any }) {
        this._items = items ?? {};
    }

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

    forEach(func: (id: string, item: any) => void) {
        for (const id in this._items) {
            const item = this._items[id];
            func(id, item);
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
