import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import {getMenuService} from "../lib/menu/MenuService.ts";

export const server = {
    markAsEaten: defineAction({
        input: z.object({
            name: z.string(),
        }),
        handler: async (input) => {
            let menuService = getMenuService();
            return await menuService.markAsEaten(input.name);
        }
    })
}