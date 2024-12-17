
import {getMenuService} from "./lib/menu/MenuService.ts";
import {defineCollection, z} from "astro:content";


const menu = defineCollection({
    loader: async () => {
        const menuService = getMenuService();
        return (await menuService.getMenuItems()).map((i, index) => ({...i, id: `${index + 1}`}))
    },
    schema: z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
    })
})

export const collections = { menu };