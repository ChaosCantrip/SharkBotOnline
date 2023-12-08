import article from "@styles/article.module.css";
import styles from "./member.module.css";
import {get_member} from "@lib/sharkbot";
import {notFound} from "next/navigation";

export async function generateMetadata({ params }) {
    const member_id = params.member_id;
    const member = await get_member(member_id);

    if (!member) {
        notFound();
    }

    return {
        title: member.display_name,
        description: `Profile for ${member.display_name} on SharkBot Online`,
        images: [
            {
                url: member.avatar_url,
                width: 256,
                height: 256,
                alt: member.display_name
            }
        ],
        icons: {
            icon: member.avatar_url
        }
    }
}

export default async function MemberPage({ params }) {
    const member_id = params.member_id;
    const member = await get_member(member_id);

    if (!member) {
        notFound();
    }

    return (
        <div className={article.wrapper}>
            <h1 className={article.title}>{member.display_name}</h1>
            <div className={article.body}>
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <Missions data={member.missions} />
                        <div>P</div>
                    </div>
                    <div className={styles.embed}>
                        <div className={styles.header}>
                            <h2 className={styles.name}>{member.display_name}</h2>
                            <img src={member.avatar_url} className={styles.avatar} alt={""} />
                            <p className={styles.id}>#{member.id}</p>
                        </div>
                        <div className={styles.values}>
                            <p className={styles.balance}>Balance: ${member.balance}</p>
                            <p className={styles.balance}>Bank Balance: ${member.bank_balance}</p>
                            <p className={styles.level}>Level {member.level}</p>
                            <p className={styles.xp}>XP: {member.xp}</p>
                            <p className={styles.collection}>{member.collection.num_discovered} / {member.collection.total_num} Items discovered ({(member.collection.num_discovered / member.collection.total_num * 100).toFixed(2)}%)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Missions({ data }) {
    // missions: dict[str, list[dict[str, str]]]
    return (
        <div className={styles.missions}>
            <h2 className={styles.title}>Missions</h2>
            <div className={styles.table}>
                {Object.keys(data).map((mission_type) => (
                    <div className={styles.type} key={mission_type}>
                        <h3 className={styles.name}>{mission_type}</h3>
                        <div className={styles.list}>
                            {data[mission_type].map((mission) => (
                                <div className={styles.mission} key={mission.id}>
                                    <p className={styles.mission_name}>{mission.description}</p>
                                    <p className={styles.mission_progress}>{mission.progress}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}