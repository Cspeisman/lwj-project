import {CheeseCakeFactoryClient, type MenuClient} from "./MenuClient.ts";
import {type MenuStore, MenuStoreFake, MenuStoreLocalStorage} from "./MenuStore.ts";

export class MenuItem {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class MenuService {
    menuClient: MenuClient;
    menuStore: MenuStore

    constructor(menuClient: MenuClient, menuStore: MenuStore) {
        this.menuClient = menuClient;
        this.menuStore = menuStore;
    }

    async getItems(needToTryFilter?: boolean) {
        if (needToTryFilter) {
            return this.getNeedToTryItems();
        }
        return this.menuClient.menuItems();
    }

    async getNeedToTryItems() {
        const items = await this.menuClient.menuItems();
        const eaten = await this.getEatenItems()
        return items.filter(i => !eaten.has(i.name));
    }

    async markItemAsEaten(name: string) {
        return await this.menuStore.saveEatenItem(name);
    }

    async getEatenItems() {
        return this.menuStore.eatenItems();
    }
}

let menuService = new MenuService(new CheeseCakeFactoryClient(), new MenuStoreFake());
export const getMenuService = () => menuService;