"use client"

import {useEffect, useState} from "react";
import styles from "./ResultsTable.module.css";
import Link from "next/link";

const columns_map = {
    id: {
        id: "index",
        name: "ID",
        className: styles.item_id
    },
    name: {
        id: "name",
        name: "Name",
        className: styles.item_name
    },
    description: {
        id: "description",
        name: "Description",
        className: styles.item_description
    },
    type: {
        id: "type",
        name: "Type",
        className: styles.item_type
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
            <th onClick={handleSort} id={id} className={styles.table_header}>
                {children}
            </th>
        )
    }

    function TableCell({ id, children }) {
        if (id === "name") {
            return (
                <td className={`${styles.item_cell} ${columns_map[id].className}`}>
                    <Link href={`/items/${id.toUpperCase()}`}>
                        {children}
                    </Link>
                </td>
            )
        } else {
            return (
                <td className={`${styles.item_cell} ${columns_map[id].className}`}>
                    {children}
                </td>
            )
        }
    }


    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead className={styles.thead}>
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
                <tbody className={styles.tbody}>
                    {sortedResults.map((item, index) => {
                        return (
                            <tr key={index} className={styles.item_row}>
                                {
                                    columns.map((column, index) => {
                                        return (
                                            <TableCell key={index} id={column}>
                                                {item[column]}
                                            </TableCell>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}