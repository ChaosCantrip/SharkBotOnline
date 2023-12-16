"use client"

import {useEffect, useState} from "react";

export default function ResultsTable({ results }){
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
                        <TableHeader id="index" active={sort === "index"}>
                            ID
                        </TableHeader>
                        <TableHeader id="name" active={sort === "name"}>
                            Name
                        </TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {sortedResults.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}