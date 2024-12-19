import {defineAction} from 'astro:actions';
import {getMenuService} from "../lib/menu/MenuService.ts";
import { z } from 'astro:schema';
import {MenuStoreFake} from "../lib/menu/MenuStore.ts";

let menuStoreFake = new MenuStoreFake();
export const server = {
    markItemAsEaten: defineAction({
        input: z.object({
            name: z.string()
        }),
        handler: async (input) => {
            let menuService = getMenuService(menuStoreFake);
            return await menuService.markItemAsEaten(input.name);
        }
    })
}