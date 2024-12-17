import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {MenuView} from "./MenuView.tsx";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import * as MenuServiceModule from '../MenuService.ts';
import {MenuService} from '../MenuService.ts';
import {MenuClientFake} from "../MenuClient";
import {EatenStoreFake} from "../EatenStore";

describe('MenuView', () => {
    beforeEach(() => {
        vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientFake(), new EatenStoreFake()))
    });

    afterEach(() => {
        cleanup();
    })

    it('should list MenuItems', async () => {
        render(<MenuView/>);
        await screen.findByText("item 1");
        screen.getByText("item 2");
    });

    it('should mark an item as eaten', async () => {
        render(<MenuView/>);
        const item1 = await screen.findByText("item 1");
        fireEvent.click(item1);
        await screen.findByTestId('item 1-eaten')
    });

    it('should filter out menu items that have been eaten', async () => {
        let store = new EatenStoreFake();
        await store.addOrRemoveItem('item 1');
        vi.spyOn(MenuServiceModule, 'getMenuService').mockReturnValue(new MenuService(new MenuClientFake(), store))
        render(<MenuView/>);
        await screen.findByText("item 1");
        const filter = screen.getByLabelText('filter items left to try!')
        fireEvent.click(filter);
        await waitFor(() =>
            expect(screen.queryByText('item 1')).toBeNull()
        )
        await screen.findByText("item 2");
    });
});