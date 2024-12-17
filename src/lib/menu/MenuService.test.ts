import {describe, expect, it} from "vitest";
import {MenuService} from "./MenuService.ts";
import {MenuClientFake} from "./MenuClient";
import {EatenStoreFake} from "./EatenStore";

describe('MenuService', () => {
    it('should get a list of menu items', async () => {
        let menuService = new MenuService(new MenuClientFake(), new EatenStoreFake());
        let items = await menuService.getMenuItems();
        expect(items).toHaveLength(2);
    });

    it('should mark a menu item as eaten', async () => {
        let menuService = new MenuService(new MenuClientFake(), new EatenStoreFake());
        await menuService.markAsEaten('item 1');
        let eaten = await menuService.getEatenItems();
        expect(eaten).toContain('item 1');
    });

    it('should filter menu items that have not been eaten', async () => {
        let menuService = new MenuService(new MenuClientFake(), new EatenStoreFake());
        await menuService.markAsEaten('item 1');
        let menuItems = await menuService.getMenuItemsToTry();
        expect(menuItems).toHaveLength(1);
        expect(menuItems[0].name).toBe('item 2');
    });
});