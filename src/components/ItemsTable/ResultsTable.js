"use client"

import {useEffect, useState} from "react";

const columns_map = {
    "id": {
        "id": "index",
        "name": "ID"
    },
    "name": {
        "id": "name",
        "name": "Name"
    },
    "description": {
        "id": "description",
        "name": "Description"
    },
    "type": {
        "id": "type",
        "name": "Type"
    }
}

export default function ResultsTable({ results, columns }){
    const [sort, setSort] = useState("index");
    const [asc, setAsc] = useState(true);
    const [sortedResults, setSortedResults] = useState([...results]);

    function sortResults(){
        let sorted = [...results];
        sorted.sort((a, b) => {
            if (a[sort] < b[sort]) {
                return asc ? -1 : 1;
            }
            if (a[sort] > b[sort]) {
                return asc ? 1 : -1;
            }
            return 0;
        });
        setSortedResults([...sorted]);
    }

    function handleSort(e){
        let new_sort = e.target.getAttribute("id");
        if (new_sort === sort) {
            setAsc(!asc);
        } else {
            setSort(new_sort);
            setAsc(true);
        }
    }

    useEffect(() => {
        sortResults();
    }, [sort, asc, results]);

    function TableHeader({ id, active, children }){
        return (
            <th onClick={handleSort} id={id}>
                {children}
            </th>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => {
                                return (
                                    <TableHeader key={index} id={columns_map[column].id} active={sort === columns_map[column].id}>
                                        {columns_map[column].name}
                                    </TableHeader>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {sortedResults.map((item, index) => {
                        return (
                            <tr key={index}>
                                {columns.map((column, index) => {
                                    return (
                                        <td key={index}>
                                            {item[column]}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}