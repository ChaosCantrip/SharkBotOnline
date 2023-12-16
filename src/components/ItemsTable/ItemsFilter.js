import SearchBar from "@components/ItemsTable/SearchBar";
import {useEffect, useState} from "react";
import FilterOptions from "@components/ItemsTable/FilterOptions";

export default function ItemsFilter({ items, setResults, search_bar, filter_options }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});

    function handleChange() {
        let items_copy = [...items];
        if (search !== "") {
            items_copy = items_copy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        setResults([...items_copy]);
    }

    useEffect(() => {
        handleChange();
    }, [search, filter]);

    return (
        <div>
            {search_bar && <SearchBar setSearch={setSearch} />}
            {/* filter_options && <FilterOptions setFilter={setFilter} /> */}
        </div>
    )
}