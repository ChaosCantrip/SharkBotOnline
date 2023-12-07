import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.title_wrapper}>
                <h1 className={styles.title}>SharkBot Online</h1>
            </div>
        </header>
    )
}
