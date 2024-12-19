import {MenuItem} from "./MenuService.ts";

export class MenuClientStub implements MenuClient {
    private items: MenuItem[] = [];
    constructor(numItems = 3) {
        for (let i = 1; i <= numItems; i++) {
            this.items.push(new MenuItem(`item ${i}`))
        }
    }

    menuItems(): Promise<MenuItem[]> {
        return Promise.resolve(this.items);
    }
}

export class CheeseCakeFactoryClient implements MenuClient {
    async menuItems(): Promise<MenuItem[]> {
        const menuItems: MenuItem[] = [];
        const response = await fetch('https://www.thecheesecakefactory.com/api/olo/restaurants/171338/menu?nomnom=add-restaurant-to-menu&includedisabled=true');
        const menuResponse = await response.json();
        for (const category of menuResponse.categories) {
            category.products.forEach((p: { name: string }) => {
                menuItems.push(new MenuItem(p.name));
            });
        }
        return menuItems;
    }
}

export interface MenuClient {
    menuItems(): Promise<MenuItem[]>;
}