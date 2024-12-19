import {describe, expect, it} from 'vitest';
import {MenuService} from "./MenuService.ts";
import {MenuClientStub} from "./MenuClient.ts";
import {type MenuStore, MenuStoreFake} from './MenuStore.ts';

describe('MenuService', () => {
    it('should get all menu items', async () => {
        let menuService = new MenuService(new MenuClientStub(5), {} as MenuStore);
        const items = await menuService.getItems();
        expect(items).toHaveLength(5);
        expect(items[0].name).toBe('item 1');
    });

    it('should mark items as eaten', async () => {
        let menuService = new MenuService(new MenuClientStub(5), new MenuStoreFake());
        await menuService.markItemAsEaten('item 1');
        const eatenItems: Set<string> = await menuService.getEatenItems();
        expect(eatenItems.has('item 1')).toBeTruthy();
    });

    it('should return only items I have noT eaten', async () => {
        let menuStoreFake = new MenuStoreFake();
        let menuService = new MenuService(new MenuClientStub(5), menuStoreFake);

        await menuStoreFake.saveEatenItem('item 1');
        await menuStoreFake.saveEatenItem('item 5');

        const items = await menuService.getItems(true);
        expect(items).toHaveLength(3);
    });
});