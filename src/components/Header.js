"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { useState } from "react";

const nav_links = {
    Home: "/",
    Items: "/items",
    Collections: "/collections",
    Leaderboards: "/leaderboards"
}

export default function Header() {
    const [menu_open, set_menu_open] = useState(false);
    return (
        <header className={styles.header}>
            <div className={styles.title_wrapper}>
                <h1 className={styles.title}>SharkBot Online</h1>
            </div>
            <div className={styles.desktop_nav_wrapper}>
                <ul className={styles.desktop_nav}>
                    {Object.keys(nav_links).map((key, index) => {
                        return (
                            <Link href={nav_links[key]} key={index}>
                                <li className={styles.nav_item}>
                                    {key}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.mobile_nav_wrapper}>
                <div className={styles.mobile_nav_button} onClick={() => set_menu_open(!menu_open)}>
                    <p>{menu_open ? "Close Menu" : "Menu"}</p>
                </div>
                <ul className={styles.mobile_nav + " " + (menu_open ? styles.open : "")}>
                    {Object.keys(nav_links).map((key, index) => {
                        return (
                            <Link href={nav_links[key]} key={index} onClick={() => set_menu_open(false)}>
                                <li className={styles.nav_item}>
                                    {key}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </header>
    )
}
