import {afterEach, describe, expect, it, vi} from "vitest";
import {MenuView} from "./MenuView.tsx";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import * as MenuServiceModule from '../MenuService.ts';
import {MenuService} from "../MenuService.ts";
import {MenuClientStub} from "../MenuClient.ts";
import {MenuStoreFake} from "../MenuStore.ts";

describe('MenuView', () => {
    afterEach(() => {
        cleanup();
    })
    it('should list items in the menu', async () => {
        // vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientStub(), new MenuStoreFake()));
        vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientStub(), new MenuStoreFake()));
        render(<MenuView/>);
        await screen.findByText('item 1')
        await screen.findByText('item 2')
        await screen.findByText('item 3')
    });

    it('should mark a menu item as eaten', async () => {
        vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientStub(), new MenuStoreFake()));
        render(<MenuView/>);
        let item1 = await screen.findByLabelText('item 1');
        fireEvent.click(item1);
        await screen.findByTestId('item 1 eaten');
        expect(item1).toHaveProperty('checked', true);
    });

    it('should filter out eaten items', async () => {
        vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientStub(), new MenuStoreFake()));
        render(<MenuView/>);
        let item1 = await screen.findByLabelText('item 1');
        fireEvent.click(item1);

        const filter = screen.getByLabelText('Only items you need try!');
        fireEvent.click(filter);
        await waitFor(() =>
            expect(screen.queryByText('item 1')).toBeNull()
        )
        await screen.findByText("item 2");
    });
});