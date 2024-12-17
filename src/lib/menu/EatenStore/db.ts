import {db, eq, MenuItem} from "astro:db";
import type {EatenStore} from "./index.ts";

export class EatenStoreDB implements EatenStore {
    async addOrRemoveItem(name: string): Promise<boolean> {
        const item = await db.select().from(MenuItem)
            .where(eq(MenuItem.name, name)).limit(1);
        if (item[0]) {
            await db.delete(MenuItem).where(eq(MenuItem.name, name))
        } else {
            await  db.insert(MenuItem).values({ name });
        }
        return true;
    }
    async getItems(): Promise<Set<string>> {
        let items  = await db.select().from(MenuItem);
        return new Set(items.map(i => i.name));
    }

}