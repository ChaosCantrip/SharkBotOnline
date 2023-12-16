"use client";

import ItemsFilter from "@components/ItemsTable/ItemsFilter";
import ResultsTable from "@components/ItemsTable/ResultsTable";
import {useEffect, useState} from "react";


export default function ItemsTable({ items, search_bar, filter_options }) {
    const [results, setResults] = useState([...items]);

    useEffect(() => {
        setResults([...items]);
    }, []);

    return (
        <div>
            <ItemsFilter items={items} setResults={setResults} search_bar={search_bar} filter_options={filter_options} />
            <ResultsTable results={results} />
        </div>
    )
}