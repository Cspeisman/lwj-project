import {MenuItem} from "../MenuService.ts";

export interface MenuClient {
    getItems(): Promise<MenuItem[]>;
}

interface MenuResponse {
    categories: {
        name: string;
        products: {name: string, description: string}[]
    }[]
}
export class CheeseCakeFactoryMenuClient implements MenuClient {
    baseUrl = 'https://www.thecheesecakefactory.com/api/olo/restaurants/171338/menu?nomnom=add-restaurant-to-menu&includedisabled=true';

    async getItems(): Promise<MenuItem[]> {
        let response = await fetch(this.baseUrl);
        let menu: MenuResponse = await response.json();
        const results: MenuItem[] = [];
        for (const category of menu.categories) {
            const c = category.name;
            results.push(...category.products.map(p => new MenuItem(p.name, p.description, c)));
        }
        return results;
    }
}

export class MenuClientFake implements MenuClient {
    getItems(): Promise<MenuItem[]> {
        return Promise.resolve([new MenuItem('item 1', '', ''), new MenuItem('item 2', '', '')]);
    }
}
