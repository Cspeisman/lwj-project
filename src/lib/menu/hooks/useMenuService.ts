import {getMenuService, MenuItem} from "../MenuService.ts";
import {useEffect, useMemo, useState} from "react";

export const useMenuService = (filter: boolean) => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [eaten, setEaten] = useState<Set<string>>(new Set(''));
    const menuService = useMemo(getMenuService, []);

    useEffect(() => {
        if (!filter) {
            const getItems = async () => await menuService.getMenuItems();
            const getEaten = async () => await menuService.getEatenItems();
            getItems().then(menuItems => setItems(menuItems));
            getEaten().then(eaten => setEaten(eaten));
        } else {
            const getItems = async () => await menuService.getMenuItemsToTry();
            getItems().then(menuItems => setItems(menuItems));
        }
    }, [filter]);

    const markAsEaten = async (name: string) => {
        let saved = await menuService.markAsEaten(name);
        if (saved) {
            const eatenItems = await menuService.getEatenItems();
            setEaten(new Set(Array.from(eatenItems)));
        }
    }

    return {items, eaten, markAsEaten };
}
