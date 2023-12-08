import styles from "./LoadingDots.module.css";

export default function LoadingDots() {
    const num_dots = 4;
    return (
        <div className={styles.wrapper}>
            {
                [...Array(num_dots)].map((_, i) => {
                    return (
                        <div className={styles.dot}></div>
                    )
                })
            }
        </div>
    )
}