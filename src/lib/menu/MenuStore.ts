
export interface MenuStore {
    saveEatenItem(name: string): Promise<boolean>;
    eatenItems(): Promise<Set<string>>;
}

export class MenuStoreFake implements MenuStore {
    store: Set<string> = new Set();

    saveEatenItem(name: string): Promise<boolean> {
        this.store.add(name);
        return Promise.resolve(true);
    }

    eatenItems(): Promise<Set<string>> {
        return Promise.resolve(this.store);
    }
}

export class MenuStoreLocalStorage implements  MenuStore {
    key = 'menu-items'

    async saveEatenItem(name: string): Promise<boolean> {
        let currentItems = await this.eatenItems();
        currentItems.add(name);
        localStorage.setItem(this.key, JSON.stringify(Array.from(currentItems)));
        return true;
    }
    eatenItems(): Promise<Set<string>> {
        const itemsString = localStorage.getItem(this.key);
        if (itemsString) {
            let items = JSON.parse(itemsString);
            return Promise.resolve(new Set(items));
        }
        return Promise.resolve(new Set());
    }

}