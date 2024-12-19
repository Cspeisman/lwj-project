import {useEffect, useMemo, useState} from "react";
import {getMenuService, MenuItem, MenuService} from "../MenuService.ts";

const useMenuService = (filter: boolean) => {
    const menuService: MenuService = useMemo(getMenuService, []);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [eaten, setEaten] = useState<Set<string>>(new Set());

    useEffect(() => {
        const getItems = async () => menuService.getItems(filter);
        const getEaten = async () => menuService.getEatenItems();
        getItems().then(i => setItems(i));
        getEaten().then(e => setEaten(e));
    }, [filter]);

    const markAsEaten = async (name: string) => {
        const success = await menuService.markItemAsEaten(name);
        if (success) {
            let eatenItems = await menuService.getEatenItems();
            setEaten(new Set(eatenItems));
        }
    }

    return {items, eaten, markAsEaten};
}

export const MenuView = () => {
    const [filter, setFilter] = useState(false);

    const {items, eaten, markAsEaten} = useMenuService(filter);

    return (
        <div>
            <div>
                <input type="checkbox" id="filter" onChange={() => setFilter(!filter)} />
                <label htmlFor="filter">Only items you need try!</label>
            </div>
            {items.map((item, index) => {
                return <div key={index} data-testid={`${item.name} ${eaten.has(item.name) ? 'eaten' : ''}`}>
                    <input type="checkbox" id={item.name} onChange={async () => {
                        await markAsEaten(item.name)
                    }}
                        checked={eaten.has((item.name))}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                </div>;
            })}
        </div>
    );
}