import {useMenuService} from "../hooks/useMenuService.ts";
import {useState} from "react";

export const MenuView = () => {
    const [filter, setFilter] = useState(false);

    const {items, eaten, markAsEaten} = useMenuService(filter);

    return (<div>
        <div>
            <input type="checkbox" id="filter" checked={filter} onChange={() => setFilter(!filter)}/>
            <label htmlFor="filter">filter items left to try!</label>
        </div>
        {items.map((item, index) => {
            let dataTestid = `${item.name}${eaten.has(item.name) ? '-eaten' : ''}`;
            return <div
                key={index}
                data-testid={dataTestid}
            >
                <label>
                    <input
                        type="checkbox"
                        onChange={async () => {
                            await markAsEaten(item.name);
                        }}
                        checked={eaten.has(item.name)}
                    />
                    {item.name}
                </label>
            </div>
        })}
    </div>);
}