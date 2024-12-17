import type { EatenStore } from "./EatenStore";
import { EatenStoreDB } from "./EatenStore/db";
import {CheeseCakeFactoryMenuClient, type MenuClient} from "./MenuClient";


export class MenuItem {
    name: string;
    description: string;
    category: string;

    constructor(name: string, description: string, category: string) {
        this.name = name;
        this.description = description;
        this.category = category;
    }
}


export class MenuService {
    menuClient: MenuClient;
    eatenStore: EatenStore;

    constructor(menuClient: MenuClient, eatenStore: EatenStore) {
        this.menuClient = menuClient;
        this.eatenStore = eatenStore;
    }

    async getMenuItems() {
        return await this.menuClient.getItems();
    }

    async markAsEaten(name: string) {
        return await this.eatenStore.addOrRemoveItem(name);
    }

    async getEatenItems() {
        return await this.eatenStore.getItems();
    }

    async getMenuItemsToTry(): Promise<MenuItem[]> {
        const eatenItems = await this.getEatenItems();
        let menuItems = await this.getMenuItems();
        return menuItems.filter(m => !eatenItems.has(m.name));
    }
}

let menuService: MenuService;

export const getMenuService = () => {
    if (!menuService) {
        menuService = new MenuService(new CheeseCakeFactoryMenuClient(), new EatenStoreDB());
    }
    return menuService;
}
