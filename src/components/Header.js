import styles from "./Header.module.css";
import Link from "next/link";

const nav_links = {
    Home: "/",
    Items: "/items",
    Collections: "/collections",
    Leaderboards: "/leaderboards"
}

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.title_wrapper}>
                <h1 className={styles.title}>SharkBot Online</h1>
            </div>
            <div className={styles.nav_wrapper}>
                <ul className={styles.nav}>
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
        </header>
    )
}
