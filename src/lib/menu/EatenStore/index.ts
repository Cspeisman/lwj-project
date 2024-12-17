export interface EatenStore {
    addOrRemoveItem(name: string): Promise<boolean>;
    getItems(): Promise<Set<string>>;
}

export class EatenStoreFake implements EatenStore {
    store = new Set<string>();
    addOrRemoveItem(name: string): Promise<boolean> {
        if (this.store.has(name)) {
            this.store.delete(name)
        } else {
            this.store.add(name);
        }
        return Promise.resolve(true);
    }
    getItems(): Promise<Set<string>> {
        return Promise.resolve(this.store);
    }
}

export class LocalStorageStore implements EatenStore {
    key = 'menuItems';
    async addOrRemoveItem(name: string): Promise<boolean> {
        const items = await this.getItems();
        if (items.has(name)) {
            items.delete(name);
        } else {
            items.add(name);
        }
        localStorage.setItem(this.key, JSON.stringify(Array.from(items)));
        return Promise.resolve(true);
    }

    async getItems(): Promise<Set<string>> {
        const items = localStorage.getItem(this.key)
        if (!items) {
            return Promise.resolve(new Set<string>());
        }
        const parsedItems = JSON.parse(items);
        return Promise.resolve(new Set(parsedItems));
    }
}